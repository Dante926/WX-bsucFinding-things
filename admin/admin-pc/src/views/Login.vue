<template>
    <div class="body">
        <img class="bg" src="../assets/失物招领封面.png" alt="">

        <div class="form">
            <div class="title">失物招领管理系统</div>
            <el-input v-model="username" placeholder="请输入账号"></el-input>
            <el-input v-model="password" placeholder="请输入密码"></el-input>
            <el-button @click="submit">登录</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        submit() {
            const { username, password } = this;
            if (!username || !password) {
                this.$message.error('存在账号或密码未填写...');
                return;
            }

            const params = {
                username,
                password
            };

            this.$http.post('/adminapi/login', params)
                .then(res => {
                    console.log(res.data.message);
                    if(res.data.message === '登录成功'){
                        this.$message.success('登录成功');
                        localStorage.setItem('userInfo',JSON.stringify(res.data.data))
                        this.$router.push('/home');
                    }else{
                        this.$message.error('登录失败，账号或密码错误...');
                        this.password=''
                    }
                })
                .catch(error => {
                    console.error(error);
                    this.$message.error('登录失败，出现异常...');
                });
        }
    }
}
</script>

<style lang="less" scoped>
.body {
    width: 100vw;
    height: 100vh;
    position: relative;

    .bg {
        width: 100vw;
        height: 100vh;
        position: absolute;
        z-index: 10;
    }
}

.form {
    position: absolute;
    z-index: 11;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255,255,255,0.5);
    padding: 20px 30px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
        font-size: 2em;
        margin-bottom: 20px;
    }

    .el-input {
        margin-bottom: 10px;
        width: 300px;
    }

    .el-button {
        width: 100px;
    }
}
</style>
