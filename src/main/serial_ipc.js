import {
  ipcMain
} from 'electron'

const SerialPort = require('serialport')

ipcMain.on('asynchronous-message', function(event, arg) {
  console.log(arg)
  // event.sender.send('asynchronous-reply', 'pong')
  SerialPort.list((err, ports) => {
    console.log(err, 'ports', ports, JSON.stringify(ports))
    event.sender.send('asynchronous-reply', JSON.stringify(ports))
  })
})

ipcMain.on('synchronous-message', function(event, arg) {
  console.log(arg)
  event.returnValue = 'pong'
})

// function open_serial(comName, baudrate, databits, parity, stopbits) {
//   var serialPort = new SerialPort.SerialPort(comName, {
//     baudrate: baudrate, // 波特率设置
//     databits: databits, // 数据位
//     parity: parity, // 校验位
//     stopbits: stopbits // 停止位
//     //  parser: SerialPort.parsers.readline("\n")  //这句可能调用方法不对，加上这句就会出现接收数据编码不正常
//   })
//   return serialPort
// }
