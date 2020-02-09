// import { ipcMain } from 'electron'
// const SerialPort = require('serialport')

// // 定义类
// class LowLevel {
//   // 构造函数
//   constructor(x, y) {
//     this.x = x // 类中变量
//     this.y = y
//   }
//   // 类中函数
//   toString() {
//     return '(' + this.x + ', ' + this.y + ')'
//   }
//   // 静态函数
//   static sayHello(name) {
//     // 修改静态变量
//     this.para = name
//     return 'Hello, ' + name
//   }
// }
// // 静态变量
// Point.para = 'Allen'
// module.exports = Point

import {
  ipcMain
} from 'electron'

const log4js = require('log4js')
const logger = log4js.getLogger('ports')
const CronJob = require('cron').CronJob
const SerialPort = require('serialport')
const parser = new SerialPort.parsers.Readline({
  delimiter: ';'
})

var current_device = null
var current_cache = []

ipcMain.on('port_cache', function(event, arg) {
  logger.debug('port_cache -> arg:', arg)
  if (current_cache.length > 0) {
    // event.returnValue = current_cache.pop()
    event.sender.send('port_cache', current_cache.pop())
  } else if (current_device != null) {
    event.sender.send('port_ports', current_device.path)
  }
})

function deal_device(data) {
  var tmp = { 'time': Date.now().toString(), 'data': data.toString() }
  logger.debug('Data:', tmp)
  current_cache.push(tmp)
}

function lock_device() {
  // logger.debug(err, serial_ports)
  if (current_device != null) {
    logger.info('exist dev', current_device.isOpen)
    if (current_device.isOpen === false) {
      logger.info('remove dev')
      parser.removeListener('data', deal_device)
      current_device = null
    } else {
      logger.info('ready dev')

      current_device.write('unit_test\n' + Date.now().toString() + ';', function(err) {
        if (err) {
          return logger.error('Error on write: ', err.message)
        }
        logger.info('write dev')
      })
    }
  } else {
    SerialPort.list((err, ports) => {
      if (err == null) {
        logger.info('find dev')
        ports.forEach(element => {
          if (element['vendorId'] === '1A86' && element['productId'] === '7523') {
            current_device = new SerialPort(element['comName'], () => {
              if (current_device.isOpen === true) {
                logger.info('dev connected')
                current_device.pipe(parser)
                parser.on('data', deal_device)
                current_device.on('error', function(err) {
                  logger.error(err.message)
                })
              } else {
                logger.info('dev is busy')
                current_device = null
              }
            })
            logger.info('commit dev')
            throw new Error('commit dev')
          }
        })
      }
    })
  }
}

var job_view_serial = new CronJob('*/5 * * * * *', function() {
  logger.debug(lock_device, lock_device())
})

job_view_serial.start()
