import { useState, useRef, useEffect } from "react";
import { uploadImage } from "@/lib/admin-api";
import { MathText } from "../MathText";
import { Loader2, ImagePlus } from "lucide-react";

export function SmartTextEditor({
  value,
  onChange,
  label,
  multiline = false,
}: {
  value: string;
  onChange: (v: string) => void;
  label?: string;
  multiline?: boolean;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const pasteRef = useRef<HTMLDivElement>(null);

  const hasImagePlaceholder = value.includes("[IMAGE]");

  const handlePaste = async (e: React.ClipboardEvent) => {
    if (!hasImagePlaceholder) return;
    
    const items = e.clipboardData.items;
    let imageFile: File | null = null;
    
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        imageFile = item.getAsFile();
        break;
      }
    }

    if (!imageFile) return;

    // Compress image
    setIsUploading(true);
    try {
      const compressedBase64 = await compressImage(imageFile);
      const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.webp`;
      
      const result = await uploadImage({ data: { base64: compressedBase64, filename } });
      
      if (result.success && result.url) {
        // Replace first occurrence of [IMAGE] with markdown link
        const newValue = value.replace("[IMAGE]", `![image](${result.url})`);
        onChange(newValue);
      }
    } catch (err) {
      console.error("Upload failed", err);
      alert("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          const max_size = 1200;
          if (width > height && width > max_size) {
            height *= max_size / width;
            width = max_size;
          } else if (height > max_size) {
            width *= max_size / height;
            height = max_size;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("getContext" in canvas ? "2d" : "2d");
          if (!ctx) return reject("No canvas context");
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/webp", 0.8));
        };
      };
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full mb-4">
      {label && <label className="font-bold text-sm text-foreground/80">{label}</label>}
      
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[100px] font-mono"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring font-mono"
        />
      )}

      {hasImagePlaceholder && (
        <div 
          ref={pasteRef}
          tabIndex={0}
          onPaste={handlePaste}
          className="mt-2 flex flex-col items-center justify-center p-6 border-2 border-dashed border-primary/50 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-primary"
        >
          {isUploading ? (
            <div className="flex items-center gap-2 text-primary font-bold">
              <Loader2 className="animate-spin" /> Uploading...
            </div>
          ) : (
            <div className="flex flex-col items-center text-primary/80">
              <ImagePlus className="size-8 mb-2 text-primary" />
              <p className="font-bold">📋 Click here and press Ctrl+V to paste image</p>
              <p className="text-xs opacity-70">Will replace [IMAGE] with actual image link</p>
            </div>
          )}
        </div>
      )}

      {value && value.trim() !== "" && (
        <div className="mt-1 p-3 rounded-xl border bg-muted/30 text-sm whitespace-pre-wrap">
          <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">Preview</p>
          <MathText>{value}</MathText>
        </div>
      )}
    </div>
  );
}
