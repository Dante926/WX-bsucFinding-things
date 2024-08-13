<template>
    <div class="body">
        <h2>寻主管理</h2>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="openid" label="OpenID">
            </el-table-column>
            <el-table-column prop="classify1" label="一级分类">
            </el-table-column>
            <el-table-column prop="classify2" label="二级分类">
            </el-table-column>
            <el-table-column prop="name" label="名字">
            </el-table-column>
            <el-table-column prop="date" label="丢失时间">
            </el-table-column>
            <el-table-column prop="region" label="丢失地点">
            </el-table-column>
            <el-table-column prop="call" label="联系方式">
            </el-table-column>
            <el-table-column prop="desc" label="描述">
            </el-table-column>
            <el-table-column label="相关图片" width="120">
                <template slot-scope="scope">
                    <el-image style="width: 100px; height: 100px" :src="scope.row.imgList[0]"
                        :preview-src-list="scope.row.imgList">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column prop="time" label="发布时间">
            </el-table-column>
            <el-table-column prop="edit" label="操作">
                <template slot-scope="scope">
                    <!-- 删除操作 -->
                    <el-popconfirm title="重要数据，确认删除?" @confirm="deleteData(scope.row._id)">
                        <el-button style="margin-right: 10px;" type="danger" slot="reference">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
            :page-sizes="[5, 10, 15, 20]" :page-size="size" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
import { formatTime } from '../components/index'
export default {
    data() {
        return {
            tableData: [],
            page: 1,
            size: 5,
            total: 0,
            ispublish: true
        }
    },
    created() {
        this.getTabData();
    },
    methods: {
        async getTabData() {
            const params = {
                type: 0,
                page: this.page,
                size: this.size
            }
            const result = await this.$http.post('/adminapi/getdata', params)
            // console.log(result.data);
            const { data, total } = result.data
            // 将data里的字符串数组转换成真正的数组
            const modifiedData = data.map(item => ({
                ...item,
                imgList: item.imgList.replace(/^\["(.*)"\]$/, '$1').split('","').map(url => url.trim()) // 使用正则表达式去除外部的引号
            }));
            this.tableData = modifiedData.map(item => {
                return {
                    ...item,
                    time: formatTime(item.time)
                }
            })
            this.total = total
        },
        async deleteData(_id) {
            const params = { _id };
            console.log(params);
            if (_id) {
                const result = await this.$http.post('/adminapi/deledata', params)
                console.log(result);
                if (result.data.message == 'Success') {
                    // 提示删除成功
                    this.$message({
                        message: '删除成功',
                        type: 'success'
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
            this.size = val;
            this.getTabData();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getTabData();
        },
        // 时间戳转换为日期格式
        formatTime(time) {
            return formatDate(time, 'yyyy-MM-dd hh:mm:ss')
        }
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

    h2 {
        margin-bottom: 20px;
    }
}
</style>