// src/components/DisplayComponent.tsx
import { useAtom } from 'jotai';
import { textAtom } from '@/app/experimental/statesample/feature3/store/atoms';

const DisplayComponent = () => {
  const [text] = useAtom(textAtom); // textAtomを取得

  return (
    <div className='mb-4'>
      <p>現在の値: {text}</p>
    </div>
  );
};

export default DisplayComponent;
