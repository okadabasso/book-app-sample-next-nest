import { checkboxVariants } from "./variants";
import Checkbox from "./Checkbox";
import clsx from "clsx";

interface CheckboxProps {
    name: string;
    options: { value: string, text: string }[];
    variant?: keyof typeof checkboxVariants;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const CheckboxGroup = ({name, options, variant = 'default', className, onChange, ...props }: CheckboxProps)=>{


    return (
        <div className="flex flex-row space-x-2">
            {options.map((option) => ( 
                <div key={option.value} className="flex items-center" >
                    <Checkbox name={name} 
                        value={option.value} 
                        text={option.text} 
                        variant={variant} 
                        onChange={onChange} {...props}
                        className={clsx(checkboxVariants[variant], className)}
                    ></Checkbox>
                </div>
            ))}

        </div>
    );
}

export default CheckboxGroup;