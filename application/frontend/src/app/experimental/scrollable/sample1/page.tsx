'use client';
import Button from '@/components/forms/Button';
import TextLink from '@/components/forms/TextLink';

const ScrollablePage1 = () => {


    return (
        <div className='overflow-hidden flex flex-col' style={{ height: 'calc(100vh - 6.5rem)' }}>
            <h2>scrollable content</h2>
            <div className='scrollable border border-gray-400'>
                <div className="bg-gray-100" style={{ height: '800px' }}>
                       b
                </div>
                <div>

                </div>
            </div>
            <div className='my-2'><Button className='pt-0.5 px-1 w-24 text-sm'>find</Button></div>
            <div className='mt-4 flex gap-4 items-center'>
                <Button className='w-32'>保存</Button>
                <TextLink href='/experimental/scrollable' className='text-blue-500' variant='primary'>戻る</TextLink>

            </div>
        </div>
    );
};

export default ScrollablePage1;