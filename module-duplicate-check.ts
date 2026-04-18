// module-duplicate-check.ts
class InvalidOperationException extends Error {
    constructor(message?: string) {
        super(message ?? "Invalid operation");
        this.name = "InvalidOperationException";
    }
}

async function computeModuleHash(url: string): Promise<string> {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to fetch module source: ${res.status} ${res.statusText}`);
    }
    const src = await res.text();

    // Remove comments and collapse whitespace to reduce trivial differences
    const withoutComments = src.replace(/\/\*[\s\S]*?\*\/|\/\/.*(?=[\n\r])/g, "");
    const normalized = withoutComments.replace(/\s+/g, " ").trim();

    const encoder = new TextEncoder();
    const data = encoder.encode(normalized);
    const digest = await crypto.subtle.digest("SHA-256", data);
    const hash = Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, "0")).join("");
    //console.log(url, hash);
    return hash;
}

export async function checkModuleHash(moduleUrl: string)
    : Promise<boolean> {
    const moduleScript = getCurrentModuleScript(moduleUrl);
    const throwIfSeen = moduleScript?.dataset.throwifseen === "true";

    const moduleHash = await computeModuleHash(moduleUrl);

    console.log('check', moduleUrl, moduleHash);

    if (seen.has(moduleHash)) {
        if (throwIfSeen) {
            const firstUrl = seen.get(moduleHash) as string;
            throw new InvalidOperationException(
                `Duplicate module source detected. First: ${firstUrl}, Duplicate: ${moduleUrl}`
            );

        }
        return true;
    }

    seen.set(moduleHash, moduleUrl);
    return false;
}

const seen: Map<string, string> = new Map<string, string>();

function getCurrentModuleScript(url: string): HTMLScriptElement | null {
    const scripts = document.querySelectorAll<HTMLScriptElement>('script[type="module"]');

    for (const s of scripts) {
        if (new URL(s.src, location.href).href === url) {
            return s;
        }
    }
    return null;
}
