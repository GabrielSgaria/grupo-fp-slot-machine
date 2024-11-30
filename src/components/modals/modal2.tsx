import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Modal2Props {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
}

export default function Modal2({ showModal, setShowModal }: Modal2Props) {
    return (
        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="max-w-[90%] rounded-xl sm:max-w-[555px] bg-transparent shadow-none border-none" showCloseButton={false}>
                <Image
                    src="https://imagedelivery.net/6tAoXewsW-UbrMK1VkE8GQ/fb666de9-5092-4963-a1f2-839182f2df00/public"
                    alt="Informações Jurídicas"
                    width={700}
                    height={700}
                    quality={100}
                    priority
                    className="w-full h-auto mb-4"
                />
                <Button
                    className="bg-gray-100 hover:bg-gray-200 text-green-600 w-full"
                    onClick={() => setShowModal(false)}
                >
                    Fechar
                </Button>
            </DialogContent>
        </Dialog>

    );
}
