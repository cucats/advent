export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  console.log(userId);

  return <div>Profile released soon...</div>;
}
