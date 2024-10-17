import type { ValidationResponse } from "types/epayco";
import FailedTransaction from "./_components/failed-transaction";
import SuccessfulTransaction from "./_components/successful-transaction";

export default async function ResponsePage({
  searchParams,
}: {
  searchParams: {
    ref_payco: string;
  };
}) {
  const { ref_payco } = searchParams;
  // https://secure.epayco.co/validation/v1/reference/ref_payco

  const response = await fetch(
    `https://secure.epayco.co/validation/v1/reference/${ref_payco}`,
  );

  console.log(response);

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  const data = (await response.json()) as ValidationResponse;

  if (data.success === false) {
    return <FailedTransaction errorMessage={data.text_response} />;
  }

  return <SuccessfulTransaction {...data.data} />;
}
