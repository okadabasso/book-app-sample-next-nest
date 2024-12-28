## data

### book

| column name    | type           | description |
| -------------- | -------------- | ----------- |
| id             | int            |             |
| title          | varchar(255)   |             |
| publisher_id   | int            |             |
| published_date | date           |             |
| isbn13         | varchar(17)    |             |
| genre          | varchar(255)    |             |
| summary        | varchar(32767) |             |

### author

| column name | type         | description |
| ----------- | ------------ | ----------- |
| id          | int          |             |
| author_name | varchar(255) |             |

### publisher

| column name    | type         | description |
| -------------- | ------------ | ----------- |
| id             | int          |             |
| publisher_name | varchar(255) |             |

### book_author

| column name | type | description |
| ----------- | ---- | ----------- |
| id          | int  |             |
| book_id     | int  |             |
| author_id   | int  |             |

## next

```
npx create-next-app@latest
✔ What is your project named? … frontend
✔ Would you like to use TypeScript? … No / __Yes__
✔ Would you like to use ESLint? … No / __Yes__
✔ Would you like to use Tailwind CSS? … No / __Yes__
✔ Would you like your code inside a `src/` directory? … No / __Yes__
✔ Would you like to use App Router? (recommended) … No / __Yes__
✔ Would you like to use Turbopack for `next dev`? … No / __Yes__
✔ Would you like to customize the import alias (`@/*` by default)? … __No__ / Yes
```

## backend/typeorm

```
npm install typeorm
npm install mysql
npm install reflect-metadata
npm install @types/mysql --save-dev
```


## typeorm

### metadata table

```sql
          CREATE TABLE typeorm_metadata (
                `type` varchar(255) NOT NULL,
                `database` varchar(255) DEFAULT NULL,
                `schema` varchar(255) DEFAULT NULL,
                `table` varchar(255) DEFAULT NULL,
                `name` varchar(255) DEFAULT NULL,
                `value` text
            )
            
```