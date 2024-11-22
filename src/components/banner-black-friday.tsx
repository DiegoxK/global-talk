// Tercer intento, esta fue la forma correcta de lograr lo que queria

import Link from "next/link";

export default function Banner() {
  return (
    <div>
      <Link href="/join">
        <button className="border-5 mt-[10px] flex w-full items-center justify-center gap-[13px] rounded-[10px] border-solid border-primary-300 bg-gradient-to-r from-[#09080A] via-[#09080A] to-[#9D07CF] py-[15px]">
          <p className="font-primary text-[18px] font-medium leading-none tracking-[1.6px] text-[#FFF]">
            BLACK DAYS. 20% descuento en todos nuestros cursos y planes. Cupos
            limitados.
          </p>
          <svg
            width="21"
            height="15"
            viewBox="0 0 21 15"
            className="fill-white"
          >
            <path d="M20.7236 8.01862C21.1048 7.619 21.0899 6.98601 20.6903 6.6048L14.1781 0.392536C13.7785 0.0113211 13.1455 0.0262382 12.7643 0.425855C12.3831 0.825471 12.398 1.45846 12.7976 1.83968L18.5862 7.36169L13.0642 13.1502C12.683 13.5499 12.6979 14.1828 13.0975 14.5641C13.4971 14.9453 14.1301 14.9304 14.5113 14.5307L20.7236 8.01862ZM1.02356 8.77585L20.0236 8.32809L19.9764 6.32865L0.976441 6.7764L1.02356 8.77585Z" />
          </svg>
        </button>
      </Link>
    </div>
  );
}

// Segundo intento, disenio incorrecto y lleva al link, reutilizando el componente button de diego

//import { ButtonBanner } from "@/components/ui/button-banner";
//import Link from "next/link";

//export default function Banner() {
//return (
// <div>
//   <Link href="/join">
//      <ButtonBanner className="border-5 mt-[10px] flex w-full items-center justify-center">
//       <p className="font-primary text-[18px] font-medium leading-none tracking-[1.6px]">
//         BLACK DAYS. 20% descuento en todos nuestros cursos y planes. Cupos
//         limitados.
//       </p>
//       <svg
//         width="21"
//        height="15"
//          viewBox="0 0 21 15"
//       className="fill-current"
//      >
//        <path d="M20.7236 8.01862C21.1048 7.619 21.0899 6.98601 20.6903 6.6048L14.1781 0.392536C13.7785 0.0113211 13.1455 0.0262382 12.7643 0.425855C12.3831 0.825471 12.398 1.45846 12.7976 1.83968L18.5862 7.36169L13.0642 13.1502C12.683 13.5499 12.6979 14.1828 13.0975 14.5641C13.4971 14.9453 14.1301 14.9304 14.5113 14.5307L20.7236 8.01862ZM1.02356 8.77585L20.0236 8.32809L19.9764 6.32865L0.976441 6.7764L1.02356 8.77585Z" />
//      </svg>
//     </ButtonBanner>
//    </Link>
//  </div>
//  );
//}

////////////////////////////////////////////////////////////////////////////////

// Primer intento, este tiene autolayout y el disenio correcto, pero no deja ir al link

//export default function Banner() {
//  return (
//<button className="border-5 mt-[10px] flex w-full items-center justify-center gap-[13px] rounded-[10px] border-solid border-primary-300 bg-gradient-to-r from-[#09080A] via-[#09080A] to-[#9D07CF] py-[15px]">
//     <p className="font-primary text-[18px] font-medium leading-none tracking-[1.6px] text-[#FFF]">
//       BLACK DAYS. 20% descuento en todos nuestros cursos y planes.
//       Cupos limitados.
//  </p>
//    <svg width="21" height="15" viewBox="0 0 21 15" className="fill-white">
//       <path d="M20.7236 8.01862C21.1048 7.619 21.0899 6.98601 20.6903 6.6048L14.1781 0.392536C13.7785 0.0113211 13.1455 0.0262382 12.7643 0.425855C12.3831 0.825471 12.398 1.45846 12.7976 1.83968L18.5862 7.36169L13.0642 13.1502C12.683 13.5499 12.6979 14.1828 13.0975 14.5641C13.4971 14.9453 14.1301 14.9304 14.5113 14.5307L20.7236 8.01862ZM1.02356 8.77585L20.0236 8.32809L19.9764 6.32865L0.976441 6.7764L1.02356 8.77585Z" />
//    </svg>
//   </button>
// );
//}
