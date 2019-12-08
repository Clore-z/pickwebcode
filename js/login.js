layui.use(['form', 'layedit', 'laydate'], function() {
	var form = layui.form,
		layer = layui.layer,
		layedit = layui.layedit,
		laydate = layui.laydate;

	//创建一个编辑器
	var editIndex = layedit.build('LAY_demo_editor');


	//监听提交
	form.on('submit(demo1)', function(data) {
		layer.alert(JSON.stringify(data.field), {
			title: '最终的提交信息'
		});
		layui.$.ajax({
			url: url+'/buyer/user/login',
			method: 'post',
			data: data.field,
			dataType: 'JSON',
			success: function(res) {
				console.log(res);
				if(res.code == 200) {
					user = res.users;
					layui.$(".login_no").hide();
					layui.$(".login_yes").show();
					layui.$(".user-tx").attr("src", user.tx);
					layui.$(".username").html(user.username);
					console.log(user);
				} else{
					alert(res.msg);
				}
				
			},
			error: function(data) {
				console.log(data);
				alert("服务器繁忙");
			}
		})
		return false;
	});

	//表单取值
	layui.$('#LAY-component-form-getval').on('click', function() {
		var data = form.val('example');
		alert(JSON.stringify(data));
	});

});