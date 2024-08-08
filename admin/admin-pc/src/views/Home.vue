<template>
    <div>
        <el-container>
            <el-header>
                <h2>失物招领后台管理系统</h2>
                <div class="info">
                    <p>{{ role }} {{ nickname }} 您好~</p>
                    <el-button @click="outlogin">退出</el-button>
                </div>
            </el-header>

            <el-container>
                <el-aside width="200px"><el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen"
                        @close="handleClose">
                        <el-menu-item index="2">
                            <i class="el-icon-menu"></i>
                            <span slot="title">寻物管理</span>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <i class="el-icon-menu"></i>
                            <span slot="title">寻主管理</span>
                        </el-menu-item>
                        <el-menu-item index="3" >
                            <i class="el-icon-document"></i>
                            <span slot="title">用户管理</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <i class="el-icon-setting"></i>
                            <span slot="title">管理员管理</span>
                        </el-menu-item>
                    </el-menu></el-aside>
                <el-main>Main</el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            roel: '',
            nickname: ''
        }
    },
    created() {
        const userInfo = localStorage.getItem('userInfo')
        if (userInfo) {
            const { role, nickname } = JSON.parse(userInfo)
            this.role = role === 0 ? '超级管理员' : '管理员'
            this.nickname = nickname
        } else {
            this.$router.push('/login')
        }
    },
    methods: {
        outlogin() {
            localStorage.removeItem('userInfo')
            this.$router.push('/login')
        },
    }
}
</script>

<style lang="less" scoped>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    height: 60px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    .info {
        display: flex;
        align-items: center;

        .el-button {
            margin-left: 20px;
        }

    }
}

.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    height: calc(100vh - 60px); // 根据当前页面的容器动态撑满

    .el-menu-vertical-demo{
        height: 100%;
    }
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height: calc(100vh - 60px); // 根据当前页面的容器动态撑满
}
</style>