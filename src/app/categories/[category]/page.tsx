

export default async function Page(props: { params: Promise<{ category: string }> }) {
  const { category } = await props.params;

  return (
    <div>
      <h1>{category}</h1>
    </div>
  )
}
