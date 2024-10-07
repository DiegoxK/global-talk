export default function ResponsePage({
  searchParams,
}: {
  searchParams: {
    ref_payco: string;
  };
}) {
  const { ref_payco } = searchParams;

  return <div>{ref_payco}</div>;
}
