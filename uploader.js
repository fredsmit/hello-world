class Uploader {
    file;
    onProgress;
    fileId;
    constructor(file, onProgress) {
        this.file = file;
        this.onProgress = onProgress;
        this.file = file;
        // create fileId that uniquely identifies the file
        // we could also add user session identifier (if had one), to make it even more unique
        this.fileId = file.name + '-' + file.size + '-' + file.lastModified;
        this.onProgress = onProgress;
    }
    async getUploadedBytes() {
        const url = new URL("/uploadedBytes", "https://localhost:7072");
        console.log("getUploadedBytes.url:", url);
        const response = await fetch(url, {
            method: "GET",
            mode: "cors",
            referrerPolicy: "no-referrer",
            headers: {
                'X-File-Id': this.fileId
            }
        });
        if (response.ok) { // if response.status is 200-299
        }
        else {
        }
        if (response.status != 200) {
            throw new Error("Can't get uploaded bytes: " + response.statusText);
        }
        const text = await response.text();
        const n = +text;
        if (Number.isFinite(n)) {
            return n;
        }
        else {
            console.error("NOT a number:", text);
            return 0;
        }
    }
    async uploadFetch() {
        const url = new URL("/uploadFetch", "https://localhost:7072");
        console.log("/uploadFetch.url:", url);
        const blob = this.file;
        console.log("file.size:", blob.size, "file.type:", blob.type);
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            referrerPolicy: "no-referrer",
            headers: {
                'X-File-Id': this.fileId
            },
            body: this.file
        });
        if (response.ok) { // if response.status is 200-299
            if (response.status != 200) {
                throw new Error("Can't get uploaded bytes: " + response.statusText);
            }
            const text = await response.text();
            return text;
        }
        else {
            throw new Error("error:" + response.status);
        }
    }
    async upload() {
        const startByte = await this.getUploadedBytes();
        const text1 = await this.uploadFetch();
        console.log("uploadFetch:", text1);
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "https://localhost:7072/upload", true);
        // send file id, so that the server knows which file to resume
        xhr.setRequestHeader('X-File-Id', this.fileId);
        // send the byte we're resuming from, so the server knows we're resuming
        xhr.setRequestHeader('X-Start-Byte', String(startByte));
        xhr.setRequestHeader('x-file-size', String(this.file.size));
        /*
        /upload:51847
        Accept=./.
        Host=localhost:7072
        User-Agent=Edg/147.0.0.0
        Accept-Encoding=gzip, deflate, br, zstd
        Accept-Language=en-US,en;q=0.9
        Origin=https://localhost:5501
        Referer=https://localhost:5501/
        Content-Length=51847
        sec-ch-ua-platform="Windows"
        x-file-size=51848
        sec-ch-ua="Not.A/Brand";v="8", "Microsoft Edge WebView2";v="147", "Chromium";v="147", "Microsoft Edge";v="147"
        x-file-id=download.png-51848-1774993140418
        x-start-byte=1
        sec-ch-ua-mobile=?0
        sec-fetch-site=same-site
        sec-fetch-mode=cors
        sec-fetch-dest=empty
        priority=u=1, i
        */
        xhr.upload.onprogress = (e) => {
            this.onProgress((startByte ?? 0) + e.loaded, (startByte ?? 0) + e.total, e.lengthComputable);
        };
        console.log("send the file, starting from", startByte);
        const blob = this.file.slice(startByte);
        console.log("blob.size:", blob.size, "blob.type:", blob.type);
        xhr.send(new Blob([blob]));
        // return
        //   true if upload was successful,
        //   false if aborted
        // throw in case of an error
        const promise = new Promise((resolve, reject) => {
            xhr.onload = xhr.onerror = () => {
                console.log("upload end status:" + xhr.status + " text:" + xhr.statusText);
                if (xhr.status == 200) {
                    this.activeXhr = null;
                    resolve(xhr.responseText);
                }
                else {
                    this.activeXhr = null;
                    reject(new Error("Upload failed: " + xhr.statusText));
                }
            };
            // onabort triggers only when xhr.abort() is called
            this.activeXhr = xhr;
            xhr.onabort = () => {
                this.activeXhr = null;
                console.log("Aborted:0");
                resolve("Aborted:0");
            };
        });
        return await promise;
    }
    activeXhr;
    stop() {
        if (this.activeXhr) {
            this.activeXhr.abort();
        }
    }
}
export { Uploader };
