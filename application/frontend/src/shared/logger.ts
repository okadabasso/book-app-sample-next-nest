import * as winston from 'winston';
import winstonDailyRotateFile from 'winston-daily-rotate-file';

const logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss.SSS', // タイムスタンプのフォーマットを変える
      }),
      winston.format.errors({ stack: true }), // エラー時はスタックトレースを出力する
      winston.format.printf(
        (info) => `[${info.timestamp}] [${info.level}] ${info.message}`, // 出力内容をカスタマイズする
      ),
    ),
    transports: [
      // アクセスログの出力先設定
      new winstonDailyRotateFile({
        level: 'debug', // debugを指定すると、debug以上のログが出力される
        datePattern: 'YYYY-MM-DD', // 'YYYY-MM-DD'に設定すると、ログファイルが日付毎に作られる
        filename: 'application-%DATE%.log', // 保存先ファイル名(上記のdatePatternが含まれる)
        dirname: 'logs', // ログファイルの保存先ディレクトリ名
        maxSize: '20m', // ローテートするファイルの最大サイズ
        maxFiles: '30d', // 保存するログの最大数(日数を使う場合は接尾辞として'd'を追加)
      }),
      // エラーログの出力先設定
      new winstonDailyRotateFile({
        level: 'error',
        datePattern: 'YYYY-MM-DD',
        filename: 'error-%DATE%.log',
        dirname: 'logs',
        maxSize: '20m',
        maxFiles: '30d',
      }),
    ],
  });

  // 本番環境以外ではコンソールにも出力する
  if (process.env.NODE_ENV !== 'production') {
    logger.add(
      new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
          winston.format.colorize(), // ログを色付けする
          winston.format.simple(), // フォーマットをsimpleにする
        ),
      }),
    );
  }


export default logger;