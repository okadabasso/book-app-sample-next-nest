'use client';
import Button from '@/components/forms/Button';
import Checkbox from '@/components/forms/Checkbox';
import CheckboxGroup from '@/components/forms/CheckboxGroup';
import MultiLineText from '@/components/forms/MultiLineText';
import Radio from '@/components/forms/Radio';
import RadioGroup from '@/components/forms/RadioGroup';
import Select from '@/components/forms/Select';
import TextBox from '@/components/forms/TextBox';
import TextContent from '@/components/forms/TextContent';
import { ArrowDownIcon, CalendarIcon, MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import React from 'react';

const ExperimentalFormPage = () => {
    return (
        <div className='pb-4'>
            <h1>Experimental Form</h1>
            <form>
                <div className='space-y-4'>
                    <div>
                        <h3>テキスト</h3>
                        <div className='flex flex-row space-x-4'>
                            <TextContent variant='default'>default </TextContent>
                            <TextContent variant='primary'>primary</TextContent>
                            <TextContent variant='secondary'>sedondary</TextContent>
                            <TextContent variant='info'>info</TextContent>
                            <TextContent variant='success'>success</TextContent>
                            <TextContent variant='danger'>danger</TextContent>
                            <TextContent variant='warning'>warning</TextContent>
                            <TextContent variant='disabled'>disabled</TextContent>
                        </div>
                    </div>
                    <div>
                        <h3>テキストボックス</h3>
                        <div className='flex flex-row gap-x-4 gap-y-2 flex-wrap content-start'>
                            <TextBox variant='default' width='w-32' ></TextBox>
                            <TextBox variant='primary' width='w-32'></TextBox>
                            <TextBox variant='secondary' width='w-32'></TextBox>
                            <TextBox variant='info' width='w-32'></TextBox>
                            <TextBox variant='success' width='w-32'></TextBox>
                            <TextBox variant='danger' width='w-32'></TextBox>
                            <TextBox variant='warning' width='w-32'></TextBox>
                            <TextBox variant='disabled' disabled width='w-32'></TextBox>
                        </div>
                    </div>
                    <div>
                        <h3>チェックボックス</h3>
                        <div className='flex flex-row gap-x-4 flex-wrap content-start'>
                            <Checkbox name='checkbox1' value='1' text='チェックボックス 1' variant='default'></Checkbox>
                            <Checkbox name='checkbox1' value='2' text='チェックボックス 2' variant='primary'></Checkbox>
                            <Checkbox name='checkbox1' value='3' text='チェックボックス 3' variant='secondary'></Checkbox>
                            <Checkbox name='checkbox1' value='4' text='チェックボックス 4' variant='info'></Checkbox>
                            <Checkbox name='checkbox1' value='5' text='チェックボックス 5' variant='success'></Checkbox>
                            <Checkbox name='checkbox1' value='6' text='チェックボックス 6' variant='danger'></Checkbox>
                            <Checkbox name='checkbox1' value='7' text='チェックボックス 7' variant='warning'></Checkbox>
                            <Checkbox name='checkbox1' value='6' text='チェックボックス 7' disabled={true} variant='disabled'></Checkbox>
                        </div>
                    </div>
                    <div>
                        <h3>チェックボックス グループ</h3>
                        <div className='flex flex-row space-x-4'>
                            <CheckboxGroup name='check' options={[{value:'1', text:'選択１'}, {value:'2', text:'選択２'},{value:'3', text:'選択３'}]}
                                variant='default'></CheckboxGroup>
                        </div>
                    </div>
                    <div>
                        <h3>ラジオボタン</h3>
                        <div className='flex flex-row space-x-4'>
                            <Radio name='radio1' value='1' text='ラジオ 1' variant='default'></Radio>
                            <Radio name='radio1' value='2' text='ラジオ 2'  variant='primary'></Radio>
                            <Radio name='radio1' value='3' text='ラジオ 3'  variant='secondary'></Radio>
                            <Radio name='radio1' value='4' text='ラジオ 4'  variant='info'></Radio>
                            <Radio name='radio1' value='5' text='ラジオ 5'  variant='success'></Radio>
                            <Radio name='radio1' value='6' text='ラジオ 6'  variant='danger'></Radio>
                            <Radio name='radio1' value='7' text='ラジオ 7' variant='warning'></Radio>
                            <Radio name='radio1' value='7' text='ラジオ 7' disabled  variant='disabled'></Radio>
                        </div>
                    </div>
                    <div>
                        <h3>ラジオボタン グループ</h3>
                        <div className='flex flex-row space-x-4'>
                            <RadioGroup name='radio' options={[{value:'1', text:'選択１'}, {value:'2', text:'選択２'},{value:'3', text:'選択３'}]}
                                variant='default'></RadioGroup>
                        </div>
                    </div>
                    <div>
                        <h3>セレクト</h3>
                        <div className='flex flex-row flex-wrap gap-4'>
                            <Select variant='default' options={[{ value: '1', text: 'Option 1' }, { value: '2', text: 'Option 2' }]}></Select>
                            <Select variant='primary' options={[{ value: '1', text: 'Option 1' }, { value: '2', text: 'Option 2' }]}></Select>
                            <Select variant='secondary' options={[{ value: '1', text: 'Option 1' }, { value: '2', text: 'Option 2' }]}></Select>
                            <Select variant='info' options={[{ value: '1', text: 'Option 1' }, { value: '2', text: 'Option 2' }]}></Select>
                            <Select variant='success' options={[{ value: '1', text: 'Option 1' }, { value: '2', text: 'Option 2' }]}></Select>
                            <Select variant='danger' options={[{ value: '1', text: 'Option 1' }, { value: '2', text: 'Option 2' }]}></Select>
                            <Select variant='warning' options={[{ value: '1', text: 'Option 1' }, { value: '2', text: 'Option 2' }]}></Select>
                            <Select variant='disabled' options={[{ value: '1', text: 'Option 1' }, { value: '2', text: 'Option 2' }]}></Select>
                        </div>
                    </div>
                    <div>
                        <h3>テキストエリア</h3>
                        <div className='flex flex-row flex-wrap gap-4'>
                            <MultiLineText variant='default' className='w-48' value='複数行入力'></MultiLineText>
                            <MultiLineText variant='primary' className='w-48'></MultiLineText>
                            <MultiLineText variant='secondary' className='w-48'></MultiLineText>
                            <MultiLineText variant='info' className='w-48'></MultiLineText>
                            <MultiLineText variant='success' className='w-48'></MultiLineText>
                            <MultiLineText variant='danger' className='w-48'></MultiLineText>
                            <MultiLineText variant='warning' className='w-48'></MultiLineText>
                            <MultiLineText variant='disabled' className='w-48' disabled></MultiLineText>
                        </div>
                    </div>
                    <div>
                        <h3>ボタン</h3>
                        <div className='flex flex-row flex-wrap gap-4'>
                            <Button variant='default'>default</Button>
                            <Button variant='primary'>primary</Button>
                            <Button variant='secondary'>secondary</Button>
                            <Button variant='info'>info</Button>
                            <Button variant='success'>success</Button>
                            <Button variant='danger'>danger</Button>
                            <Button variant='warning'>warning</Button>
                            <Button variant='disabled' disabled>disabled</Button>

                        </div>
                    </div>
                    <div>
                        <h3>アウトラインボタン</h3>
                        <div className='flex flex-row flex-wrap gap-4'>
                            <Button variant='outline-default'>default</Button>
                            <Button variant='outline-primary'>primary</Button>
                            <Button variant='outline-secondary'>secondary</Button>
                            <Button variant='outline-info'>info</Button>
                            <Button variant='outline-success'>success</Button>
                            <Button variant='outline-danger'>danger</Button>
                            <Button variant='outline-warning'>warning</Button>
                            <Button variant='outline-disabled' disabled>disabled</Button>

                        </div>
                    </div>
                    <div>
                        <h3>アイコンつきテキストボックス</h3>
                        <div className='flex flex-row gap-x-4 gap-y-2 flex-wrap content-start'>
                            <TextBox variant='default' className='w-32' iconLeft={<ArrowDownIcon className='w-4 h-4' />} ></TextBox>
                            <TextBox variant='primary' className='w-32' iconRight={<ArrowDownIcon className='w-4 h-4' />} ></TextBox>
                            <TextBox variant='secondary' className='w-32'
                            iconLeft={<CalendarIcon className='w-4 h-4 cursor-pointer' />}
                            iconRight={<ArrowDownIcon className='w-4 h-4' />}
                            ></TextBox>
                            <TextBox variant='info' className='w-32' iconLeft={<MagnifyingGlassIcon className='w-4 h-4 cursor-pointer' onClick={()=>alert(100)} />}></TextBox>
                            <TextBox variant='success' className='w-32'></TextBox>
                            <TextBox variant='danger' className='w-32'></TextBox>
                            <TextBox variant='warning' className='w-32'></TextBox>

                        </div>
                    </div>

                </div>

            </form>
        </div>
    );
};

export default ExperimentalFormPage;