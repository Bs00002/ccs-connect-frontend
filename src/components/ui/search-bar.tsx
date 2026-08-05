export function SearchBar(props:any){
  return <input {...props} className={props.className || 'border rounded px-3 py-2 w-full'} />
}

export default SearchBar
