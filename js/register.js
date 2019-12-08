layui.use(['form', 'layedit', 'laydate'], function() {
	var form = layui.form,
		layer = layui.layer,
		layedit = layui.layedit,
		laydate = layui.laydate;

	//日期
	laydate.render({
		elem: '#date'
	});
	laydate.render({
		elem: '#date1'
	});

	//创建一个编辑器
	var editIndex = layedit.build('LAY_demo_editor');

	//自定义验证规则
	form.verify({
		username: [
			/(?=.*[a-zA-Z_-])[a-zA-Z0-9_-]{8,21}$/, '用户名必须8到21位（包含一个字母，数字，下划线，减号）'
		],
		pass: [
			/(?=.*[A-Za-z$@!%*#?&])[A-Za-z\d$@!%*#?&]{8,16}$/, '密码必须8到16位（包含一个大小写字母或者一个特殊字符）'
		],
		confirmPass: function(value) {
			if(layui.$('input[name=password]').val() !== value)
				return '两次密码输入不一致！';
		},

		content: function(value) {
			layedit.sync(editIndex);
		}
	});

	//监听指定开关
	form.on('switch(switchTest)', function(data) {
		layer.msg('开关checked：' + (this.checked ? 'true' : 'false'), {
			offset: '6px'
		});
		layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis)
	});

	//监听提交
	form.on('submit(demo1)', function(data) {
		layer.alert(JSON.stringify(data.field), {
			title: '最终的提交信息'
		})
		layui.$.ajax({
			url: url+'/buyer/user/register',
			method: 'post',
			data: data.field,
			dataType: 'JSON',
			success: function(res) {
				console.log(res);
				if(res.code == 200) {
					parent.closeIframe(res.msg);
				} else{
					alert(res.msg);
				}
					
			},
			error: function(data) {
				console.log(data);
				alert("服务器繁忙");
			}
		})
		return false; //如果不加这句，则ajax的回调函数不执行
	});

	//表单取值
	layui.$('#LAY-component-form-getval').on('click', function() {
		var data = form.val('example');
		alert(JSON.stringify(data));
	});

});