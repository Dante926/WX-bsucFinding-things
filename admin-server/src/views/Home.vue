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
                <el-aside width="200px"><el-menu :default-active="currentPath" class="el-menu-vertical-demo"
                        @select="handleSelect">
                        <el-menu-item index="/findPerson">
                            <i class="el-icon-search"></i>
                            <span slot="title">寻主管理</span>
                        </el-menu-item>
                        <el-menu-item index="/findGoods">
                            <i class="el-icon-search"></i>
                            <span slot="title">寻物管理</span>
                        </el-menu-item>
                        <el-menu-item index="/user">
                            <i class="el-icon-user"></i>
                            <span slot="title">用户管理</span>
                        </el-menu-item>
                        <el-menu-item index="/admin">
                            <i class="el-icon-user-solid"></i>
                            <span slot="title">超管管理</span>
                        </el-menu-item>
                        <el-menu-item index="/advice">
                            <i class="el-icon-edit-outline"></i>
                            <span slot="title">反馈管理</span>
                        </el-menu-item>
                        <el-menu-item index="/banner">
                            <i class="el-icon-picture-outline"></i>
                            <span slot="title">轮播管理</span>
                        </el-menu-item>
                    </el-menu></el-aside>

                <el-main><router-view /></el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            roel: '',
            nickname: '',
            currentPath: '/findPerson'
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
        const { path } = this.$route
        this.currentPath = path
    },
    methods: {
        outlogin() {
            localStorage.removeItem('userInfo')
            this.$router.push('/login')
        },

        async handleSelect(path) {
            console.log(path);
            if (path === '/admin') {
                const params = {
                    username: JSON.parse(localStorage.getItem('userInfo')).username
                }
                const res = await this.$http.post('/adminapi/adminauth', params)
                    .then(result => {
                        console.log(result.data);
                        if (result.data.message === 'Success') {
                            if (path !== this.currentPath) {
                                this.$router.push(path);
                                this.currentPath = path
                            }
                        } else {
                            this.$message.error('权限不足')
                        }
                    })
            } else {
                if (path !== this.currentPath) {
                    this.$router.push(path);
                    this.currentPath = path
                } else {
                    // 重载路由
                    this.$router.go(0)
                }
            }

        },
    }
}
</script>

<style lang="less" scoped>
.el-header {
    background-color: #ffffff;
    color: #333;
    height: 60px;
    // 下边框
    border-bottom: 1px solid #dce3e8;

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

    .el-menu-vertical-demo {
        height: 100%;
    }
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    // text-align: center;
    height: calc(100vh - 60px); // 根据当前页面的容器动态撑满
}
</style>