// import {
//   ipcMain
// } from 'electron'

// const SerialPort = require('serialport')

// ipcMain.on('asynchronous-message', function(event, arg) {
//   console.log(arg)
//   // event.sender.send('asynchronous-reply', 'pong')
//   SerialPort.list((err, ports) => {
//     console.log(err, 'ports', ports, JSON.stringify(ports))
//     event.sender.send('asynchronous-reply', JSON.stringify(ports))

//     const port = new SerialPort(ports[0]['comName'], { autoOpen: false })

//     // Open errors will be emitted as an error event
//     port.on('error', function(err) {
//       event.sender.send('asynchronous-reply', err.message)
//       console.log('Error: ', err.message)
//     })

//     // port.on('readable', function() {
//     //   console.log('Data:', port.read())
//     // })

//     const parser = new SerialPort.parsers.Readline({
//       delimiter: ';'
//     })

//     port.pipe(parser)

//     parser.on('data', function(data) {
//       console.log('Data:', data.toString())
//       event.sender.send('asynchronous-reply', data.toString())
//     })

//     setInterval(function(arg) {
//       console.log(`arg was => ${arg}`, port.isOpen)
//       if (!port.isOpen) {
//         event.sender.send('asynchronous-reply', 'connecting serialport')
//         port.open(function(err) {
//           if (err) {
//             event.sender.send('asynchronous-reply', err.message)
//             return console.log('Error opening port: ', err.message)
//           }

//           // Because there's no callback to write, write errors will be emitted on the port:
//           port.write('main screen turn on;')
//         })
//       } else {
//         port.write(Date.now().toString() + ';', function(err) {
//           if (err) {
//             return console.log('Error on write: ', err.message)
//           }
//           console.log('message written')
//         })
//       }
//     }, 1000, 'funky')

//     port.write('main screen;', function(err) {
//       if (err) {
//         return console.log('Error on write: ', err.message)
//       }
//       console.log('message written')
//     })
//   })
// })

// ipcMain.on('synchronous-message', function(event, arg) {
//   console.log(arg)
//   event.returnValue = 'pong'
// })

// // function open_serial(comName, baudrate, databits, parity, stopbits) {
// //   var serialPort = new SerialPort.SerialPort(comName, {
// //     baudrate: baudrate, // 波特率设置
// //     databits: databits, // 数据位
// //     parity: parity, // 校验位
// //     stopbits: stopbits // 停止位
// //     //  parser: SerialPort.parsers.readline("\n")  //这句可能调用方法不对，加上这句就会出现接收数据编码不正常
// //   })
// //   return serialPort
// // }
