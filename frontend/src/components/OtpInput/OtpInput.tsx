import { ComponentPropsWithoutRef, ChangeEvent, KeyboardEvent, ClipboardEvent } from 'react';
type PartialInputProps = Pick<ComponentPropsWithoutRef<'input'>, 'className' | 'style'>;

type Props = {
   value: string;
   onChange(value: string): void;
   size?: number;
   validationPattern?: RegExp;
} & PartialInputProps;

const OtpInput = (props: Props) => {
   const { size = 6, validationPattern = /[0-9]{1}/, value, onChange, ...restProps } = props;
   const arr = new Array(size).fill('-');

   const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
      const elem = e.target;
      const val = e.target.value;
      if (!validationPattern.test(val) && val !== '') return;

      const valueArr = value.split('');
      valueArr[index] = val;
      const newVal = valueArr.join('').slice(0, 6);
      onChange(newVal);

      if (val) {
         const next = elem.nextElementSibling as HTMLInputElement | null;
         next?.focus();
      }
   };

   const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
      const current = e.currentTarget;
      if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
         const prev = current.previousElementSibling as HTMLInputElement | null;
         prev?.focus();
         prev?.setSelectionRange(0, 1);
         return;
      }

      if (e.key === 'ArrowRight') {
         const prev = current.nextSibling as HTMLInputElement | null;
         prev?.focus();
         prev?.setSelectionRange(0, 1);
         return;
      }
   };

   const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const val = e.clipboardData.getData('text').substring(0, size);
      onChange(val);
   };

   return (
      <div className="flex gap-2">
         {arr.map((_, index) => {
            return (
               <input
                  key={index}
                  className={`m-2 border dark:border-rose-400 border-indigo-400 h-10 w-10 text-center form-control rounded text-black dark:text-gray-100 dark:bg-night-100 outline-none`}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern={validationPattern.source}
                  maxLength={6}
                  value={value.at(index) ?? ''}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyUp={handleKeyUp}
                  onPaste={handlePaste}
                  required={true}
                  {...restProps}
               />
            );
         })}
      </div>
   );
};
export default OtpInput;
