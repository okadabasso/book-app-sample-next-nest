// src/components/InputComponent.tsx
import { useAtom } from 'jotai';
import { textAtom } from '@/app/experimental/statesample/feature3/store/atoms';

const InputComponent = () => {
  const [text, setText] = useAtom(textAtom); // textAtomを取得

  return (
    <div className='mb-4'>
      <label htmlFor="textInput" className='mr-4'>入力:</label>
      <input
        id="textInput"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)} // 値を更新
        placeholder="ここに入力してください"
        className='border border-gray-400 focus:outline focus:outline-2 focus:outline-blue-500 rounded-sm px-1 py-0.5'
      />
    </div>
  );
};

export default InputComponent;
