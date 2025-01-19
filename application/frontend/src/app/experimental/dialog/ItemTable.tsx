import React from 'react';

interface Item {
    id: number;
    name: string;
    description: string;
    date: string;
    category: string;

}

interface ItemTableProps {
}

const items: Item[] = [
    { id: 1, name: 'Item 1', description: 'Description 1', date: '2022-01-01', category: 'Category 1' },
    { id: 2, name: 'Item 2', description: 'Description 2', date: '2022-01-02', category: 'Category 2' },
    { id: 3, name: 'Item 3', description: 'Description 3', date: '2022-01-03', category: 'Category 3' },
    { id: 4, name: 'Item 4', description: 'Description 4', date: '2022-01-04', category: 'Category 4' },
    { id: 5, name: 'Item 5', description: 'Description 5', date: '2022-01-05', category: 'Category 5' },
    { id: 6, name: 'Item 6', description: 'Description 6', date: '2022-01-06', category: 'Category 6' },
    { id: 7, name: 'Item 7', description: 'Description 7', date: '2022-01-07', category: 'Category 7' },
    { id: 8, name: 'Item 8', description: 'Description 8', date: '2022-01-08', category: 'Category 8' },
    { id: 9, name: 'Item 9', description: 'Description 9', date: '2022-01-09', category: 'Category 9' },
    { id: 10, name: 'Item 10', description: 'Description 10', date: '2022-01-10', category: 'Category 10' },
    { id: 11, name: 'Item 11', description: 'Description 11', date: '2022-01-11', category: 'Category 11' },
    { id: 12, name: 'Item 12', description: 'Description 12', date: '2022-01-12', category: 'Category 12' },
    { id: 13, name: 'Item 13', description: 'Description 13', date: '2022-01-13', category: 'Category 13' },
    { id: 14, name: 'Item 14', description: 'Description 14', date: '2022-01-14', category: 'Category 14' },
    { id: 15, name: 'Item 15', description: 'Description 15', date: '2022-01-15', category: 'Category 15' },
    { id: 16, name: 'Item 16', description: 'Description 16', date: '2022-01-16', category: 'Category 16' },
    { id: 17, name: 'Item 17', description: 'Description 17', date: '2022-01-17', category: 'Category 17' },
    { id: 18, name: 'Item 18', description: 'Description 18', date: '2022-01-18', category: 'Category 18' },
    { id: 19, name: 'Item 19', description: 'Description 19', date: '2022-01-19', category: 'Category 19' },
    { id: 20, name: 'Item 20', description: 'Description 20', date: '2022-01-20', category: 'Category 20' },
    { id: 21, name: 'Item 21', description: 'Description 21', date: '2022-01-21', category: 'Category 21' },
    { id: 22, name: 'Item 22', description: 'Description 22', date: '2022-01-22', category: 'Category 22' },
    { id: 23, name: 'Item 23', description: 'Description 23', date: '2022-01-23', category: 'Category 23' },
    { id: 24, name: 'Item 24', description: 'Description 24', date: '2022-01-24', category: 'Category 24' },
    { id: 25, name: 'Item 25', description: 'Description 25', date: '2022-01-25', category: 'Category 25' },
    { id: 26, name: 'Item 26', description: 'Description 26', date: '2022-01-26', category: 'Category 26' },
];
const ItemTable = ({  }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.date}</td>
                        <td>{item.category}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ItemTable;