<template>
    <div class="body">
        <div class="top">
            <h2>管理员管理</h2>

            <div>
                <el-button type="success" @click="dialogVisible = true">添加管理员</el-button>

                <el-input placeholder="请输入用户名" prefix-icon="el-icon-search" v-model="search" @input="toSearch">
                </el-input>
            </div>

        </div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="ID">
            </el-table-column>
            <el-table-column prop="username" label="用户名">
            </el-table-column>
            <el-table-column prop="password" label="密码">
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间">
            </el-table-column>
            <el-table-column prop="role" label="权限">
            </el-table-column>
            <el-table-column prop="nickname" label="昵称">
            </el-table-column>
            <el-table-column prop="edit" label="操作">
                <template slot-scope="scope">
                    <el-popconfirm title="重要数据，确认删除?" @confirm="deleteData(scope.row.id)">
                        <el-button type="danger" slot="reference">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
            :page-sizes="[5, 10, 15, 20]" :page-size="size" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>

        <!-- 新增管理员对话框 -->
        <el-dialog title="添加管理员" :visible.sync="dialogVisible" width="30%">
            <span>用户名</span>
            <!-- 用户名 -->
            <el-input class="margin" placeholder="请输入用户名" v-model="username" clearable>
            </el-input>
            <!-- 密码 -->
            <span>密码</span>
            <el-input class="margin" placeholder="请输入密码" v-model="password" show-password></el-input>

            <!-- 权限 -->
            <span>权限</span>
            <div class="margin"></div>
            <el-radio-group class="margin" v-model="radio">
                <el-radio :label="0">超级管理员</el-radio>
                <el-radio :label="1">管理员</el-radio>
            </el-radio-group>
            <div></div>

            <!-- 昵称 -->
            <span>昵称</span>
            <el-input class="margin" type="text" placeholder="请输入昵称" v-model="nickname" maxlength="10" show-word-limit>
            </el-input>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addadmin()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { formatTime } from '../components/index'
import { debounce } from 'lodash';
export default {
    data() {
        return {
            tableData: [],
            page: 1,
            size: 5,
            total: 0,
            search: '',
            dialogVisible: false,
            username: '',
            password: '',
            nickname: '',
            radio: 0
        }
    },
    created() {
        this.getTabData();
    },
    methods: {
        async addadmin() {
            const params = {
                username: this.username,
                password: this.password,
                nickname: this.nickname,
                role: this.radio
            }
            console.log(params);

            if (!params.username || !params.password || !params.nickname) {
                this.$message({
                    type: 'error',
                    message: '必填项未填写...'
                })
                return;
            }
            const result = await this.$http.post('/adminapi/addadmin', params)
            if (result.data.message == 'Success') {
                // 提示删除成功
                this.$message({
                    message: '添加成功',
                    type: 'success'
                })
                this.dialogVisible = false;
                this.getTabData();
            } else if (result.data.message == '用户名已存在') {
                this.$message({
                    message: '用户名已存在,请重试...',
                    type: 'error'
                })
            } else {
                this.$message({
                    message: '系统错误,添加失败...',
                    type: 'error'
                })
            }
        },
        toSearch() {
            // 防抖处理 优化性能
            const _toSearch = debounce(() => this.getTabData(this.search), 1000);
            _toSearch();
        },
        async getTabData(search) {
            if (search) {
                const params = {
                    page: this.page,
                    size: this.size,
                    search: this.search
                }
                const result = await this.$http.post('/adminapi/getadmin', params)
                const { data, total } = result.data
                // 将data里的字符串数组转换成真正的数组
                this.tableData = data.map(item => {
                    return {
                        ...item,
                        create_time: formatTime(item.create_time),
                        role: item.role === 0 ? '超级管理员' : '管理员'
                    }
                })
                this.total = total
            } else {
                const params = {
                    page: this.page,
                    size: this.size
                }
                const result = await this.$http.post('/adminapi/getadmin', params)
                const { data, total } = result.data
                this.tableData = data.map(item => {
                    return {
                        ...item,
                        create_time: formatTime(item.create_time),
                        role: item.role == 0 ? '超级管理员' : '管理员'
                    }
                })
                this.total = total
            }

        },
        async deleteData(id) {
            const params = {
                id,
                role: JSON.parse(localStorage.getItem('userInfo')).role
            };
            console.log(params);
            if (id) {
                const result = await this.$http.post('/adminapi/deleadmin', params)
                if (result.data.message == 'Success') {
                    // 提示删除成功
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getTabData();
                } else if (result.data.message == 'NoPower') {
                    this.$message({
                        message: '没有权限!',
                        type: 'error'
                    });
                    this.getTabData();
                } else {
                    this.$message({
                        message: '删除失败',
                        type: 'error'
                    });
                    this.getTabData();
                }
            } else {
                // 提示数据出错
                this.$message.error('数据出错')
                this.getTabData();
            }

        },
        handleSizeChange(val) {
            if (this.search) {
                this.size = val;
                this.getTabData(this.search);
            } else {
                this.size = val;
                this.getTabData();
            }

        },
        handleCurrentChange(val) {
            if (this.search) {
                this.page = val;
                this.getTabData(this.search);
            } else {
                this.page = val;
                this.getTabData();
            }
        },

    },
}
</script>

<style lang="less" scoped>
.body {
    padding: 20px;
    background-color: #fff;
    border-radius: 20px;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;


    .top {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;

        .el-input {
            width: 200px;
            margin-left: 10px;
        }

        .el-input__icon {
            height: auto;
        }
    }
}

.margin {
    margin-bottom: 15px;
}
</style>
