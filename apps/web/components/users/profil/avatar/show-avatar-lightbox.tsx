import { X } from "lucide-react";
import Image from "next/image"

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
}

const ShowAvatarLightbox: React.FC<LightboxProps> = (
  { isOpen, onClose, imageSrc }
) => {
  if (!isOpen) return null;

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };


  return (
    <>
      <div onClick={handleClickOutside} className="fixed top-0 left-0 h-screen w-full z-50 bg-black/50">
        <div className="bg-black/40 relative top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[calc(100%_-_5rem)] h-[calc(100%_-_5rem)] rounded">
          <X className="absolute top-2 right-2 text-gray-100 cursor-pointer hover:text-primary transition-colors z-50" onClick={onClose} />
          <Image src={imageSrc} alt="Lightbox" className="w-full h-auto object-cover rounded" fill priority sizes="100%" />
        </div>
      </div>

    </>
  )
}

export default ShowAvatarLightbox