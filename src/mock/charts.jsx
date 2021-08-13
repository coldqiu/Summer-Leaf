// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Chart, Line, Point } from 'bizcharts';

// // 数据源
// // const data = [
// // 	{ month: "2015-01-01", acc: 84.0 },
// // 	{ month: "2015-02-01", acc: 14.9 },
// // 	{ month: "2015-03-01", acc: 17.0 },
// // 	{ month: "2015-04-01", acc: 20.2 },
// // 	{ month: "2015-05-01", acc: 55.6 },
// // 	{ month: "2015-06-01", acc: 56.7 },
// // 	{ month: "2015-07-01", acc: 30.6 },
// // 	{ month: "2015-08-01", acc: 63.2 },
// // 	{ month: "2015-09-01", acc: 24.6 },
// // 	{ month: "2015-10-01", acc: 14.0 },
// // 	{ month: "2015-11-01", acc: 9.4 },
// // 	{ month: "2015-12-01", acc: 7.3 }
// // ];

// let current = Date.now() + (Math.random() + 1) * 10 ** 12;
// let data = [{ current, index: 1 }];
// function Demo() {
// 	const [count, setCount] = React.useState(0);
// 	const [arr, setArr] = React.useState(data);
// 	React.useEffect(() => {
// 		const interval = setInterval(() => {
// 			console.log("this.is.inSide of Interval count", count); // 始终为 0
// 			setCount(count + 1); // 始终只为 1,删除依赖，可以更新count
// 			// setCount((x, y) => {
// 			//   console.log("x ,  interval", x, interval);
// 			//   return x + 1;
// 			// }); //
// 			let current = Date.now() + (Math.random() + 1) * 10 ** 12;

// 			console.log("count", count);
// 			let data = arr.slice();
// 			let index = count + 1;
// 			data.push({ current, index });
// 			if (data.length > 10) data.shift();
// 			setArr(data);
// 			setCount((count) => count + 1);
// 			console.log("data", data);
// 		}, 500);

// 		return () => {
// 			clearInterval(interval);
// 		};
// 	});
// 	return (
// 		<div>
// 			{count}
// 			<Chart animate={false} scale={{ value: { min: 0 } }} padding={[10, 20, 50, 40]} autoFit height={500} data={arr} >
// 				<Line
// 					shape="smooth"
// 					position="index*current"
// 					color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
// 				/>
// 			</Chart>
// 		</div>
// 	)
// }



// ReactDOM.render(<Demo />, mountNode);


