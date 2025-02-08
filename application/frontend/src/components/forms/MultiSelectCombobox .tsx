import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/16/solid';

interface Option {
  id: number;
  name: string;
  isNew?: boolean;
}

interface MultiSelectComboboxProps<T> {
  fetchOptions: (q: string) => Promise<T[]>;
  initialSelectedItems?: T[];  // 初期選択項目
}
// MultiSelectComboboxRef 型の定義
export interface MultiSelectComboboxRef {
  getSelectedItems: () => Option[];
}

const MultiSelectCombobox = forwardRef<MultiSelectComboboxRef, MultiSelectComboboxProps<Option>>(
  ({ fetchOptions, initialSelectedItems = [] }, ref,) => {
    const [selectedItems, setSelectedItems] = useState<Option[]>(initialSelectedItems);
    const [query, setQuery] = useState('');
    const [options, setOptions] = useState<Option[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    // 親に選択された項目を返す関数
    useImperativeHandle(ref, () => ({
      getSelectedItems: () => selectedItems,
    }));

    const addItemToSelection = (item: Option) => {
      setSelectedItems((prev) => {
        // 重複チェック: id を基準に確認
        const exists = prev.some((selectedItem) => selectedItem.id === item.id);

        // 重複していなければ追加
        if (!exists) {
          return [...prev, item];
        }

        // 重複している場合はそのまま
        return prev;
      });
    };

    const handleQueryChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setQuery(value);
      const result = await fetchOptions(value);
      setOptions(result);
      setIsOpen(true);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        if (!options.some((option) => option.name.toLowerCase() === query.toLowerCase())) {
          if (selectedItems.some((item) => item.name.toLowerCase() === query.toLowerCase())) {
            return;
          }
          // オプションに一致するものがない場合、入力値を追加
          const newOption = { id: Date.now(), name: query, isNew: true };
          addItemToSelection(newOption);
        }

        // 入力値をクリア
        setQuery('');
      }
      else if (event.key === 'Escape') {
        setIsOpen(false);
      }
      else if (event.key == 'Backspace' && query === '') {
        // 最後の選択項目を削除
        setSelectedItems((prev) => prev.slice(0, prev.length - 1));
      }
    };

    const handleOptionClick = (option: Option) => {
      addItemToSelection(option);
      setQuery('');
    };

    const handleRemoveButtonClick = (item: Option) => {
      setSelectedItems((prev) => prev.filter((selectedItem) => selectedItem.id !== item.id));
    }

    return (
      <div className="relative">
        <Combobox as="div" value={selectedItems} onChange={setSelectedItems} multiple>
          <div className="flex flex-wrap items-center border border-gray-400 rounded-sm px-2 py-1 gap-2 : focus-within:ring-2 focus-within:ring-blue-500">
            {selectedItems.map((item) => (
              <span
                key={item.id}
                className="bg-gray-100 text-gray-800 px-2 py-0.5 leading-4 rounded-sm flex items-center"
              >
                {item.name}{' '}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // 削除処理を追加する場合はここで行います
                    handleRemoveButtonClick(item);
                  }}
                  className="ml-1 text-gray-800"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </span>
            ))}
            <ComboboxInput
              onChange={handleQueryChange}
              onKeyDown={handleKeyDown}
              value={query}
              placeholder="Search items..."
              className="flex-1 outline-none border-none focus:ring-0"
            />
          </div>
          {isOpen && (
            <ComboboxOptions className="absolute z-10 bg-white border mt-1 max-h-60 w-full overflow-auto rounded shadow">
              {options.map((option) => (
                <ComboboxOption key={option.id} value={option} as={React.Fragment}>
                  {({ active }) => (
                    <div
                      onClick={() => handleOptionClick(option)}
                      className={`cursor-pointer px-2 py-0.5 ${active ? 'bg-blue-500 text-white' : ''}`}
                    >
                      {option.name}
                    </div>
                  )}
                </ComboboxOption>))}
            </ComboboxOptions>
          )}
        </Combobox>
      </div>
    );
  }
);
// エラー Component definition is missing display name を解消するために displayName を設定
MultiSelectCombobox.displayName = 'MultiSelectCombobox';
export default MultiSelectCombobox;
