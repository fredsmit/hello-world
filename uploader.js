class Uploader {
    constructor(file, onProgress) {
        this.file = file;
        this.onProgress = onProgress;
        this.file = file;
        this.onProgress = onProgress;
        // create fileId that uniquely identifies the file
        // we could also add user session identifier (if had one), to make it even more unique
        this.fileId = file.name + '-' + file.size + '-' + file.lastModified;
    }
    async getUploadedBytes() {
        const response = await fetch('http://localhost:8080/status', {
            referrerPolicy: "no-referrer",
            headers: {
                'X-File-Id': this.fileId
            }
        });
        if (response.status != 200) {
            throw new Error("Can't get uploaded bytes: " + response.statusText);
        }
        const text = await response.text();
        const n = +text;
        if (Number.isFinite(n)) {
            return n;
        }
        else {
            console.log("NOT a number:", text);
            return 0;
        }
    }
    async upload() {
        const startByte = await this.getUploadedBytes();
        const xhr = new XMLHttpRequest();
        //xhr.open("POST", "upload", true);
        xhr.open("POST", "http://localhost:8080/upload", true);
        // send file id, so that the server knows which file to resume
        xhr.setRequestHeader('X-File-Id', this.fileId);
        // send the byte we're resuming from, so the server knows we're resuming
        xhr.setRequestHeader('X-Start-Byte', String(startByte));
        xhr.setRequestHeader('x-file-size', String(this.file.size));
        xhr.upload.onprogress = (e) => {
            this.onProgress((startByte ?? 0) + e.loaded, (startByte ?? 0) + e.total, e.lengthComputable);
        };
        console.log("send the file, starting from", startByte);
        const blob = this.file.slice(startByte);
        console.log("blob:", blob.size, blob.type);
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
    stop() {
        if (this.activeXhr) {
            this.activeXhr.abort();
        }
    }
}
export { Uploader };
