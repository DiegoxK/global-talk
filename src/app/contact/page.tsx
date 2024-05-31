import Image from "next/image";
import Questions from "../(landing)/sections/questions";
import ContactForm from "./components/contact-form";

export default function Contact() {
  return (
    <>
      <div className="flex w-full flex-col xl:flex-row">
        <Image
          src="/contact/group.png"
          width={675}
          height={675}
          className="w-full object-cover xl:h-[675]
          xl:w-[675]"
          alt="Imagen decorativa"
        />
        <div className="w-full">
          <div className="flex items-center justify-center bg-primary-800 px-3 py-16 xl:h-[606px]">
            <div className="w-fit rounded-sm bg-primary-200 px-6 md:px-8">
              <div className="flex flex-col items-center">
                <h1 className="mt-6 text-2xl font-semibold">¡Unete ya!</h1>
                <p className="text-center xl:w-[400px]">
                  Deja tus datos aquí y nos pondremos en contacto contigo lo
                  antes posible.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
          <div className="h-[27px] bg-primary-900" />
          <div className="h-[42px] bg-primary-700" />
        </div>
      </div>
      <Questions />
    </>
  );
}
