"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingService = void 0;
const common_1 = require("@nestjs/common");
const winston = require("winston");
const winstonDailyRotateFile = require("winston-daily-rotate-file");
let LoggingService = class LoggingService {
    constructor() {
        const logger = winston.createLogger({
            format: winston.format.combine(winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }), winston.format.errors({ stack: true }), winston.format.printf((info) => `[${info.timestamp}] [${info.level}] ${info.message}`)),
            transports: [
                new winstonDailyRotateFile({
                    level: 'debug',
                    datePattern: 'YYYY-MM-DD',
                    filename: 'application-%DATE%.log',
                    dirname: 'logs',
                    maxSize: '20m',
                    maxFiles: '30d',
                }),
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
        if (process.env.NODE_ENV !== 'production') {
            logger.add(new winston.transports.Console({
                level: 'debug',
                format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
            }));
        }
        this.logger = logger;
    }
    log(message) {
        this.logger.log({
            level: 'info',
            message: `${message}`,
        });
    }
    error(message, trace) {
        this.logger.log({
            level: 'error',
            message: `${message}:${trace}`,
        });
    }
    warn(message) {
        this.logger.log({
            level: 'warn',
            message: `${message}`,
        });
    }
    debug(message) {
        this.logger.log({
            level: 'debug',
            message: `${message}`,
        });
    }
    verbose(message) {
        this.logger.log({
            level: 'verbose',
            message: `${message}`,
        });
    }
};
exports.LoggingService = LoggingService;
exports.LoggingService = LoggingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LoggingService);
//# sourceMappingURL=logging.service.js.map