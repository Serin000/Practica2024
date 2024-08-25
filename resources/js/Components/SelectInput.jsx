import {forwardRef, useRef} from 'react';

export default forwardRef(function SelectInput({options = [], value, className = '', ...props}, ref) {
    const input = ref ? ref : useRef();

    return (
        <select
            {...props}
            className={
                'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm ' +
                className
            }
            ref={input}
            value={value}
        >
            <option value={''}>Please select</option>
            {options.map((option, index) => (
                <option key={index} value={option.id}>{option.name}</option>
            ))}
        </select>
    );
});
