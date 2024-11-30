import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Modal1Props {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

export default function Modal1({ showModal, setShowModal }: Modal1Props) {
  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="max-w-[90%] rounded-xl sm:max-w-[555px] bg-transparent shadow-none border-none" showCloseButton={false}>
        <Image
          src="https://imagedelivery.net/6tAoXewsW-UbrMK1VkE8GQ/beba6c7b-fb3d-485d-9d13-76dfa0ef8d00/public"
          alt="Aviso"
          width={700}
          height={700}
          quality={100}
          priority
          className="w-full h-auto mb-4"
        />
        <div className="flex justify-between w-full mt-4 gap-2">
          <Button
            onClick={() => window.open('http://1.1.1.1', '_blank')}
            className="w-1/2 bg-green-800 hover:bg-green-700"
          >
            Acessar 1.1.1.1
          </Button>
          <Button
            className="bg-gray-100 hover:bg-gray-200 text-green-600 w-1/2"
            onClick={() => setShowModal(false)}
          >
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

