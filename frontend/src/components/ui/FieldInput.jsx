import { Input } from "./input";
import { Label } from "./label";

const FieldInput = ({ name, label, placeholder, value, onChange }) => {
    return (
        <div className="flex flex-col items-start">
            <Label htmlFor={name} className="text-right mb-2 ml-2">
                {label}
            </Label>
            <Input
                id={name}
                value={value}
                name={name}
                onChange={onChange}
                className="border-2 border-gray-600 bg-transparent p-2 py-5"
                placeholder={placeholder}
            />
        </div>
    )
}

export default FieldInput