import { Textarea } from "./textarea";
import { Label } from "./label";

const FieldTextarea = ({ name, label, placeholder, value, onChange }) => {
    return (
        <div className="flex flex-col items-start">
            <Label htmlFor={name} className="text-right mb-2 ml-2">
                {label}
            </Label>
            <Textarea
                id={name}
                name={name}
                className="border-2 border-gray-600 bg-transparent p-2 py-5"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default FieldTextarea