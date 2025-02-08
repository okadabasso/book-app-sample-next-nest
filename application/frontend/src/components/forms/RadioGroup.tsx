import { checkboxVariants } from "./variants";
import Radio from "./Radio";
import clsx from "clsx";

interface RadioGroupProps {
    name: string;
    options: { value: string, text: string }[];
    variant?: keyof typeof checkboxVariants;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const RadioGroup = ({name, options, variant = 'default', className, onChange, ...props }: RadioGroupProps)=>{


    return (
        <div className="flex flex-row space-x-2">
            {options.map((option) => ( 
                <div key={option.value} className="flex items-center" >
                    <Radio 
                        name={name} 
                        value={option.value} 
                        text={option.text}
                        className={clsx(checkboxVariants[variant], className)} 
                        onChange={onChange} {...props}></Radio>
                </div>
            ))}

        </div>
    );
}

export default RadioGroup;