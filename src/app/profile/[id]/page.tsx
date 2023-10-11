export default ({params}: any) => {
  return (
    <div>
      <h1>Profile <span className="p-1 bg-yellow-800 ml-2">{params.id}</span></h1>
    </div>
  )
}
