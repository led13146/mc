<!DOCTYPE html>
<html>
	<head>
		<link rel="icon" href="img/logo.ico">
		<link rel="stylesheet" href="css/mobile.css">
		<title>Minecraft 梦幻基岩服官方网站</title>
		<meta charset="utf-8">
	</head>
	<script>
		fetch('https://api.mcstatus.io/v2/status/bedrock/mc.52chye.cn')
			.then(response => response.json())
			.then(data => {
				if (data.players) {
					document.getElementById('players_online').textContent = data.players.online;
				}
			})
			.catch(error => {
				console.log('错误:', error);
			});
	</script>
	<body>
		<ul>
			<li class="xz"><a href="index.html" class="xz2">主页</a></li>
			<li><a href="query-mobile.html">状态</a></li>
			<li><a href="https://mc.minebbs.com/#/" target="_blank">下载</a></li>
			<li><a href="https://pd.qq.com/s/hgo4rn75h" target="_blank">频道</a></li>
			<li><a href=" " target="_blank">反馈</a></li>
			<li><a href="sponsor-mobile.html">赞助</a></li>
			<li><a href="https://qm.qq.com/q/LKeiIn4tSE"
					target="_blank">QQ群</a></li>
		</ul>
		<img src="img/title.png" height="155px" width="605px" class="logo">
		<div class="yx">
			<div style="margin-top: 100px;">
				<span class="value1" id="players_online" style="color: gold;font-size: 100px;">...</span>
				<span style="color: white;font-size: 50px;"> 个玩家在线</span>
			</div>
			<div class="button">
				<a class="dhl" href="minecraft://?addExternalServer=§l§5梦幻服|mc.52chye.cn:20239">加入游戏</a>
			</div>
		</div>
		<div class="js">
			<span>
				<h3 style="text-align:center; color: #00aeec; font-size: 40px;">梦幻服务器</h3>
				<div style="text-align:center; font-size: 20px;">IP：mc.52chye.cn <br> 端口：20239</div>
				<hr>
				&emsp;&emsp;我们服务器支持我的世界国际服最新版本 ，本服有着先进的钟表菜单插件，完整的虚拟货币系统，菜单中功能强大 其中包括 家园传送 随机传送 玩家互传 领地系统 商店系统 生存飞行 经济系统 传送系统 死亡返回
等 一系列功能 
<br>
				&emsp;&emsp;本服支持开创玩家组织 如公会 组织 机构等 更加热烈欢迎新玩家的到来 对玩家的一系列要求 做到尽量满足。使玩家更有热情，管理员也更加 热情
				<br>
				<h3>宣传视频: </h3>
				<iframe src="//player.bilibili.com/player.html?aid=496467860&bvid=BV1iK411e7A2&cid=1410814209&p=1"
					scrolling="on" border="0" frameborder="on" framespacing="0" allowfullscreen="true"
					style="width:925px; height:512px; border-radius: 10px;" id="bilibili"> </iframe>
				<h3>如何进服？</h3>
				<div>1.安装对应版本<a href="https://mc.minebbs.com/#/" target="_blank">客户端</a></div>
				<div>2.<a href="https://b23.tv/uAZ71Gh" target="_blank">登入微软账号</a></div>
				<div>3.进入官网点击<a href="minecraft://?addExternalServer=§l§5梦幻服|mc.52chye.cn:20239"
						target="_blank">加入本服</a>跳转应用</div>
				<div>4.依次点击[游戏]-[服务器]</div>
				<div>5.划到最下面，找到星空殿点击</div>
				<div>6.点击右侧[加入服务器]</div>
				<h3>非安卓用户如何安装客户端？</h3>
				<div>你想问，为什么没有安卓用户？难道你不知道下载APK文件进行安装？</div>
				<div>你想问，难道还有其他系统可以玩这个服务器？win10及以上或使用虚拟机，懂的都懂。</div>
				<div>win10及以上用户，先下载appx文件进行安装。</div>
				<div>然后自行寻找破解方法，或者购买正版(建议购买正版)</div>
				<div><s>正版用户无需运行Minecraft Unlock.exe程序</s>，懂的都懂。 </div>
				<div>一切完成之后就安装成功了，如果安装失败，请加Q群。 </div>
				<h3>服务器配置: </h3>
				<div>Xeon® Gold
🏅金牌企业 NVME
新一代Intel®金牌系列，多核性能强劲
CPU 4 核4G，等你来战</div>
				<div>32G硬盘，带宽25M 等你来玩</div>
				<h3>服务器规则: </h3>
				<div>破坏他人建筑、胡乱攻击其他玩家、辱骂他人、未经允许宣传其他服务器、熊炸骂骗引等都不行！</div>
				<div>然后就是开挂、ddos、cc、开盒、入侵、扫描等，这些违反后果严重，千万别干！</div>
			</span>
		</div>
		<div class="yw">
			网站备案/许可证号：
			<br>
			湘ICP备2023017619号
		</div>
	</body>
</html>
