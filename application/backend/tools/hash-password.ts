import { compare, hash } from 'bcryptjs';

async function main() {
    const args = process.argv.slice(2); // コマンドライン引数を取得
    if (args.length === 0) {
        console.error('Please provide a password to hash.');
        process.exit(1);
    }

    const password = args[0];
    const hashedPassword = await hash(password, 10); // パスワードをハッシュ化
    console.log(`Hashed password: ${hashedPassword}`);
}

main().catch((err) => {
    console.error('Error during tool execution:', err);
});