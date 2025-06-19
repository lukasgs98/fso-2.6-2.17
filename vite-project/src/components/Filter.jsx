import Input from "./Input.jsx"

const Filter = ({currentFilter, onChange}) => 
    <Input 
        label="Filter" 
        value={currentFilter} 
        onChange={(event) => onChange(event.target.value)} 
    />

export default Filter