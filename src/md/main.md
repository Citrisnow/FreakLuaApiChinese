# Freak Engine 的 Lua 脚本参考。

> 面向脚本的所有功能完整指南——精灵 补间动画 回调 跨脚本消息传递以及 LuaFreak 运行时全局变量 日常参考必备 为长时间阅读优化.lua

> 私人 API——尚未公开 Freak Engine 正在封闭开发中 位于 [github.com/mrchaoss1/FREAK-ENGINE](https://github.com/mrchaoss1/FREAK-ENGINE) 的代码库访问受限 这些文档涵盖的是一个可能在公开发布前发生变化的不断发展的内容

## 简介

### 什么是 Freak Engine？

Freak Engine 是一个 Friday Night Funkin' 风格的节奏游戏引擎,内置由 `LuaFreak` 驱动的 Lua 脚本层.脚本可以创建精灵和补间它们的属性和相互发送事件,并在歌曲播放时挂钩到指挥器(Conductor).

所有脚本都位于 `scripts/` 下,并在引擎编译时转译为 Haxe——运行时不会解释任何内容.每个 `.lua` 文件都会变成一个静态 Haxe 类,引擎会自动发现并注册它,因此你永远不需要手动加载或 `require` 脚本.

Freak Engine 由 mr_chaoss 创建和维护.
Freak Engine Chinese API 由 CitriSnow 维护.

## 设计要素

### 设计要素
> 快速迭代
> 运行时重新加载脚本——无需重新编译 无需重启引擎

> 跨脚本传递
> call() 和 call_on_scripts() 使脚本无需紧耦合即可组合

> 熟悉的节拍
> onBeatHit onStepHit onSectionHit 会根据节奏触发——而不是按帧触发

> 基于标签的寻址
> 每个精灵和补间都是一个命名字符串 没有垃圾回收压力 也不需要管理句柄

---

## 新内容

Lua API 的发行说明。每个条目都链接到相关的参考页面。

### 更新日志

**v0.8.0**（2026年10月23日）—— 等待玩家的加载画面、新的谱面事件、编辑器中的设置与分组，以及加载修复。
- [新增] 会等待玩家的自定义加载画面
- [新增] 新的谱面事件
- [更新] 聚焦摄像机偏移
- [更新] 每个编辑器中的设置
- [新增] 舞台编辑器中的分组
- [更新] 事件编辑器自由视图
- [修复] 加载卡在70%
- [修复] 转场前的游戏画面闪烁
- [修复] 多返回值
- [修复] 事件编辑器中的脚本回调

**v0.7.9**（2026年10月22日）—— 更快的加载：画面会保留最近使用的图像，歌曲只加载用到的内容，另有文本、环形条和Lua修复。
- [更新] 更快的重启和画面切换
- [更新] 更短的加载画面
- [新增] 频率波形
- [新增] onPreload
- [新增] 预加载函数
- [更新] 更智能的预加载
- [更新] sprite:preload 文件夹
- [修复] Psych谱面导出
- [修复] 字母文本边框
- [修复] 细环形条
- [修复] Lua表键

**v0.7.8**（2026年10月16日）—— 在线歌曲同步、按难度区分音频、多摄像机同时使用着色器，以及小幅修复。
- [新增] 在线歌曲同步
- [新增] 按难度区分音频
- [新增] 同时使用多个标签
- [更新] 带透视的跑马灯
- [修复] 小幅修复

**v0.7.7**（2026年10月14日）—— 视频、波形、舞台文件、新的生命条、新着色器和内部渲染分辨率设置，以及小幅修复。
- [新增] 视频
- [新增] 波形
- [新增] 舞台文件
- [新增] 生命条
- [新增] 新着色器
- [新增] 内部渲染分辨率
- [修复] 小幅修复

**v0.7.6**（2026年10月9日）—— 更轻松的在线游玩、平滑的速度变化、可在电脑上测试的触控操作，以及一轮运行时脚本修复。
- [新增] 房间与玩家
- [新增] 平滑速度变化
- [新增] 在电脑上触控
- [更新] 紧凑颜色选择器
- [更新] 更小的补充
- [修复] 修复
- [新增] 堆叠暗角
- [新增] 冷却
- [修复] 修复
- [指南] 学习Lua
- [更新] 每条目一个函数

**v0.7.5**（2026年10月8日）—— Figma风格文本、GPU描边、统一颜色格式、更省性能的摄像机效果和更清晰的脚本错误。
- [新增] Figma风格文本布局
- [新增] 文本样式
- [新增] GPU描边
- [新增] 统一颜色格式
- [新增] 摄像机效果
- [新增] 居中和圆角裁剪
- [更新] 脚本工作流
- [更新] 性能
- [修复] 修复

**v0.7.4**（2026年10月3日）—— 在构建文件夹中制作模组、单遍胶片效果、没有女友的歌曲。
- [新增] 硬件混合模式
- [新增] 带缓动的摄像机移动
- [新增] 无需编译即可修改构建
- [新增] 音符水花和长条覆盖
- [新增] 单遍胶片效果
- [新增] 没有女友的歌曲
- [新增] 在谱面编辑器中导入事件
- [修复] 音符类型的长条覆盖
- [修复] 修复
- [新增] 着色器可获知精灵帧
- [修复] 更柔和的 shader:dread 和动画精灵上的热浪效果
- [修复] 事件编辑器跳转不再重放旧事件
- [修复] 热重载改为选择性启用
- [修复] 自动模式下的 camera:getFocus
- [修复] 第一首歌结束后的下一首歌

**v0.7.3**（2026年10月1日）—— 冻结任意单个对象，并将屏幕分割为同一场景的多个视图。
- [新增] 冻结任何东西
- [新增] 分屏视图
- [新增] 复制摄像机属性
- [新增] 动画和鼠标回调
- [新增] api 命名空间
- [新增] 路径与约定指南
- [新增] 摄像机缩放与适配

**v0.7.2**（2026年9月30日）—— 脚本保存时重新加载且不再关闭游戏、按歌曲设置的节拍倒计时、主题预览，以及修复。
- [新增] 更安全的脚本
- [新增] 每首歌的倒计时
- [新增] 每个动画的偏移
- [新增] 主题与 gui
- [新增] 任意窗口上的 UI
- [修复] 修复

**v0.7.1**（2026年9月26日）—— 谱面编辑器和自定义谱面事件。
- [新增] 谱面编辑器和谱面事件

**v0.7.0**（2026年9月25日）—— gui 命名空间：Freak Engine 风格的工具窗口，绘制在游戏之上并在场景切换后保留。包含标签页、下拉菜单、滑块、步进器、文本输入框、复选框、进度条和滚动条、文件树、颜色选择器、图表、缓动曲线编辑器，以及可显示和编辑歌曲事件的关键帧时间轴。
- [新增] gui —— 工具窗口
- [新增] 控件
- [新增] gui:curve —— 缓动编辑器
- [新增] gui:timeline —— 像视频编辑器一样的关键帧
- [新增] 谱面工具：音符、撤销、保存
- [新增] gui:chartGrid 和 gui:grid
- [新增] 菜单栏和 Funkin 风格谱面编辑器

**v0.6.9**（2026年9月24日）—— 修复与打磨：更多窗口控制、笔记本电脑上的独立GPU、按需mipmap、图像和音频的后台预加载、更省性能的文本更新、shader:focus 的部分和图层聚焦、更安全的歌曲加载和原生崩溃报告。
- [新增] 更多窗口控制
- [新增] window:preferDedicatedGpu
- [新增] 按需mipmap，质量更好
- [新增] 后台预加载和更轻量的加载
- [新增] text:cache —— 对循环切换少量值的文本不再重新渲染
- [新增] text:borderGradientColors —— 原地重新着色渐变边框
- [新增] shader:focus —— 部分聚焦和整层聚焦
- [更新] 缺失的歌曲回到它们来的地方
- [修复] 原生崩溃留下报告
- [更新] 更快的文本描边

**v0.6.8**（2026年9月23日）—— 字母文本现在作为一个合成文本绘制：边框和渐变读起来像一个词，半透明文本没有重叠接缝，缩放时字母间距正确，并且在GPU上运行。新的 text:marquee 取代 autoMarquee 和整个 text:scroll 系列，text:wave 接受缓动，text:set 不再崩溃或泄漏标记。音符类型现在可以具有敌对性（avoid / hurtHealth / hurtMiss，配合 onNoteHurt 和 onNoteAvoid），holdLayer 将长条置于接收器之后。shader:focus 现在用真正的 BlurFilter 模糊整个摄像机，并在孪生摄像机上保持聚焦精灵清晰。颜色效果每个精灵或摄像机共享一个颜色矩阵，因此它们可以叠加且只消耗一遍。 
- [更新] text:letters 作为单个合成文本绘制
- [新增] text:marquee —— 为放不下的文本滚动
- [更新] 移除：text:autoMarquee 和 text:scroll 系列
- [新增] 敌对音符类型 —— 音符皮肤配置中的 "avoid"
- [更新] shader:focus —— 真正的摄像机模糊，不会意外留下清晰部分
- [更新] 颜色效果在一个矩阵中叠加 —— 一遍，没有着色器冲突
- [新增] text:wave 接受缓动
- [修复] 字母组上的 text:set
- [修复] 缩放字母组保持间距
- [修复] 平滑字母动画
- [修复] borderGradient 不再与 text:border 冲突
- [修复] text:* 中的颜色名称和8位十六进制
- [更新] debug:scroll 勾勒跑马灯窗口
- [新增] holdLayer —— 长条位于接收器之后
- [更新] strum:camera 在歌曲重启时重置

**v0.6.7**（2026年9月16日）—— 基于形状的精灵遮罩、四个新的自动驱动着色器效果（运动模糊、聚焦/景深模糊、泛光——可选与 shader:light 融合——以及手机优化的光线），以及直接的 sprite:size 设置器。
- [新增] sprite:mask / sprite:unmask —— 用一个精灵的轮廓塑造另一个精灵
- [新增] shader:motionBlur —— 自动跟随精灵自身速度
- [新增] shader:focus —— 景深风格背景模糊
- [新增] shader:bloom —— 可选与 shader:light 融合
- [新增] shader:lightRays —— 廉价、适合手机的神光，带色边
- [新增] shader:camFilterCount —— 检查摄像机上实际堆叠了什么
- [新增] util:flicker / sprite:flicker —— 有机的蜡烛/霓虹灯亮度摆动
- [新增] util:fixed —— 将数字格式化为文本，无浮点噪声
- [新增] noteskin:list / noteskin:current / noteskin:save / noteskin:loadSaved —— 持久的玩家音符皮肤选择
- [新增] group:* 批量操作 —— 一次移动、测量和设置整个组的属性
- [新增] sprite:size —— 直接设置精灵显示的像素大小
- [更新] text:borderGradient 可堆叠、接受多个颜色停靠点，且不再需要先调用 text:border
- [修复] text:addBorder（以及边框层API的其余部分）在 text:letters 标签上失败
- [修复] text:letters / text:gradient 中缺失空格
- [修复] text:letterSpacing 在字母组上无效

**v0.6.6**（2026年9月12日）—— 字母组的自动换行和按跨度效果、text:reveal 的 onComplete、精灵实时重载、文本大小写转换、声音/音乐/歌曲轨道的相对音量组、state:restart 修复和生命条可见性修复。
- [新增] text:wrap —— text:letters 的自动换行
- [新增] text:markEffect / text:clearMarkEffects —— 仅动画标记的跨度
- [新增] text:reveal 获得 onComplete 回调
- [新增] sprite:reload —— 从磁盘实时替换精灵图像
- [新增] text:upper / text:lower —— 原地更改文本大小写
- [修复] state:restart 不再破坏 PlayState 或 LuaState
- [新增] sound:group / sound:groupVolume —— SFX 的相对音量组
- [新增] music:group / music:groupVolume —— 音乐轨道的相同相对音量组
- [修复] song:volume('vocals'/'all', v) 现在相对缩放而不是压平
- [修复] 非 Funkin' 风格下生命条不再显示

**v0.6.5**（2026年9月10日）—— 富文本标记和逐字母显示——text:mark 为换行块内的单词着色或设置样式，text:reveal 用逐字母偏移错开显示 text:letters 组，filter:blur 模糊精灵或整个摄像机。camera:focus 在运行时切换游戏摄像机跟随哪个角色，一个小型生命系统落地（health/healthMax、onGameOver），音符皮肤可以用新的 noteskin:* 命名空间实时切换或混合。另有文档回填（tw:num、声音滤镜命名空间）和一批修复：摄像机再次真正透明，暂停不再让按住的长条卡在中间姿势，滚动方向翻转后生命条/分数显示不再与接收器重叠。
- [新增] text:mark / text:clearMarks —— 在大文本块内为单词着色
- [新增] text:reveal / text:revealReset —— 逐字母错开显示
- [新增] sprite:parallax —— 使精灵向鼠标漂移
- [新增] tw:num 现已记录文档
- [新增] 声音滤镜命名空间现已记录文档
- [新增] filter:blur —— 模糊精灵或整个摄像机
- [新增] camera:focus / camera:getFocus —— 切换游戏摄像机跟随谁
- [修复] 'game'/'hud' 上的 camera:zoom 不再自行缓动回正常
- [修复] 摄像机默认再次真正透明
- [新增] noteskin:* —— 实时切换或混合音符皮肤
- [新增] 一个小型生命系统（health / healthMax / onGameOver）
- [新增] song:pitch / song:getPitch —— 真正的慢动作
- [修复] 漏掉的音符平滑淡出而不是突然切断
- [新增] 可脚本化的游戏结束画面，两个示例脚本
- [新增] pauseToggleKey —— 内置暂停+冻结热键
- [修复] blend:set 现在在 text:letters 组上有效
- [新增] 角色摄像机聚焦调试覆盖层
- [修复] 暂停不再让按住的长条卡在中间姿势
- [修复] 下滚不再与生命条和分数显示重叠
- [修复] Psych Engine 角色文件夹现在正确加载

**v0.6.4**（2026年9月5日）—— 五个新的 sprite:* 形状图元包——圆形、椭圆、三角形、圆角矩形和任意多边形——每个都可在一个共享参数下切换填充和环/轮廓。
- [新增] sprite:circle / ellipse / triangle / roundRect / polygon —— 填充形状和环

**v0.6.3**（2026年8月29日）—— song:seek(ms) / seekBy(deltaMs) 像 Funkin 自己的调试跳转一样擦洗歌曲——音频、音符和事件一起跳转。另对 game:set/get 进行真正的性能/安全优化。
- [新增] song:seek / seekBy —— 像 Funkin 的调试跳转一样擦洗歌曲
- [修复] game:set/get 性能和安全优化
- [新增] require(path) —— 通过运行时表达式加载脚本
- [修复] 加载画面可能在它所覆盖的场景准备好之前消失
- [修复] 窗口调整大小后摄像机着色器/滤镜效果可能偏离位置
- [新增] shader:blur —— 摄像机上的真正GPU模糊，外加质量控制
- [新增] shader:posterize —— 将颜色深度压平为色带
- [修复] 漏掉的音符或进行中的击打可能延续到下一首歌
- [新增] order:* —— 按标签查找和设置精灵或内置对象的绘制顺序
- [新增] strum:middleScroll(side, on) —— 保持居中的轨道

**v0.6.2**（2026年8月29日）—— 两种新的精灵制作方式：sprite:gradient 用颜色混合填充，sprite:addSkewed 制作可被 sprite:skew 剪切变形的精灵。
- [新增] sprite:gradient(tag, x, y, w, h, colors)
- [新增] sprite:addSkewed + sprite:skew(tag, x, y)

**v0.6.1**（2026年8月29日）—— 一个 debug: 命名空间取代所有分散的调试开关，滚动文本获得淡出边缘和一键跑马灯，并落地五个稳定性修复——包括保存冲突bug和主音量舍入故障。
- [新增] 一个 debug: 命名空间处理一切
- [新增] 滚动文本：淡出边缘、一键跑马灯、更智能的裁剪跟踪
- [修复] 五个稳定性修复
- [新增] input:block(enabled) —— 一个开关，所有输入查询静默

**v0.6.0**（2026年8月26日）—— 滚动文本获得真正的钟摆模式并去掉环绕吸附，摄像机可在状态切换后存活或单独选择宽屏，全屏可在真实和窗口化之间选择，加载和保存不再挂起，命名光标类型使悬停切换免费，命中框调试终于适用于文本和滚动条，网络流量可从检查器实时查看，按键绑定默认值不再覆盖已加载的存档，两个真正的冻结（保存名冲突、禁用 Discord 状态）已消除。
- [新增] 滚动文本：弹跳模式，不再有环绕吸附
- [新增] 摄像机：在状态切换后存活，单独选择宽屏
- [更新] 两种全屏
- [新增] 实时调试网络流量和服务器日志
- [新增] 命名光标类型
- [新增] keybind:setDefault、window:frameRate、text:resolution

**v0.5.9**（2026年8月20日）—— 条和滚动条现在可以使用图像而非纯色，滚动条更容易驱动（且可在手机上甩动滚动），网络状态存储堵住了一个真实安全漏洞，发布了实时对象检查器，着色器获得了普通模糊。
- [新增] 图像条和滚动条
- [新增] 滚动条更易用
- [新增] 手机上的甩动滚动
- [修复] 复制状态不再可被伪造
- [新增] 实时对象检查器
- [新增] 普通模糊着色器

**v0.5.8**（2026年8月11日）—— 舞台更新。舞台现在是一组命名的精灵，你可以一次调用显示、移动、分层或丢弃，带可选美术和可选脚本，引擎会随歌曲一起加载。song:play 也接受列表，因此下一首歌及其舞台在第一首播放时预取。
- [新增] 舞台（stage:*）
- [新增] 响应音符键（onKeyPress）
- [更新] 一次预加载多首歌

**v0.5.7**（2026年8月9日）—— Discord更新。Rich Presence 从头重建：歌曲现在显示真正的音乐播放器卡片，带专辑封面和持续在 Discord 端运行的进度条，卡片可以逐字段构建而非通过一个固定调用，玩家离开后状态自动变为空闲。需要更新 hxdiscord_rpc haxelib。
- [更新] 构建前更新 hxdiscord_rpc
- [新增] 音乐播放器状态，逐字段构建
- [新增] 空闲感知和账户信息
- [修复] 状态消失、忽略 clientId 和与脚本冲突
- [修复] 窗口失焦时歌曲继续播放

**v0.5.6**（2026年8月7日）—— 按键绑定与混音更新。脚本现在可以将命名动作绑定到按键和手柄按钮，而非硬编码，玩家可以在游戏内重新绑定这些动作。歌曲的伴奏和两个声乐轨道也可以独立静音、调节音量和淡入淡出，带标签的 SFX 和音乐也支持静音。
- [新增] 静音、调节和淡出歌曲的轨道
- [新增] SFX 和音乐静音，以及组淡入淡出
- [新增] 可重新绑定的按键绑定（keybind:*）
- [新增] 行为正常的重新绑定提示（keybind:listen）
- [新增] 设置画面辅助函数
- [修复] 摄像机滤镜着色器在缩放时损坏
- [修复] 唱歌动画在长条音符之前结束

**v0.5.5**（2026年7月30日）—— 转场与重启更新。状态变化获得真正的转场系统——选择预设或绘制自己的，引擎处理出→切换→入的序列，你不再需要用计时器猜测时机。加载画面现在可以脚本化，同时引擎在后面继续加载和预热着色器。song:pause 冻结整个游戏世界而非仅音频，song:restart 从零重播谱面，一批窗口调整大小时着色器损坏的修复落地。
- [新增] 状态间的转场（transition:*）
- [新增] 可脚本化的加载画面
- [新增] 从零重启歌曲（song:restart）
- [更新] song:pause 冻结整个游戏世界
- [新增] 歌曲的频谱（song:spectrum）
- [修复] 窗口调整大小时着色器损坏

**v0.5.4**（2026年7月24日）—— 摄像机顺序与歌曲清理更新。摄像机现在可以在运行时重新排序绘制栈——将一个送到前面或后面，上移或下移，或设置精确索引——渲染列表和屏幕分层一起移动，因此变化真正可见。另有 Discord Rich Presence，以及一个修复：离开游戏回到菜单后歌曲伴奏不再继续播放。
- [新增] 用 .lang 文件本地化（lang:*）
- [更新] 读取目标的混合模式（overlay、hardlight……）
- [新增] Discord Rich Presence（discord:*）
- [新增] 在绘制栈中重新排序摄像机
- [修复] 离开游戏时歌曲伴奏停止

**v0.5.3**（2026年7月21日）—— 丝带与着色器补间更新。着色器 uniform 现在可补间——用 shader:tween 通过缓动随时间淡入或淡出任何效果，专用 shader:vignetteFade 缓动暗角开启或完全关闭（到达零时自行移除）。丝带拖尾现在跟踪它们跟随的精灵的 alpha，因此淡出精灵会淡出其拖尾；可选择让丝带拥有其精灵，这样移除丝带也会移除精灵。本版本获得函数的侧边栏分类显示 NEW 徽章。
- [新增] 补间任何着色器 uniform（shader:tween）
- [新增] 暗角淡入/淡出（shader:vignetteFade）
- [更新] 丝带跟随精灵 alpha + 拥有其精灵
- [新增] 更新侧边栏分类上的 NEW 徽章

**v0.5.2**（2026年7月12日）—— 着色器与文本更新。一包十二个廉价、单遍后处理着色器——反相、棕褐、双色调、暗角、扫描线、像素化、色差、波浪、颗粒、故障、VHS、CRT——全部在弱GPU上安全，可用于任何精灵或摄像机。文本获得堆叠边框层：添加任意数量的边框通道（轮廓+阴影+发光），按索引调整每个，并将着色器放到单个边框层上。另有 conductor 命名空间，使 onBeatHit 可在任何状态以你选择的 BPM 工作。
- [新增] 后处理着色器包（12个，弱GPU安全）
- [新增] 堆叠文本边框层
- [新增] 文本边框层上的着色器
- [新增] 任何状态下的节拍时钟（conductor:*）

**v0.5.1**（2026年7月12日）—— 接收线作为变量。每个接收线现在都是可寻址的游戏对象——playerStrums / opponentStrums——因此你通过字段设置 .visible、.alpha、.noteScale、.receptorScale 和位置，而非旧的扁平 playerNotesVisible 风格名称。音符和接收器缩放现在每侧独立，轨道可以有自己的上滚和下滚位置，所有这些都从音符皮肤配置中的 strums 块播种。另有 strum:fade 和更丰富的生成音符成员访问。
- [新增] playerStrums / opponentStrums —— 作为游戏变量的接收线
- [新增] 补间接收线和接收器
- [新增] 每侧独立的音符和接收器缩放
- [新增] 每方向的上滚/下滚位置
- [新增] strums 配置块 + strum:fade

**v0.5.0**（2026年7月11日）—— 接收器与音符更新。新的 strum 命名空间使整个音符系统可脚本化：移动轨道或单个接收器（音符和长条尾自动跟随），按轨道淡出/隐藏音符，并设置接收器箭头本身的样式——alpha、角度、缩放、色调和强制动画。自定义长条音符获得修复和新的 holdOffset / holdScaleX 配置，使松散的长条美术干净地连接到音符头。
- [新增] strum:* —— 移动音符和接收器
- [新增] 每轨道音符 alpha 和可见性
- [新增] 接收器视觉：alpha / 角度 / 缩放 / 色调 / 播放
- [更新] 自定义长条音符：holdOffset、尺寸和仅主体

**v0.4.9**（2026年7月4日）—— 滚动条和摄像机保持控制。新的 scrollbar 命名空间为列表和菜单添加轨道+可拖动滑块。摄像机获得 lock（按轴固定滚动位置，效果继续运行）和 freeze（暂停整个摄像机，包括效果）。
- [新增] scrollbar:* —— 轨道+可拖动滑块
- [新增] camera:lock 和 camera:freeze

**v0.4.8**（2026年7月4日）—— UI 锚定、菜单和更友好的位置。新的 sprite:anchor / anchorX / anchorY / anchorOff 将精灵边缘锚定到摄像机视图。组获得选择（group:select / selected / move / hovered / clicked），因此任何精灵组都成为鼠标+键盘菜单，input:mouseOver / mouseClicked 对单个精灵进行光标命中测试。sprite:add / sprite:anim / sprite:clone 现在接受位置为两个数字（x, y）或 {x, y} 表。
- [新增] 通过 game:get / game:set 设置条参数
- [新增] 组选择和鼠标命中测试
- [新增] sprite:anchor —— 边缘锚定的 UI
- [更新] 灵活位置：x, y 或 {x, y}

**v0.4.7**（2026年7月4日）—— 着色器更新。五个从旧 th2l 模组包移植的效果着色器——shader:light（HSBC 颜色调整+方向边缘光）、shader:heat（热浪）、shader:radialBlur、shader:zoomBlur 和 shader:rain——全部在精灵和摄像机上工作，作为摄像机滤镜堆叠，自动画。用 filter:posterize 和 filter:dither 进行复古摄像机调色（灰度已涵盖黑白）。精灵轮廓着色器重建：粗轮廓不再有洞，另有 outlineGradient 带可旋转的双色渐变。文本边框通过 text:borderGradient 获得相同处理——填充保持不动时可移动和旋转。另有：sprite:color 简写，全局抗锯齿开关现在触及网格。
- [新增] 效果着色器：light / heat / radialBlur / zoomBlur / rain
- [新增] filter:posterize + filter:dither
- [更新] 轮廓着色器重建 + outlineGradient
- [新增] text:borderGradient —— 仅在轮廓上的渐变
- [修复] 丝带头部滞后 + 宽屏 UI 摄像机
- [更新] sprite:color + 每精灵抗锯齿

**v0.4.6**（2026年7月4日）—— FX 运动和打磨。颜色分级现在可以动画——filter:tween 和 filter:flash 随时间驱动任何分级属性（淡出到灰色、受伤闪烁）。摄像机获得 camera:tilt / camera:tiltBump 来缓动或节拍撞击（内容）旋转。音符皮肤获得每方向 noteOffsets 和长条的 holdScaleY。修复：color:mul / color:set 现在显示在背景上，filter:* / shader:* 警告而非静默争夺精灵的单个着色器槽。
- [新增] filter:tween / filter:flash —— 动画分级
- [新增] camera:tilt / camera:tiltBump
- [新增] 每方向音符偏移 + holdScaleY
- [更新] 背景上的 color:mul / color:set + 着色器槽警告

**v0.4.5**（2026年7月4日）—— 摄像机与精灵颜色分级、音符类型、每轨道输入门，以及修复的摄像机倾斜。新的 filter:* 命名空间按标签对任何精灵或摄像机分级——亮度、对比度、饱和度、灰度（黑白）和反相——通过一个可堆叠的GPU着色器。音符回调现在报告 noteType（Psych 音符类型通过而非被丢弃）。新的 canPress 主开关加上每轨道 laneCanPress 门。camera:angle 现在倾斜场景而非剪切整个画面，音符皮肤可以加载单个 PNG（无需 XML），color:tint 终于适用于背景。
- [新增] filter:* —— 精灵和摄像机颜色分级
- [更新] 命中/未命中回调中的 noteType
- [新增] canPress —— 启用/禁用音符输入
- [更新] color:tint 适用于背景
- [更新] camera:angle 旋转场景，而非画面
- [新增] 来自单个 PNG 的音符皮肤 + 角度 + 自定义音符类型

**v0.4.4**（2026年7月2日）—— 脚本驱动的游戏玩法。song:play 现在将整个脚本带入 PlayState——其摄像机、精灵和 HUD 在歌曲开始后继续运行——PlayState 广播 onNoteHit / onNoteMiss / onSongStart / onSongEnd，加上 spawnedNotes / unspawnNotes / allNotes 集合按 [strum][note] 索引。新的来自 Lua 的歌曲传输（time / setTime / length / progress / playing），game:set('paused') 控制冻结歌曲和音符而脚本继续更新，以及 judgementVisible HUD 开关。sprite:ribbon 修复：真实颜色、跨滚动和缩放保持附着、目标精灵移除时不再崩溃。
- [新增] mesh:* —— 可变形网格
- [新增] 脚本驱动的 PlayState + 游戏玩法回调
- [新增] 歌曲位置/跳转 + 暂停 + HUD 开关
- [更新] sprite:ribbon —— 颜色和附着修复

**v0.4.3**（2026年7月1日）—— 谱面事件到达 Lua 并变得可编程：onEvent 回调加上带内置事件（FocusCamera、Camera Zoom、Play Animation、Hey!）的 events 命名空间。song:play 获得 funkinStyle 标志后的 Funkin' 呈现模式和子歌曲变体（按标签的 erect/pico 伴奏），歌曲现在位于 assets/charts/，sprite:clone 复制动画。新 bar:circular 径向条、shader:perspectiveScroll 用于摄像机滚动3D深度，以及 input:keyJustReleased 和长条音符唱歌的修复。
- [新增] events:* —— 可编程谱面事件
- [新增] 子歌曲 —— 伴奏/声乐变体
- [新增] bar:circular —— 径向条
- [新增] shader:perspectiveScroll —— 摄像机驱动的3D
- [新增] onEvent —— 谱面事件回调
- [新增] song:play 模式 + assets/charts
- [更新] sprite:clone 复制动画
- [更新] 修复：keyJustReleased 和长条音符唱歌

**v0.4.2**（2026年6月26日）—— 移动支持。新的 touch 命名空间添加多点触控输入、屏幕虚拟按钮（带 D-pad 滑动模式）和虚拟模拟摇杆——全部可用自定义美术换肤。附带 Android 构建目标和生成签名 APK 的 GitHub Actions 工作流。
- [新增] touch:* —— 移动输入和虚拟按钮
- [新增] touch:joystick —— 虚拟模拟摇杆

**v0.4.1**（2026年6月20日）—— 分屏和本地多人。camera:split 一次调用设置行/列/四宫格视口，每个跟随自己的玩家。net:setState / net:getState 添加主机权威复制状态——主机拥有一个键/值存储，自动同步到每个客户端（以及后来加入的任何人），值变化时触发 onStateChange。sound:spatial 在世界中定位声音并每帧围绕监听者精灵衰减/平移。path:follow 沿命名路点行走精灵，可选自动旋转面向行进方向。新的 ghost 命名空间记录精灵运动并将其重放到另一个精灵上作为半透明计时赛幽灵，可保存/加载到磁盘。
- [新增] path:follow —— 路点路径
- [新增] ghost:* —— 记录和重放（计时赛幽灵）
- [更新] game:get —— 记录物理和运动字段
- [新增] camera:split —— 一次调用分屏
- [新增] net:setState / net:getState —— 复制状态
- [新增] sound:spatial —— 位置音频

**v0.4.0**（2026年6月16日）—— sprite:ribbon —— 精灵附着的丝带拖尾（无世界矩形，因此无巨大缓冲区），sprite:trailOff 现在冻结拖尾而非删除。net:* 多人补充——自动 ping（net:ping / net:pingOf）、客户端列表（net:clients）和玩家名称（net:setName / net:nameOf）。group:sort —— 设置后不管的 Y 排序用于俯视深度（加上 sortOnce / sortOff）。shader:perspective 获得过扫描参数，因此倾斜的摄像机显示真实屏外场景而非拉伸边缘像素。摄像机正确的鼠标拾取：input:mouseX / mouseY / mouse 接受可选摄像机标签，sprite:overlap 在精灵自己的摄像机中测试光标，其第二参数接受摄像机。目标。新 camera:stopFX 取消抖动/闪光/淡出。
- [新增] sprite:ribbon —— 丝带拖尾，附着到精灵
- [新增] net:* —— ping、客户端列表和玩家名称
- [新增] group:sort —— 自动 Y 排序
- [更新] shader:perspective —— 过扫描显示真实场景
- [更新] 摄像机正确的鼠标拾取
- [新增] camera:stopFX —— 取消摄像机效果

**v0.3.8**（2026年6月7日）—— shader:* —— 新的着色器命名空间，按标签应用于精灵和背景，以 shader:perspective 为首（透视/投影扭曲，以正确透视缩短在3D中倾斜对象，每帧动画廉价）加上 shader:clear / shader:has。另有 game:get/set 上的友好文本字段：textWidth、align、borderStyle、borderColor（字符串/枚举和十六进制转换已为你处理）。
- [新增] shader:* —— 透视扭曲，按标签
- [新增] game:get / game:set 上的文本字段

**v0.3.7**（2026年6月6日）—— 数据命名空间——json:*（编码/解码加上基于路径的 json:load / json:save），save:* 现在由 FlxSave 支持（bind/set/get/has/flush/erase/clear）用于持久键值存储，以及 file:* 通过标记句柄在任意路径读写文本文件。另有 game:get 类型标签，使 sound. / music. / tween. / camera. 注册表可按标签访问。
- [新增] json:*、save:* 和 file:* —— JSON、存档和文件
- [新增] game:get 类型标签（sound. / music. / tween. / camera.）

**v0.3.6**（2026年6月3日）—— 补间精灵颜色（tw:color，加上 tw:any 中的颜色键和每通道偏移）、sprite:trail / trailArea 运动拖尾、camera:screenOffset 和 ui/world 摄像机层、sprite:clone、text:input 字段和自定义鼠标光标。
- [新增] 补间精灵颜色
- [新增] sprite:trail / sprite:trailOff
- [新增] sprite:trailArea —— 涂抹/丝带拖尾
- [新增] camera:screenOffset
- [新增] camera:add 层（ui / world）
- [新增] sprite:clone
- [新增] text:input —— 可输入文本字段
- [新增] 自定义鼠标光标

**v0.3.5**（2026年6月2日）—— net:* 托管——脚本现在可以用 net:host 托管自己的中继服务器，加上条件检查（net:portAvailable、net:hostExists）实现干净的主机或加入流程，主机端消息（net:broadcast、net:sendTo），以及 onClientJoin / onClientLeave / onHostMessage 回调。
- [新增] net:* 托管和服务器

**v0.3.4**（2026年5月31日）—— particle:* API —— 基于标签的、完全可自定义的 FlxEmitter 粒子系统，用于爆炸、火焰、雪、火花和五彩纸屑，具有爆发/流/手动发射和每粒子的速度、缩放、alpha、颜色、旋转、重力、混合范围。
- [新增] particle:* API

**v0.3.3**（2026年5月30日）—— net:* 网络 API —— 从 Lua 打开持久 TCP 连接并实时交换换行分隔的 JSON 消息。构建在线平台游戏（或任何多人模式）的层：广播玩家状态、接收对等端、同步事件。在工作线程上异步，在主线程上分派，跨状态切换持久。
- [新增] net:* API

**v0.3.2**（2026年5月29日）—— window:* API 用于标题/图标/位置/大小/主题，大型 util:* 数学扩展（三角、重映射、平滑、真模），state:restart，以及 bar:direction 的垂直/水平别名。
- [新增] window:* API
- [新增] util:* 数学扩展
- [新增] state:restart
- [更新] bar:direction vertical / horizontal

**v0.3.1**（2026年5月27日）—— bar:* 进度条（带 lerp/像素/手动模式）、手柄输入+震动、sprite:touching 用于墙壁接触门控、sprite:clipRect 和 camera:offScreen。
- [新增] bar:* API
- [新增] input:* 手柄和震动
- [新增] sprite:touching
- [新增] sprite:clipRect / sprite:clearClipRect
- [新增] camera:offScreen

**v0.3.0**（2026年5月23日）—— music:* 和 sound:* 音频 API、音视频可视化读取器（amplitude / level / peak / history）跨 sound / music / song、命中框调试可视化、背景碰撞和背景引用。
- [新增] music:* API
- [新增] sound:* API
- [新增] sprite:hitboxDebug
- [新增] group:hitboxDebug
- [新增] backdrop:hitboxDebug
- [新增] 背景碰撞
- [新增] backdrop:* 参考
- [新增] 音频可视化读取器

**v0.2.9**（2026年5月22日）—— 全局抗锯齿开关和 sprite:line。
- [新增] 全局抗锯齿
- [新增] sprite:line
- [新增] sprite:position
- [新增] camera:aspectCentering

**v0.2.8**（2026年5月21日）—— 新 group:* 命名空间、sprite:remove 和随机全局辅助函数。
- [新增] group:* API
- [新增] sprite:remove
- [新增] 随机全局

**v0.2.7**（2026年5月20日）—— 新摄像机与数学/util API，加上精灵物理、碰撞、轮廓。
- [新增] camera:* API
- [新增] util:* API
- [更新] sprite:*
- [更新] game:*

**v0.2.6**（2026年5月19日）—— 补间和计时器的进度与完成内省。
- [新增] tw:completed
- [新增] timer:completed
- [更新] tw:progress、timer:progress

**v0.2.5**（2026年5月18日）—— ColorTransform、ScrollFactor、BlendMode 和命名计时器。
- [新增] color:* API
- [新增] scroll:* API
- [新增] blend:* API
- [新增] timer:* API

**v0.2.4**（2026年5月18日）—— 文本 API。
- [新增] text:* 构造
- [新增] text:* 整文本变更器
- [新增] text:* 逐字母变更器
- [新增] text:gradientShader
- [新增] text:* 字母效果
- [新增] text:type 打字机
- [新增] 崩溃处理器

**v0.2.3**（2026年5月18日）—— 输入——鼠标、键盘和游戏方向。
- [新增] input:* 鼠标
- [新增] input:* 键盘
- [新增] input:* 游戏方向
- [新增] input:get / input:has
- [新增] input:get() 无参形式

**v0.2.2**（2026年5月17日）—— Lua API 参考的首次公开草案。
- [新增] song:*
- [新增] state:*
- [新增] game:*
- [新增] sprite:getPriority / getOrder
- [指南] 自定义状态和子状态
- [更新] sprite:priority 字符串别名
- [更新] LuaFreak 0.2.2 运行时

**v0.2.1**（2026年5月15日）—— 初始精灵与补间表面。
- [新增] sprite:*
- [新增] tw:*
- [新增] 事件回调
- [新增] 跨脚本调用

---

## 安装

### 1. 安装 Haxe

Freak Engine 通过 HaxeFlixel 编译,所以第一件事是安装 Haxe 工具链.从官网下载页面获取最新安装程序：

[haxe.org/download/list](https://haxe.org/download/list)

建议

- 选择 4.3.6(引擎自身 CI 构建所用版本)或更新的 4.3.x 稳定版.更早的 4.x 系列缺少引擎依赖的编译器修复；不支持 nightly / 开发版.

- 尽可能使用官方安装程序而不是包管理器——它会一步设置好 `haxelib`和在 `PATH` 上注册 Haxe,并创建 haxelib 仓库.

- 在 Linux 上,优先使用上述页面的官方 tarball.发行版包通常落后一个大版本.

- 在 macOS 上,优先使用安装程序而非 Homebrew——brew 配方通常指向较旧的 4.2 系列.

- 安装后,用 `haxe --version` 和 `haxelib version` 验证.两者都应无错误打印.

### 2. 克隆引擎

拉取仓库并运行适用于你平台的捆绑安装脚本——它会一次性安装所有必需的 haxelib（[hxcpp](https://lib.haxe.org/p/hxcpp/)、[flixel](https://lib.haxe.org/p/flixel/)、[lime](https://lib.haxe.org/p/lime/)、[openfl](https://lib.haxe.org/p/openfl/)、[luafreak](https://lib.haxe.org/p/luafreak/)）

### 3. 构建并运行

目标遵循标准 HaxeFlixel 约定.Lua API 在所有平台上完全相同.

### 4. 放入脚本

将 `.lua` 文件放在 `scripts/` 下的任何位置.它将在下次构建时转译为 Haxe 并自动注册.

---

## 入门

### 脚本的解剖

Freak Engine 脚本是一个普通 Lua 文件.在顶层定义任何事件回调,引擎会调用它们.在这些回调内部,通过标签(创建时选择的字符串)来定位精灵和补间.

### 生命周期

脚本与 `MusicBeatState` 共享生命周期：

- 发现——`scripts/` 下的每个 `.lua` 都会在构建时由 LuaFreak 转译为 Haxe 并注册,而不是在运行时发现.添加或移动脚本后需要重新构建才会出现.

- onCreate()——在状态的 `create()` 返回后立即触发.

- 每帧与指挥器回调——`onUpdate`和`onBeatHit`和`onStepHit`和`onSectionHit`.

- onDestroy()——状态拆除时触发.用它释放外部资源；精灵和补间会自动清理.

### 接下来读什么

- sprite:* API——每个绘制函数

- tw:* API——每个补间函数

- game:* API——读写引擎状态

- 完整示例——节拍反应场景和效果

---

## 变量和值

编写脚本前首先要了解：如何存储值和存在哪些类型的值,以及如何查看它们.

### 注释和打印

`--` 之后的任何内容都是注释,游戏会忽略.`print` 写入控制台(调试构建中按 F1)和 `logs/freak.log`,是查看脚本正在做什么的最快方式.

### 变量

变量是值的名称.第一次创建时写 `local`.没有它,变量变成全局变量,其他脚本可能意外覆盖它.在文件顶部和任何函数之外创建的变量在脚本运行期间保持其值,所以那是你保存生命值或计数器之类东西的地方.

### 值的种类

Lua 只有几种值：
- 数字：`10`和`-3`和`0.5`.整数和小数是同一种.
- 字符串：引号中的文本,`'hi'` 或 `"hi"`.
- 布尔值：`true` 或 `false`.
- nil："什么都没有".从未设置的变量是 `nil`.
- 表：值的列表或命名集合,见 Tables.
- 函数：可以调用的一段代码.
`type(v)` 告诉你拥有的是哪一种.

### 数学

`+ - * /` 照常工作.`//` 除法并丢弃小数,`%` 给出余数,`^` 是幂.`/` 总是给出小数：`7 / 2` 是 `3.5`.

### 比较和组合

用 `==`(等于)和 `~=`(不等于,Lua 不使用 `!=`)比较,加上 `< > <= >=`.一个 `=` 存储值,两个比较.用 `and`和`or`和`not` 组合检查.

只有 `nil` 和 `false` 算作"否".`0` 和空字符串 `''` 算作"是",与其他一些语言不同.

### 用 or 设置默认值

`a or b` 如果 `a` 不是 `nil`/`false` 则给出 `a`,否则给出 `b`.这是回退到默认值的常用方式.`cond and x or y` 像选择值的简短 if/else.

---

## 字符串

连接文本和将数字转为文本再转回,以及你最常用的字符串函数.

### 连接文本

使用 `..` 连接字符串.数字会为你转换为文本.`nil` 不会：连接 `nil` 是错误,所以将可能缺失的值用 `tostring` 包裹.你会经常用它来构建像 `'enemy'..i` 这样的标签.

### 文本转数字和转回

`tostring(v)` 从任何东西创建文本.`tonumber(s)` 从文本读取数字,如果文本不是数字则返回 `nil`,这对于检查玩家输入很方便.

### 有用的字符串函数

用 `:` 在字符串上调用它们.`#s` 是长度.位置从 1 开始.

### 格式化数字

`string.format` 填充模板.`%d` 是整数,`%.2f` 是 2 位小数,`%s` 是任何文本,`%02d` 用零填充.

---

## 表

Lua 有一个适用于一切的结构：表.它既作为列表(数组)又作为命名字段集合.

### 列表(数组)

将值放在 `{}` 中,用逗号分隔.项目从 1 开始编号,而不是 0.`#list` 是项目数量,所以最后一个是 `list[#list]`.

### 添加和删除

`table.insert(list, value)` 添加到末尾,`table.insert(list, pos, value)` 放在位置.`table.remove(list)` 移除最后一项并返回它,`table.remove(list, pos)` 从位置移除并向下移动其余项.

### 遍历列表

`ipairs` 按顺序给出每个位置和值.用 `_` 表示不需要的值.

### 命名字段

表也可以按名称保存值.用点读写它们,或者当名称在变量中时用 `['name']`.将字段设为 `nil` 会删除它.

### 遍历命名字段

`pairs` 遍历表的每个字段.顺序不固定,所以不要依赖它.如果需要顺序,保留一个列表.

### 表中的表

值也可以是表.表的列表是描述几种同类事物的好方式,比如关卡波次.

### 表是共享的,不是复制的

将表分配给另一个变量不会复制它.两个名称指向同一个表,所以通过一个所做的更改会通过另一个看到.要获得真正的副本,构建一个新表.

### 其他方便的函数

`table.concat` 将列表连接成一个字符串,`table.sort` 就地排序列表.给 `table.sort` 一个函数来选择顺序.要检查列表是否包含某物,遍历它.

---

## 条件和循环

仅在条件为真时运行代码,以及多次运行代码.

### if和elseif和else

每个 `if` 以 `end` 结束.根据需要添加任意数量的 `elseif`,以及一个 `else` 处理其他所有情况.

### 计数循环

`for i = from, to do` 对每个数字运行一次,两端都包含.第三个数字是步长：用它跳过或倒数.

### 循环中的循环

将一个循环放在另一个循环内以遍历行和列.

### while 和 repeat

`while` 先检查并在条件成立时重复.`repeat ... until` 至少运行一次并在条件变为真时停止.确保条件改变,否则游戏会冻结.

### 提前停止

`break` 立即离开循环.Lua 没有 `continue`：将循环体的其余部分放在 `if` 内.

### 循环时移除

在向前遍历列表时移除会跳过项目,因为之后的所有内容都会向下移动.改为向后遍历.

---

## 函数

给一段代码一个名称,以便你可以再次运行它,每次使用不同的值.

### 创建和调用函数

写 `function name(params) ... end`,然后用 `name(values)` 调用.你省略的值到达时为 `nil`.

### 返回值

`return` 发送一个值回去.一个函数可以一次返回多个值,用逗号分隔.

### 默认值

在函数顶部使用 `or` 填充未传递的参数.

### 传递函数

函数是值,所以你可以将一个交给引擎,它稍后会调用它.计时器和补间和按钮和网络事件都这样工作.你可以在调用中直接写函数.

### 引擎调用的函数

有些名称是特殊的：如果你的脚本有一个名为 `onCreate`和`onUpdate`和`onBeatHit` 等的函数,引擎会在正确的时刻调用它.你自己不调用这些.完整列表在 Event Callbacks.

### local 函数

像变量一样,函数可以是 `local`.局部函数只在其脚本内可见,这避免了脚本之间的名称冲突.在调用它的地方之上定义它.其他脚本应通过 `call_on_scripts` 或 `import` 到达的函数不能是局部函数.

---

## Freak Engine 中的 Lua

引擎函数如何融入普通 Lua,以及几乎每个人都会犯一次的错误.

### namespace:function

引擎函数按它们操作的对象分组：`sprite`和`text`和`tw`和`camera` 等.用冒号调用它们.第一个参数通常是标签,你在创建对象时给它的名称.

### 在哪里保存值

只有单个脚本需要的值,使用文件顶部的 `local` 变量.多个脚本读取的值,使用 `game:set` / `game:get` 和你自己的名称,或者用 `call_on_scripts` 在另一个脚本上调用函数.引擎对象保持自己的字段：用 `game:get('tag.field')` 读取它们,不要将它们复制到之后忘记更新的变量中.

### 不要每帧重建东西

`onUpdate` 每秒运行 60 次或更多.在那里每帧创建精灵和更改文本或加载图像很慢.在 `onCreate` 中做一次,在 `onUpdate` 中只更改实际改变的内容.

### 常见错误

- `if a = 1 then` 不工作,用 `==` 比较.
- `!=` 不是 Lua,用 `~=`.
- 列表从 1 开始.`list[0]` 是 `nil`.
- `sprite.add(...)` 带点是错误的,必须是 `sprite:add(...)`.
- `'hp: '..hp` 当 `hp` 是 `nil` 时失败.检查 `nil` 或使用 `tostring`.
- 忘记 `local` 会创建全局变量,另一个脚本可能覆盖它.
- 每个 `function`和`if`和`for` 和 `while` 都需要自己的 `end`.
- Lua 区分大小写：`onupdate` 不是 `onUpdate`,`Player` 不是 `player`.

当确实出错时,控制台显示脚本和行号和期望的内容.有关错误的样子,见 Runtime Scripts.

### 把它们放在一起

一个小脚本,使用了上面的大部分内容：标签列表和循环和函数和计时器和计数器.

---

## 事件回调

### 概述

Freak Engine 通过七个生命周期回调驱动脚本.`MusicBeatState` 将每个回调广播到每个定义了它的注册脚本；如果脚本省略了某个回调,对该脚本什么也不会发生——没有错误.

回调在状态生命周期中按此顺序触发：

- `onCreate()`——一次,在状态的 `create()` 完成后立即.

- `onUpdate(elapsed)`——每帧.

- `onStepHit(step)` / `onBeatHit(beat)` / `onSectionHit(section)`——由 `Conductor` 在歌曲推进时触发.一拍是 4 步；一小节是一个小节(默认 16 步).

- `onEvent(name, v1, v2, params, strumTime)`——每次歌曲到达谱面事件时.

- `onDestroy()`——一次,在状态拆除前.

### 回调列表

| 回调 | 参数 | 描述 |
|---|---|---|
| onCreate() | — | 在这里设置精灵和补间和状态. |
| onUpdate(elapsed) | Float——帧增量 | 每帧逻辑.保持廉价；避免分配. |
| onStepHit(step) | Int——绝对步数计数器 | 一拍的四分之一. |
| onBeatHit(beat) | Int——绝对拍数计数器 | 一个指挥器拍. |
| onSectionHit(section) | Int——绝对小节计数器 | 一个小节. |
| onDestroy() | — | 最终清理. |

### onEvent——谱面事件

`onEvent(name, v1, v2, params, strumTime)` 在歌曲播放头到达谱面事件的那一刻触发.它获得事件名称和前两个值(已类型化)和一个 `params` 表(包含按键和按位置的每个值,`value1`和`value2`……)以及事件的毫秒时间.没有 JSON 类型的事件获得两个文本值,像 Psych Engine 事件一样.

如何制作事件类型和放置事件和编写处理程序在 Chart Events 中逐步介绍.Psych Engine 谱面会自动导入它们的事件.

### events:*——命名处理程序和内置项

`onEvent` 是捕获所有；`events` 命名空间让你为每个事件名称绑定一个处理程序,而不是在 `onEvent` 内部分支.`events:on(name, fnName)` 注册一个全局 Lua 函数(按名称)在该谱面事件触发时运行(接收 `v1, v2, params, strumTime`)；`events:off(name)` 移除它；`events:trigger(name, v1, ...)` 手动触发事件(便于测试或脚本化你自己的过场动画).处理程序在 `state:change` 时重置.

| 调用 | 描述 |
|---|---|
| events:on(name, fnName) | 当谱面事件 `name` 触发时,运行名为 `fnName(v1, v2, params, strumTime)` 的全局函数. |
| events:off(name) | 注销 `name` 的处理程序. |
| events:trigger(name, v1?, ..., v8?) | 立即用最多 8 个值调用 `name` 的 `events:on` 处理程序；缺失的值获得事件类型的默认值(不运行内置项或 `onEvent`). |

引擎附带的内置处理程序会自动为这些事件名称运行(在 `funkinStyle` 模式中,角色/相机存在的地方)：

| 事件 | value1 / value2 | 效果 |
|---|---|---|
| FocusCamera | `0`=对手,`1`=bf,`2`=gf | 将相机指向该角色,直到下一个. |
| Camera Zoom | 数量 | 添加一次性缩放碰撞(缓动回去). |
| Set Camera Zoom | 缩放级别 | 设置静止游戏相机缩放. |
| Play Animation | 角色,动画 | 在 `bf`/`dad`/`gf` 上播放 `anim`. |
| Hey! | — | bf `hey` + gf `cheer`. |
| Change Character | 槽位(`bf`/`dad`/`gf`,或 Psych `0` bf和`1` dad和`2` gf),角色名 | 交换角色.它保持舞台点(见 `stage:position`)；目标在歌曲开始时预加载,所以交换不会停顿.重启恢复原始.触发 `onCharacterChange(slot, new, old)`.v0.7.3 |
| Change Scroll Speed | 乘数,秒 | 音符滚动速度作为谱面速度的倍数,在给定时间内缓动(`0` = 立即).v0.7.3 |
| Add Camera Zoom | 游戏量(0.015),HUD 量(0.03) | 游戏和 HUD 相机上的一次性缩放碰撞.v0.7.3 |
| Screen Shake | `"duration, intensity"` 用于游戏相机,HUD 相同 | 抖动任一或两个相机.v0.7.3 |
| Camera Follow Pos | x,y(两者都空 = 释放) | 将游戏相机保持在世界点上,而不是聚焦的角色.v0.7.3 |

你的 `events:on` 处理程序与同名内置项一起运行,所以你可以扩展内置项而不是替换它.

### 游戏玩法回调(PlayState)

歌曲播放时,`PlayState` 将这些广播到每个脚本(包括通过 song:play 带入的脚本)：

| 回调 | 参数 | 触发时机 |
|---|---|---|
| onPreload(song) | String 谱面名称 | 加载屏幕开始,在 `onCreate` 之前.用 preload:* 排队歌曲需要的内容,以便在加载屏幕下加载 v0.7.9 |
| onCountdownStart(amount) | Int 滴答数 | 节拍倒计时开始(谱面的 Countdown 值或 song:startCountdown)v0.7.2 |
| onCountdownTick(tick, left) | Int 1 基滴答,Int 剩余滴答 | 倒计时的每一拍；`left` 在最后一个上为 `0`,即音乐开始前一拍.在这里显示 "3, 2, 1, Go" v0.7.2 |
| onSongStart(name) | String 歌曲名 | 歌曲音频开始. |
| onSongEnd(name) | String 歌曲名 | 伴奏结束. |
| onSeek(ms) | Float 新位置(毫秒) | song:seek/`seekBy` 落在新位置. |
| onNoteHit(strum, direction, id, isLong, delay, noteType) | 见下文 | 音符被命中——玩家或对手. |
| onNoteMiss(strum, direction, id, isLong, noteType, tag) | 见下文 | 玩家音符被错过和长按被丢弃,或空车道被敲击. |
| onNoteHurt(strum, direction, id, isLong, delay, noteType) | 同 `onNoteHit` | 玩家按了 `avoid` 音符(地雷/伤害音符).代替 `onNoteHit` 触发；类型的 `hurtMiss` 开启(默认)时 `onNoteMiss` 也触发 v0.6.8 |
| onNoteAvoid(strum, direction, id, isLong, noteType) | 见下文 | `avoid` 音符滚动过去而未被按下——正确的玩法,所以不计错过 v0.6.8 |
| onHoldEnd(strum, direction, id, noteType) | v0.5.6 | 长按音符一直保持到最后.触发一次,长按被丢弃时不触发——那通过 `onNoteMiss` 报告,`isLong` 为真. |
| onKeyPress(direction) | Int 车道 0–3 | 音符键按下,无论是否有音符在那里.尊重 `canPress` 和 `laneCanPress` v0.5.8 |
| onKeyRelease(direction) | Int 车道 0–3 | 音符键弹起 v0.5.8 |
| onGameOver() | — | `health` 达到 `0`.每次降到零触发一次(生命值必须回升到 `0` 以上才能再次触发)v0.6.5 |

音符回调参数：

- `strum`——音符线：`0` = 玩家,`1` = 对手(2+ 保留).

- `direction`——`0` 左,`1` 下,`2` 上,`3` 右(4+ 用于额外键).

- `id`——音符的谱面索引.`-1` 表示没有特定音符(幽灵敲击误触,或丢弃的长按).

- `isLong`——Bool,长按/持续音符为 true.

- `delay`——Float(仅 `onNoteHit`)玩家的有符号命中偏移(毫秒,正 = 晚,负 = 早)；对手自动命中为 `0`.

- `noteType`——String,来自谱面的音符类型(例如 `'Hurt Note'`和`'Alt Animation'`)；普通音符或没有特定音符时为 `''`.Psych 音符类型现在传递而不是被丢弃,所以你可以在这里对它们做出反应.

- `tag`——String(仅 `onNoteMiss`)指向错过的音符本身的精灵标签(`'missedNote'`),所以你可以补间/重新着色它.幽灵敲击(无音符)时为 `''`.见下方提示.

### 动画长按音符

`onNoteHit` 像短音符一样为长按音符触发——区别是第 4 个参数 `isLong`.它在头部被击中时触发一次,所以那是持续动画开始的地方.

结束它需要两个回调,因为长按可以两种方式完成：

- `onHoldEnd`——一直保持到最后.

- `onNoteMiss` 且 `isLong` 为 true——提前丢弃.

如果你想在长按期间运行某些东西而不只是在其两端,在 `onUpdate` 中轮询 `game:get('playerHolding')`——音符持续期间没有每帧回调触发.

---

## 跨脚本调用

LuaFreak 暴露两个全局变量,用于在其他注册脚本上调用代码.这就是 `scripts/` 中的脚本相互通信的方式——默认没有共享全局状态.

### call(scriptName, funcName, ...)

参数：
- `scriptName`(String)——完整路径(`'scripts/effects/fade'`)或裸文件名主干(`'fade'`)——路径匹配优先
- `funcName`(String)——在目标脚本上调用的函数
- `...`(any)——转发参数

返回：*any | nil*

在单个脚本上调用 `funcName`.返回函数的返回值,如果脚本或函数不存在则返回 `nil`.打印行标记有被调用者的脚本 id,而不是调用者的——对于追踪哪个脚本实际产生了日志行很有用.

```lua
-- 在 scripts/beat_pulse.lua 中
function onCreate()
    call("script", "test")
end

-- 在 scripts/game/script.lua 中
function test()
    print("hello")
end

-- 输出：
-- [scripts/game/script] hello
```

### call_on_scripts(funcName, ...)

参数：
- `funcName`(String)——在每个定义了它的注册脚本上调用
- `...`(any)——转发参数

返回：void

在每个定义了它的注册脚本上调用 `funcName`.用于广播自定义事件；没有该函数的脚本被静默跳过.

```lua
call_on_scripts("onCustomEvent", 42)
```

### 重命名调用分发器

(见 luafreak.json 的 `scriptCalls` 字段)

---

## 运行时脚本

Freak Engine 通过 `luafreak.json` 中的 `mode` 字段选择两种后端之一来运行 Lua.`scripts` 命名空间在两种模式下都工作,并在运行时模式下解锁运行时加载.

### 可用性

两种模式都工作.Freak Engine 以运行时模式发布,`luafreak.json` 中 `"mode": "luajit"`.名称保留是为了让旧配置继续工作：脚本在 LuaFreak 解释器上运行,该解释器用 Haxe 编写并内置于游戏中,而不是原生 LuaJIT 库.由于没有东西离开引擎,脚本错误会被捕获并报告,而不是让游戏崩溃.`scripts:mode()` 和 `scripts:count()` 在两种模式下都工作；`scripts:reload()` 和 `scripts:run()` 需要运行时模式,在转译模式下报告错误.

### 两种模式

| | `"mode": "transpile"` | `"mode": "luajit"` |
|---|---|---|
| 脚本如何运行 | 每个 `.lua` 在构建时转换为真正的 Haxe 类并编译进二进制. | 原始 `.lua` 文件在运行时由内置于游戏的 LuaFreak 解释器读取. |
| 编辑脚本 | 需要重新构建. | 保存文件,当前场景自行重新加载(见下方热重载),或按 Shift+F5. |
| 模组 | 关闭——脚本被烘焙进去. | 开放——玩家可以将 `.lua` 文件放入 `assets/scripts/`. |
| 错误 | 在构建时捕获. | 运行时报告,包含脚本和行号,在 `logs/freak.log` 中,并在 `game:set('scriptLogs', true)` 时作为通知.错误不会关闭游戏. |
| 速度 | 编译为原生代码,最快选项. | 解释执行.适合游戏逻辑；每帧大量数学比转译慢. |
| API 表面 | 相同——相同的 `sprite:*`和`game:*`和`net:*`…… 在两种模式下都解析. |

切换是一个词.更改 `luafreak.json` 中的 `"mode"` 并重新构建——引擎在构建时检测模式并自动连接一切(解释器和脚本发布和分发).你的脚本及其回调在任一模式下都保持不变地工作.

在运行时模式下,引擎在启动时加载 `assets/scripts/` 下的每个 `.lua`,并拾取游戏运行时添加的文件.文件夹根目录中的脚本接收全局生命周期回调(`onCreate`和`onUpdate`和节拍……)；子文件夹中的脚本保留用于自定义状态和跨脚本调用,与转译模式完全一样.

### 打开运行时脚本

在 `luafreak.json` 中切换模式.`project.xml` 在任何构建之前用 `<json>` 读取该文件,并在模式为 `"luajit"` 时打开 `luafreak_luajit`,所以 `scripts` 文件夹在第一次构建时就进入导出.`<json>` 适用于任何 JSON 文件：每个字段变成一个以文件命名的值,嵌套字段和列表项用点(`luafreak.scripts.active.song`和`luafreak.list.0`),`if`/`unless` 可以比较值(`luafreak.mode==luajit`)或检查 true/false 字段(`if="luafreak.verbose"`).设置 `"mode": "transpile"` 以将脚本编译进游戏.`luafreak_source_scripts` 行使游戏直接从项目的 `scripts` 文件夹读取脚本,所以你编辑原始文件,热重载会拾取它们；在其他计算机上该文件夹不存在,使用导出中的副本.

### 编辑时的错误

语法错误显示行号并指向位置,与构建相同,在控制台和 `logs/freak.log` 中都是.失败的热重载保持前一版本运行并说明.API 调用也在运行时检查：
- 错误的参数类型——`sprite:position('box', {0, 0})`——被报告并跳过调用；
- 在需要标签的地方传递 `nil` 会命名参数：通常是变量不存在；
- 将 `nil` 粘入字符串(`tag..'.x'` 且 `tag` 未定义)会警告变量名.

调用字符串或数字上不存在的方法,例如 `state:open(state)` 其中 `state` 是局部字符串,也会被报告,局部变量命名为 API(`state`和`sound`和`text`……)会得到重命名提示.

引擎指出的拼写错误 v0.7.7
- 参数之间键入 `.` 而不是 `,`：`sprite:position('box', 100. 200)` 或 `sprite:add('bg', 'stages/bg'. 0, 0)`.每个脚本在加载和保存时检查,行号在日志中命名.
- 路径中逗号而不是点：`game:get('box', 'height')` 说写 `game:get('box.height')` 并仍然返回值.
- 缺少点：`game:get('boxheight')` 或 `game:set('box_height', 5)` 问 "did you mean `box.height`?".

### 游戏模式(@ 文件夹)

名称以 `@` 开头的文件夹,如 `scripts/@arenacoop/`,是一个单独的游戏模式.它的脚本与其余脚本一起加载,但仅当来自该文件夹的屏幕打开时运行：`@arenacoop/...` 的菜单或从它开始的歌曲.
- 在游戏的其余部分,它们得不到 `call_on_scripts` 调用,也得不到引擎回调如 `onSongStart` 或 `onNoteHit`,所以两个模式可以使用相同的函数名而不互相干扰.
- 从该模式打开屏幕会再次打开其脚本.
- 两个模式都需要的代码属于普通文件夹,不带 `@`.

### 从另一个脚本加载一个脚本

脚本有两种方式获得另一个脚本的句柄并直接调用它,而不是通过 call_on_scripts 的广播给所有人模型.

`import('path/to/script')` 只接受字符串字面量并在构建时解析它——这是典型项目中每个舞台脚本和子模块(`game/enemy`和`game/souls/seiko`……)和菜单助手使用的.它在文件顶部作为一次性 `local mod = import(...)` 工作,返回的表暴露该脚本的函数/字段以供直接调用(`mod.someFunction(...)`).

`require(path)` v0.6.3 做同样的工作但接受任何表达式(连接字符串和变量和从 `game:get`/`save:get` 读取的值)并在运行时解析它——而且不像 `import`,它也在函数体内工作,而不仅是文件作用域.当要加载哪个脚本直到游戏实际运行才知道时使用它.

不匹配任何已加载脚本的路径不会使任一函数崩溃.`require` 仍然返回一个可用的句柄,调用该句柄上的函数或读/写字段时,一旦路径从未解析,会静默地什么也不做(返回 `nil`/`false`),而不是 `require` 本身返回 `nil`.未命中仍记录到控制台——每个不同的调用点和路径一次——所以拼写错误会显示而不会让游戏崩溃.

### scripts:mode()

返回：String

返回活动后端：`"transpile"` 或 `"luajit"`(运行时模式).用它来在必须同时工作的脚本中门控仅运行时功能(如 `scripts:run`).

```lua
print('running on ' .. scripts:mode())
```

### scripts:reload()

返回：Int

仅运行时模式.重新读取 `assets/scripts/` 下的每个 `.lua` 并再次加载,返回加载的数量,所以新代码无需重启游戏即可生效.它不重启当前场景；保存场景文件或 Shift+F5 会重启,见热重载.在转译模式下报告错误.

```lua
function onUpdate(dt)
    if input:keyJustPressed('F8') then
        local n = scripts:reload()
        print('reloaded ' .. n .. ' scripts')
    end
end
```

### 热重载

在 `luajit` 模式下,游戏从 exe 旁边的 `assets` 文件夹读取脚本和资产,所以可以在构建文件夹中制作模组而无需再次编译.

- 自动重载默认关闭.用 Shift+F6 打开(选择会保存),用 `--hot-reload` 启动游戏,或从脚本用 `game:set('autoReload', true)`.

- 打开后,保存任何已加载的 `.lua`——菜单和歌曲和舞台或全局脚本——会重新加载它并重启当前屏幕.歌曲从头开始,带全新舞台和角色和谱面.

- Shift+F5 手动做同样的事,并重新加载每个 `.png`和`.xml` 或 `.json` 更改的图片和角色文件和事件类型和新文件或文件夹.

- 当前屏幕不使用的游戏模式文件夹(以 `@` 开头的文件夹)中的脚本被静默重新加载：屏幕继续运行,通知说更改在打开该模式时应用.

- 游戏启动时加载失败的脚本可以修复并保存；那时无需重启即可加载.

- 在谱面编辑器中只有脚本重新加载,所以未保存的谱面永不丢失.

- 保存有语法错误的文件保持前一版本运行并显示通知.

- 连续错误 30 次的回调被暂停直到下次重载.

- 更改的音乐和声音在游戏重启后拾取.

打开后,文件每秒检查四次,重载等到文件停止变化.Shift+F6 或 `game:set('autoReload', false)` 再次关闭.在 `transpile` 模式下脚本编译进 exe,所以仅用于最终发布.

### scripts:run(code)

参数：
- `code`(String)——立即执行的 Lua 源代码

返回：Bool

仅运行时模式.立即在其自己的一次性脚本环境中执行一个 Lua 源代码字符串——一个具有完整引擎 API 访问权限的 `loadstring` 风格 eval.运行一次,不为回调注册.为调试控制台和聊天命令脚本和网络同步逻辑提供动力.在转译模式下报告错误.

```lua
scripts:run("sprite:rec('box', 100, 100, 50, 50, 'FF0044')")

function onNetMessage(event, data)
    if event == 'exec' and scripts:mode() == 'luajit' then
        scripts:run(data.code)
    end
end
```

### scripts:count()

返回：Int

已加载脚本的数量——运行时模式中已加载的脚本,转译模式中编译进的脚本模块.

```lua
print(scripts:count() .. ' scripts loaded')
```

---

## 预加载函数

在加载屏幕期间加载歌曲需要的内容,以便游戏玩法中不会有东西解码.脚本在 `onPreload` 中列出它们的资产；引擎还会自行扫描脚本源代码中的图像路径.

### 歌曲如何加载

歌曲开始时,加载屏幕按此顺序运行：

- `onPreload(song)` 在每个已加载脚本上触发,包括用 `import` 拉入的模块.`song` 是谱面名称,例如 `'bf-erazor'`.

- 引擎扫描歌曲脚本和舞台脚本及它们导入的一切以查找图像路径并排队(用 `preload:scan(false)` 关闭此功能).

- 加载屏幕等到每个排队的图像和声音和着色器就绪.

- `onCreate` 触发.从此刻起首次加载的任何东西在游戏玩法期间解码.

所以 `onCreate` 对预加载来说太晚了：将列表放在 `onPreload` 中.

扫描器只为以 `/` 结尾且不用作前缀的路径加载整个文件夹.保存在变量中的前缀(`local d = 'ui/'`)与同一文件中的其他字符串组合,所以 `d .. 'button'` 或传递给 `'button'` 的助手只加载 `ui/button`.运行时构建的路径(来自存档和歌曲名和随机数)扫描器看不到——在 `onPreload` 中列出那些.

### 排队资产

### preload:images(list)

参数：
- `list`(String | Array<String>)——图像键,与传递给 `sprite:add` 的相同.以 `/` 结尾的键排队该文件夹中的每个图像

返回：Int

在后台线程解码图像并每帧上传几毫秒.返回排队了多少图像.从 `onPreload` 调用时,加载屏幕等待它们；稍后调用时,它们在后台加载,一旦就绪,用相同键的 `sprite:add` 是即时的.`sprite:preload` 做同样的事.

```lua
function onPreload(song)
    local time = song == 'bf-darken' and 'night' or 'day'
    preload:images({'stages/park/' .. time .. '/', 'chars/e/young'})
end
```

### preload:sounds(list)

参数：
- `list`(String | Array<String>)——声音名称,与传递给 `sound:play` 的相同

返回：Int

提前加载声音,使第一次 `sound:play` 不会停顿.与为每个名称调用 `sound:preload` 相同.

```lua
function onPreload()
    preload:sounds({'hurt', 'heal', 'ui/btn_click'})
end
```

### preload:music(list, ?native)

参数：
- `list`(String | Array<String>)——音乐轨道名称
- `native`(Bool)——通过原生解码器加载,像 `music:preload` [默认 false]

返回：Int

提前加载音乐轨道.与为每个名称调用 `music:preload` 相同.

```lua
function onPreload()
    preload:music("Judge's Slice", true)
end
```

### preload:shaders(?list)

参数：
- `list`(String | Array<String>)——着色器名称或预热标签；省略以编译每个已知着色器

返回：Int

提前编译着色器,使使用它的第一帧不会卡顿.与 `shader:preload` 相同.

```lua
function onPreload()
    preload:shaders({'heat', 'wave'})
end
```

### 控制扫描器

### preload:skip(scripts)

参数：
- `scripts`(String | Array<String>)——扫描器不应读取的脚本 id,与传递给 `import` 的相同

返回：Int

使扫描器远离此歌曲不使用的脚本——通常是运行时选择舞台的脚本的其他舞台.仅适用于正在加载的歌曲；从 `onPreload` 调用它.

```lua
local stages = {park = import('game/stages/park'), train = import('game/stages/train')}

function onPreload(song)
    local current = song == 'bf-re-train' and 'train' or 'park'
    for name in pairs(stages) do
        if name ~= current then preload:skip('game/stages/' .. name) end
    end
end
```

### preload:scan(?on)

参数：
- `on`(Bool)——`false` 为正在加载的歌曲关闭扫描器；省略以读取当前值

返回：Bool

当歌曲在 `onPreload` 中自己列出一切时关闭自动扫描器.它会在下一首歌自动重新打开.

```lua
function onPreload()
    preload:scan(false)
    preload:images({'ui/', 'stages/park/day/'})
end
```

---

## 加载屏幕

用脚本绘制你自己的加载屏幕并决定歌曲何时开始：等待按键和播放动画,然后交给过渡.

### 工作原理

在歌曲开始前设置绘制加载屏幕的脚本：

`game:set('loadingScript', 'menus/loading')`

歌曲加载时,只有这个脚本获得回调：`onCreate`和`onUpdate` 和下面的加载回调.它的精灵位于加载相机上,在内置标签和条的上方.

- `onCreate` 在加载屏幕打开时运行.如果屏幕应该等待,在这里调用 `loading:hold(true)`.

- `onLoadingReady` 在所有内容加载完成后运行.

- 没有 `hold` 时歌曲立即开始.有了它,屏幕保持直到脚本调用 `loading:finish()`.

- `onLoadingFinish` 运行,歌曲被构建,过渡在游戏的第一帧播放其 in 部分.

过渡从第一帧覆盖游戏,所以在它开始前不会有任何游戏画面闪烁.

### 回调

| 回调 | 何时 |
|---|---|
| `onLoadingReady()` | 一次,当每个图像和声音和着色器就绪时.在这里显示你的 "Press ENTER". |
| `onLoadingFinish()` | 在歌曲被构建之前,在 `loading:finish` 之后或没有 `hold` 时立即. |
| `onLoadingFailed(error)` | 歌曲无法加载.`error` 是屏幕上显示的消息. |

### 控制加载屏幕

### loading:hold(?on)

参数：
- `on`(Bool)——`true` 在所有内容就绪时保持加载屏幕 [默认 true]

返回：Bool

使加载屏幕等待 `loading:finish` 而不是自行开始歌曲.在加载脚本的 `onCreate` 中调用它；每首新歌开始时它都是关闭的.

```lua
function onCreate()
    loading:hold(true)
end
```

### loading:finish(?transition)

参数：
- `transition`(String)——过渡预设的名称(见 `transition:add`)以在游戏上播放其 in 部分.仅在已有过渡运行时使用

返回：Bool

开始歌曲.如果加载尚未完成,它在完成后立即开始.当歌曲用 `transition:to` 或 `transition:enter` 打开时,该过渡播放其 in 部分；否则传递一个预设名称以获得一个.

```lua
if loading:ready() and input:keyJustPressed('ENTER') then
    loading:finish('default')
end
```

### loading:defaults(?show)

参数：
- `show`(Bool)——`false` 隐藏内置标签和条和着色器行 [默认 true]

返回：Bool

显示或隐藏引擎自己的加载文本和条,以便自定义屏幕绘制自己的.黑色背景保留.

```lua
loading:defaults(false)
```

### 读取状态

### loading:ready()

返回：Bool

一旦所有内容加载完成即为 `true`,在 `hold` 保持屏幕时也是如此.

```lua
if loading:ready() then text:set('ldLabel', 'Press ENTER') end
```

### loading:active()

返回：Bool

加载屏幕显示期间为 `true`.

```lua
if not loading:active() then return end
```

### loading:progress()

返回：Float

加载进度从 0 到 1,与内置条显示的值相同.

```lua
bar:value('ldBar', loading:progress())
```

### loading:phase()

返回：String

当前正在加载的内容：`stage`和`characters`和`shaders`和`ready`和`error` 或歌曲步骤.

```lua
text:set('ldStep', loading:phase())
```

### 完整示例：按 ENTER 开始

一个带有自己背景和标签的加载屏幕.当加载完成时,它要求按 ENTER,淡出背景,然后用 `default` 过渡开始歌曲.

---

## 内置全局变量

LuaFreak 用 Haxe 侧实现替换 Lua 的标准全局变量.

### 打印

### print(...)

参数：
- `...`(any)——要打印的值,用制表符分隔

返回：void

打印参数,用单个空格分隔,标记有源脚本 id 和行号.

```lua
print("hello", 1, true)  -- [scripts/foo:1] hello 1 true
```

### trace(...)

参数：
- `...`(any)——要跟踪的值

返回：void

与 `print` 行为相同——两者都通过 `Sys.println` 路由并标记有源文件 id.

```lua
trace("debug:", someValue)
```

### 错误

### error(message)
*自 v0.7.2*

参数：
- `message`(any)——出了什么问题

返回：never

用命名脚本和行号的错误停止当前函数.像 `onUpdate` 这样出错的回调被报告并跳过；游戏继续运行.用 `pcall` 捕获它.

```lua
if not song then
    error('no song loaded')
end
```

### assert(value, ?message)
*自 v0.7.2*

参数：
- `value`(any)——检查的值
- `message`(String?)——错误文本 [默认 "assertion failed!"]

返回：any

当 `value` 为真时返回它,否则用 `message` 出错.

```lua
local cfg = assert(json:load('config.json'), 'config.json is missing')
```

### pcall(fn, ...)
*自 v0.7.2*

参数：
- `fn`(function)——要运行的函数
- `...`(any)——fn 的参数

返回：Bool, ...

运行 `fn` 并捕获任何错误.返回 `true` 和 `fn` 的结果,或 `false` 和错误消息.

```lua
local ok, err = pcall(function()
    error('boom')
end)
print(ok, err) -- false  state/title:2: boom
```

### xpcall(fn, handler, ...)
*自 v0.7.2*

参数：
- `fn`(function)——要运行的函数
- `handler`(function)——获取错误消息；其结果被返回
- `...`(any)——fn 的参数

返回：Bool, ...

像 `pcall`,但出错时返回 `false` 和 `handler` 对消息返回的内容.

```lua
local ok, why = xpcall(risky, function(msg) return 'risky failed: ' .. msg end)
```

### 值和表

### type(v)

参数：
- `v`(any)——要检查的值

返回：String

返回 Lua 类型名称：`"nil"`和`"boolean"`和`"number"`和`"string"`和`"table"`和`"function"` 或 `"userdata"`.

```lua
print(type(42))      -- number
print(type("hi"))    -- string
print(type(nil))     -- nil
```

### tostring(v)

参数：
- `v`(any)——要强制转换的值

返回：String

将任何值强制转换为字符串形式.`nil` → `"nil"`,布尔值 → `"true"`/`"false"`.

```lua
local s = tostring(3.14)  -- "3.14"
```

### tonumber(v)

参数：
- `v`(String|Number)——要转换的值

返回：Number | nil

将字符串或数字转换为数字.如果转换失败则返回 `nil`.

```lua
local n = tonumber("42")    -- 42
local x = tonumber("abc")   -- nil
```

### pairs(t)

参数：
- `t`(Table)——要迭代的表

返回：Iterator

迭代表的所有条目——先是数组部分(1 基 int 键),然后是哈希部分(字符串键).

```lua
for k, v in pairs({a = 1, b = 2}) do
    print(k, v)
end
```

### ipairs(t)

参数：
- `t`(Table)——要迭代其数组部分的表

返回：Iterator

仅以 1 基顺序迭代表的数组部分,在第一个间隙处停止.

```lua
for i, v in ipairs({"red", "green", "blue"}) do
    print(i, v)
end
```

### 表

使用 Lua 的标准表语法——LuaFreak 提供具有分离数组和哈希部分的后端 `LuaTable`：

### 真值

只有 `nil` 和 `false` 为假.`0` 和 `""` 为真,与标准 Lua 完全一样.LuaFreak 通过辅助函数路由 `and`和`or` 和 `not`,在 `Dynamic` 值上保持此语义.

### version()

返回：String

返回 LuaFreak 运行时版本字符串.与引擎版本分开——对特定运行时版本进行功能门控很有用.

```lua
print(version())
-- [scripts/foo:1] LuaFreak 0.2.2
```

### 随机

引擎提供的随机助手,可作为裸全局变量调用(无命名空间).全部通过 Flixel 的种子化 `FlxG.random` 路由,所以它们尊重引擎的可重现 RNG 流.

### randomInt(min, max, exclude)

参数：
- `min`(Int)——下界(包含)
- `max`(Int)——上界(包含)
- `exclude`(String | Table)——要从抽取中排除的值——表 `{3, 4}` 或逗号分隔字符串 `'3,4'` [可选]

返回：Int

`[min, max]` 中的随机整数,两端都包含.如果 `min > max`,边界自动交换.传递 `exclude` 以跳过特定值——接受 Lua 表或逗号分隔字符串.便于"除这条车道外的任何车道"的选择.

```lua
local dir = randomInt(0, 3)        -- 一个随机音符车道
sprite:add('note' .. dir, 'notes/arrow')

randomInt(1, 8, {3, 4})            -- 1..8,永远不是 3 或 4(表)
randomInt(1, 8, '3,4')             -- 相同,逗号分隔字符串
```

### randomFloat(min, max)

参数：
- `min`(Float)——下界 [默认 0]
- `max`(Float)——上界 [默认 1]

返回：Float

`[min, max)` 中的随机浮点数.无参数调用时默认为 `0..1`.

```lua
local a = randomFloat()          -- 0..1
local x = randomFloat(-50, 50)   -- 抖动
```

### randomBool(chance)

参数：
- `chance`(Float)——`true` 的百分比几率(0–100)[默认 50]

返回：Bool

以给定百分比概率返回 `true`.无参数时是公平的抛硬币.

```lua
if randomBool(25) then        -- 25% 的时间
    sprite:play('gf', 'cheer')
end
```

### randomSign()

返回：Int

以相等概率返回 `-1` 或 `1`.便于随机化方向或击退侧.

```lua
sprite:velocity('confetti', 120 * randomSign(), -200)
```

### randomColor()

返回：String

返回随机不透明颜色作为 `#RRGGBB` 十六进制字符串——直接放入任何接受颜色的函数(`sprite:rec`和`tw:color`和`camera:flash`……).

```lua
sprite:rec('flash', 0, 0, 1280, 720, randomColor())
```

---

## 精灵函数

所有精灵函数通过创建精灵时设置的字符串 `tag` 识别其目标.标签是唯一句柄——引擎通过 `TagSprite` 插件存储它们,所以任何脚本中的任何函数都可以稍后按名称寻址精灵.

每个函数成功时返回 `true`,如果标签未知或参数无效则返回 `false`.

### 创建和加载

从图像或动画图集添加精灵和复制它们和预加载场景需要的图像并移除完成的内容.

### sprite:preload(images)
*自 v0.6.9*

参数：
- `images`(String | Array<String>)——图像键,与传递给 `sprite:add` / `backdrop:add` 的相同

返回：Int

在后台线程解码图像并每帧上传几毫秒到 GPU,所以稍后用相同键的 `sprite:add` 是即时的,而不是在帧中间解码 PNG.以 `/` 结尾的键排队整个文件夹.返回排队了多少键.与 preload:images 相同：从 `onPreload` 调用以在加载屏幕下加载.

```lua
function onPreload()
    sprite:preload({'results/bg', 'results/rank/S', 'results/rank/A'})
end
```

### sprite:mipmaps(tag, ?enabled)
*自 v0.6.9*

参数：
- `tag`(String)——精灵标签
- `enabled`(Bool?)——`true` 现在为此精灵的图像构建 mipmap；`false` 为它关闭 [默认 true]

返回：Bool

Mipmap 自动且仅在需要时构建：第一次图像绘制小于其大小的约 70%(精灵缩放乘以相机缩放)时,引擎在后台线程重新解码它并构建 gamma 正确和alpha 感知的 mip 链,然后在接下来几帧上传覆盖.从未缩小的图像(UI和全尺寸或更大绘制的舞台)永远不会支付额外三分之一的内存.对于罕见的例外使用此函数：`true` 准备你知道稍后会缩小的精灵,`false` 用于应保持清晰的像素艺术.`game:set('mipmaps', false)` 仍然在所有地方关闭 mipmap.

```lua
sprite:mipmaps('bgFar')          -- 稍后会被缩小
sprite:mipmaps('pixelHud', false)
```

### sprite:add(tag, img, x, y, priority)

参数：
- `tag`(String)——对象标签
- `img`(String)——图像路径(无扩展名),通过 `Paths.image` 解析
- `x`(Number | Table)——X 位置——或一个 `{x, y}` 表同时设置两者 [默认 0]
- `y`(Number?)——Y 位置(当 `x` 是表时忽略)[默认 0]
- `priority`(String|Number?)——绘制层：`'back'`和`'middle'`和`'front'` 或数字.省略以绘制在顶部 [可选]

返回：Bool

向状态添加静态图像精灵.位置接受 `x, y` 或单个 `{x, y}` 表.

```lua
sprite:add('player', 'myimages/player', 10, 25)     -- x, y
sprite:add('logo',   'ui/logo',          {10, 25})  -- {x, y} 表
sprite:add('bg',     'stage/bg')                    -- 默认为 0, 0
```

### sprite:anim(tag, img, x, y, priority)

参数：
- `tag`(String)——对象标签
- `img`(String)——图像 + XML 路径(无扩展名)
- `x`(Number | Table)——X 位置——或一个 `{x, y}` 表同时设置两者 [默认 0]
- `y`(Number?)——Y 位置(当 `x` 是表时忽略)[默认 0]
- `priority`(String|Number?)——绘制层：`'back'`和`'middle'`和`'front'` 或数字.省略以绘制在顶部 [可选]

返回：Bool

添加 Sparrow 图集动画精灵.`<img>.png` 和 `<img>.xml` 都必须存在于 `assets/images/` 下.

```lua
sprite:anim('player', 'characters/bf', {400, 300})
```

### sprite:addSkewed(tag, img, x, y, priority)
*自 v0.6.2*

参数：
- `tag`(String)——对象标签
- `img`(String)——图像路径
- `x`(Float/Table?)——X 位置,或 `{x, y}` 表 [默认 0]
- `y`(Float?)——Y 位置(如果 x 是表则忽略)[默认 0]
- `priority`(String|Number?)——绘制层：`'back'`和`'middle'`和`'front'` 或数字.省略以绘制在顶部 [可选]

返回：Bool

与 `sprite:add` 相同,但精灵稍后也可以用 `sprite:skew` 剪切.普通 `sprite:add` 精灵创建后无法剪切——如果你需要它,使用这个.

```lua
sprite:addSkewed('card', 'ui/card', {200, 150})
sprite:skew('card', 12, 0)
```

### sprite:clone(tag, sourceTag, x, y)

参数：
- `tag`(String)——副本的新对象标签
- `sourceTag`(String)——要复制外观的现有精灵标签
- `x`(Number | Table)——X 位置——或 `{x, y}` 表.默认为源精灵的位置 [可选]
- `y`(Number?)——Y 位置(当 `x` 是表时忽略)[可选]

返回：Bool

创建一个新精灵,复制现有标记精灵的外观——图形(或图集帧)和缩放和翻转和角度和alpha和颜色色调.这是复制精灵的正确方式：`sprite:add(tag, game:get('orig.graphic.key'))` 不工作,因为 `graphic.key` 是完整解析路径(`assets/images/….png`),而 `sprite:add` 期望短键.

只复制视觉——不复制动画和物理或回调.对于动画源,在克隆上重新注册并播放动画(`sprite:addAnim` / `sprite:play`).

```lua
sprite:add('ship', 'ships/sun')

-- 一个新位置的副本,然后淡出它
sprite:clone('ghost', 'ship', {400, 300})
game:set('ghost.alpha', 0.4)
```

### sprite:reload(tag, img)
*自 v0.6.6*

参数：
- `tag`(String)——对象标签——必须已存在(先 `sprite:add`)
- `img`(String)——图像路径(无扩展名),与 `sprite:add` 相同

返回：Bool

从每个缓存(此引擎的和OpenFL 的位图缓存和 GPU 纹理)中逐出 `img` 并从磁盘重新加载它,然后应用到 `tag`——用于在不变的文件名下拾取新字节(艺术迭代)而无需重启.仍然显示同一图像的任何其他精灵也会刷新,而不是被留在指向刚被释放的图形.

```lua
sprite:add('logo', 'ui/logo', 10, 25)
-- ...在磁盘上编辑 ui/logo.png...
sprite:reload('logo', 'ui/logo')  -- 拾取新像素
```

### sprite:remove(tag)

参数：
- `tag`(String)——对象标签

返回：Bool

从状态移除标记的精灵,释放其绘制层槽位,并销毁它.也退出它所属的任何组(组在访问时修剪死标签).如果标签未知则返回 `false`.

```lua
sprite:add('coin', 'items/coin')
-- ... 稍后 ...
sprite:remove('coin')
```

### sprite:lifetime(tag, seconds)

参数：
- `tag`(String)——对象标签
- `seconds`(Float)——自动销毁时间,秒(必须 > 0)

返回：Bool

安排标记的精灵在 `seconds` 后被移除并销毁——短期对象(枪口闪光和命中火花和分数弹出和碎片)的即发即忘计时器.触发时,精灵从状态中拉出并销毁；标签释放.如果标签未知或 `seconds ≤ 0` 则返回 `false`.引擎管理,所以不需要 `timer:*` 标签或 `onUpdate` 倒计时.

```lua
sprite:rec('spark', px, py, 8, 8, 'FFEE66')
sprite:velocity('spark', 0, -60)
sprite:lifetime('spark', 0.4)   -- 0.4 秒后消失
```

### 动画

从图集注册动画和播放它们并给每个自己的偏移.

### sprite:addAnim(tag, name, xmlAnim, fps, loop, intro)

参数：
- `tag`(String)——对象标签
- `name`(String)——稍后播放的动画名称(`sprite:play`)
- `xmlAnim`(String)——XML 内帧的前缀
- `fps`(Int)——每秒帧数 [默认 8]
- `loop`(Bool)——可循环 [默认 true]
- `intro`(Int)——开头播放一次并在之后每次循环跳过的介绍帧数 [默认 0]

返回：Bool

在由 `sprite:anim` 创建的精灵上注册动画.

介绍帧(`intro`)：对于循环动画,前 `intro` 帧播放一次,然后循环在它们之后重新开始——循环排除介绍.适合不应重复的蓄力或进入：4 帧动画 `intro = 1` 播放 `1 2 3 4` 然后循环 `2 3 4`.仅当 `loop` 为 `true` 时有意义；`0` 像以前一样循环整个.

```lua
sprite:addAnim('player', 'idle', 'BF idle dance', 24, true)

-- 不重复的启动帧：播放 1 2 3 4,然后循环 2 3 4
sprite:addAnim('door', 'open', 'door open', 24, true, 1)
```

### sprite:play(tag, name, forced, start, reverse)

参数：
- `tag`(String)——对象标签
- `name`(String)——动画名称
- `forced`(Bool)——强制重置 [默认 false]
- `start`(Int)——起始帧 [默认 0]
- `reverse`(Bool)——向后播放 [默认 false]

返回：Bool

播放之前注册的动画.v0.7.3 在歌曲中,角色标记为 `boyfriend`和`dad` 和 `gf`,所以每个 `sprite:*` 函数都在它们上工作.以这种方式在角色上开始的动画播放到结束然后空闲舞恢复；唱歌音符仍然打断它,如 Psych Engine 中一样.

```lua
sprite:play('player', 'idle')
sprite:play('player', 'walk', true)

-- 歌曲中的角色
sprite:play('boyfriend', 'hey')
sprite:play('dad', 'singLEFT')
```

### sprite:animOffset(tag, anim, ?x, ?y)
*自 v0.7.2*

参数：
- `tag`(String)——动画精灵(来自 `sprite:anim`)或角色
- `anim`(String | table)——动画名称,或 `name = {x, y}` 的表一次设置多个
- `x`(Number?)——像素偏移；正值将精灵向左移 [默认 0]
- `y`(Number?)——像素偏移；正值将精灵向上移 [默认 0]

返回：Bool

给每个动画自己的偏移,在该动画开始时应用,无论它如何开始.它像 Psych Engine 中的 `addOffset` 一样工作：偏移是绝对的,没有偏移的动画在 `0, 0` 播放.在 `sprite:addAnim` 之前或之后设置它.自 v0.7.4 起,偏移在 `sprite:play`和`sprite:scale`和`sprite:size` 和 `sprite:updateHitbox` 后也会被放回,这些以前会重置它.

```lua
sprite:anim('bf', 'characters/bf', 400, 300)
sprite:addAnim('bf', 'idle', 'BF idle dance', 24, true)
sprite:addAnim('bf', 'left', 'BF NOTE LEFT0', 24, false)

sprite:animOffset('bf', 'left', 12, -6)

sprite:animOffset('bf', {
    idle = {0, 0},
    left = {12, -6},
    right = {-38, -7}
})
```

### 位置和大小

放置和锚定和缩放和剪切精灵,以及设置它碰撞的盒子.

### sprite:position(tag, x, y)

参数：
- `tag`(String)——对象标签
- `x`(Float)——新 X 位置(世界空间)
- `y`(Float)——新 Y 位置(世界空间)

返回：Bool

一次调用将标记的精灵移动到绝对位置(包装 `setPosition`).对于连续运动,优先 `sprite:velocity` 并让引擎积分；用这个做即时吸附.

```lua
sprite:position('player', 400, 300)
```

### sprite:center(tag, axis, target)

参数：
- `tag`(String)——对象标签
- `axis`(String)——`'x'`和`'y'` 或 `'xy'`(两者)[默认 'xy']
- `target`(String?)——居中到另一个对象而不是屏幕的标签

返回：Bool

沿所选轴在屏幕上居中对象(HaxeFlixel 的 `screenCenter`).`'x'`/`'y'`/`'xy'` 选择水平和垂直或两者.在精灵和字母组上工作(居中整个组).传递 `target` 以居中到另一个对象而不是——精灵或文本(当 `letterAnchor` 开启时匹配你看到的文本盒子).

```lua
sprite:add('logo', 'menu/logo')
sprite:center('logo')        -- 两个轴
sprite:center('logo', 'x')   -- 仅水平
sprite:center('glow', 'xy', 'title')   -- 居中在标题文本上
```

### sprite:anchor(tag, x, y, dx, dy)

参数：
- `tag`(String)——对象标签
- `x`(Number)——水平锚点作为视图的分数：`0` = 左边缘,`0.5` = 中心,`1` = 右边缘
- `y`(Number)——垂直锚点：`0` = 顶,`0.5` = 中心,`1` = 底
- `dx`(Number?)——水平锚定后添加的像素偏移(例如 `-20` 从右边缘内缩)[默认 0]
- `dy`(Number?)——垂直锚定后添加的像素偏移 [默认 0]

返回：Bool

将精灵边缘锚定到相机的可见视图,而不是固定世界位置——这是宽屏中 HUD/UI 的修复.每个 `draw()` 精灵被重新放置在 `x`/`y` 作为当前视图矩形的分数(加上 `dx`/`dy` 像素偏移),相对于其第一个相机.由于视图矩形跟踪宽高比扩展(`viewShiftX`)和缩放,锚定元素在调整大小和最大化或超宽显示器上紧贴真实窗口边缘——而硬编码坐标会漂移出屏幕.锚定 UI 通常想要 `scrollFactor` `0`(通过 HUD 相机).用 `sprite:anchorOff` 清除.

```lua
-- 右上角分数,每边内缩 20px
text:add('score', '0', 0, 0)
sprite:camera('score', 'hud')
sprite:anchor('score', 1, 0, -20, 20)

sprite:anchor('logo', 0.5, 0.5)   -- 正中心,任何窗口大小
sprite:anchor('bar',  0, 1, 30, -30)   -- 左下角
```

### sprite:anchorX(tag, x, dx)

参数：
- `tag`(String)——对象标签
- `x`(Number)——屏幕宽度上的位置,从 `0`(左)到 `1`(右)
- `dx`(Number?)——像素偏移 [默认 0]

返回：Bool

将对象水平固定到屏幕的一部分并保持其 Y 不动.窗口大小变化时它留在那里.两个轴都用 `sprite:anchor`.

```lua
sprite:anchorX('healthbar', 1, -40)   -- 右边缘,y 不动
```

### sprite:anchorY(tag, y, dy)

参数：
- `tag`(String)——对象标签
- `y`(Number)——屏幕高度上的位置,从 `0`(顶)到 `1`(底)
- `dy`(Number?)——像素偏移 [默认 0]

返回：Bool

将对象垂直固定并保持其 X 不动.

```lua
sprite:anchorY('ticker', 1, -10)   -- 底边缘,x 不动
```

### sprite:anchorOff(tag)

参数：
- `tag`(String)——对象标签

返回：Bool

移除锚点(两个轴和偏移)；精灵返回普通世界空间定位并停留在锚点最后放置的位置直到移动.

```lua
sprite:anchorOff('score')
```

### sprite:dock(tag, edge)
*自 v0.7.2*

参数：
- `tag`(String)——精灵和文本或组标签
- `edge`(String)——`topleft`和`top`和`topright`和`left`和`center`和`right`和`bottomleft`和`bottom` 或 `bottomright`

返回：Bool

将 UI 对象固定到窗口边缘.照常在 1280×720 中布置 UI,然后停靠每个元素：当窗口比 16:9 更宽(超宽)或相机调整大小时,它保持到该边缘的距离.偏移仅在绘制时应用,所以脚本和补间和 `game:get` 继续使用你的 1280×720 坐标,`input:mouseOver` 跟随绘制位置.在 `hud`/`other` 和用 `camera:add(tag, 'ui')` 添加的相机上工作.替换同一对象上的 `sprite:anchor`.

```lua
text:add('score', '0', 1100, 20)
sprite:camera('score', 'ui')
sprite:dock('score', 'topright')

sprite:add('hpBar', 'ui/bar', 40, 640)
sprite:camera('hpBar', 'ui')
sprite:dock('hpBar', 'bottomleft')
```

### sprite:dockShift(tag, ?axis)
*自 v0.7.2*

参数：
- `tag`(String)——停靠对象标签
- `axis`(String?)——`x` 或 `y` [默认 x]

返回：Number

`sprite:dock` 当前在屏幕上移动对象多远,以像素为单位.当你放置停靠本身不移动的东西时加上它,比如跟随停靠标记的音符线.未停靠的对象返回 `0`.

```lua
local x = game:get('marker.x') + sprite:dockShift('marker', 'x')
local y = game:get('marker.y') + sprite:dockShift('marker', 'y')
strum:moveNote(1, 0, x, y)
```

### sprite:undock(tag)
*自 v0.7.2*

参数：
- `tag`(String)——对象标签

返回：Bool

移除 `sprite:dock` 设置的边缘固定.如果对象未停靠则返回 `false`.

```lua
sprite:undock('score')
```

### sprite:scale(tag, x, y, update)

参数：
- `tag`(String)——对象标签
- `x`(Float)——水平缩放乘数
- `y`(Float)——垂直缩放乘数
- `update`(Bool)——如果 `true`,之后调用 `updateHitbox` [默认 false]

返回：Bool

设置精灵的缩放(1 是原始大小).使用 update 时它也会调整命中框大小.

```lua
sprite:scale('logo', 1.5, 1.5)
sprite:scale('logo', 2.0, 2.0, true)
```

### sprite:size(tag, width, height, ?update)
*自 v0.6.7*

参数：
- `tag`(String)——对象标签
- `width`(Float)——目标宽度(像素).0(或负)保持宽高比,改为基于 `height` 调整大小.
- `height`(Float)——目标高度(像素).0(或负)保持宽高比,改为基于 `width` 调整大小.
- `update`(Bool?)——之后调用 `updateHitbox`,使命中框立即匹配新大小.[默认 true]

返回：Bool

直接设置精灵显示的像素大小,而不是缩放乘数——当你知道屏幕上想要的大小但不知道源图像自身尺寸时很有用.内部这仍然只是缩放(`width / 图像宽度`),所以与读取 `sprite:scale` 的其他一切正常组合；它是设置它更方便的方式,而不是不同的机制.与 `sprite:scale` 不同,这里 `update` 默认为 `true`,因为设置显式大小通常是一次性调用,不是你想跳过命中框刷新的东西.在文本上它调整文本框大小而不是拉伸字母,像在 Figma 中调整文本层大小：宽度换行和对齐文本,高度是 `text:align` 的垂直选项放置它的地方.`0` 保持该侧自动.

```lua
-- 无论源图像如何的精确大小
sprite:size('icon', 64, 64)

-- 保持宽高比,仅基于宽度调整大小
sprite:size('banner', 400, 0)
```

### sprite:skew(tag, skewX, skewY)
*自 v0.6.2*

参数：
- `tag`(String)——用 `sprite:addSkewed` 创建的标签
- `skewX`(Float)——水平剪切,度,钳制到 ±89
- `skewY`(Float?)——垂直剪切,度,钳制到 ±89 [默认与 skewX 相同]

返回：Bool

沿每个轴倾斜精灵：正的 `skewX` 使它倾斜,适合平行四边形 UI 面板或假透视.`0, 0` 移除它.仅在用 `sprite:addSkewed` 制作的标签上工作.

```lua
sprite:skew('card', 12)        -- 两个轴 12 度
sprite:skew('card', 12, -4)    -- 每轴不同
sprite:skew('card', 0, 0)      -- 回到正常
```

### sprite:getSkew(tag)
*自 v0.6.2*

参数：
- `tag`(String)——用 `sprite:addSkewed` 制作的标签

返回：Table

当前倾斜作为 `{x, y}`,度.

```lua
local s = sprite:getSkew('card')
sprite:skew('card', s.x + 1, s.y)
```

### sprite:updateHitbox(tag)

参数：
- `tag`(String)——对象标签

返回：Bool

在手动重新缩放后重新计算命中框.

```lua
sprite:updateHitbox('logo')
```

### sprite:hitbox(tag, x, y, w, h)

参数：
- `tag`(String)——对象标签
- `x`(Float)——精灵内的水平偏移
- `y`(Float)——精灵内的垂直偏移
- `w`(Float)——命中框宽度
- `h`(Float)——命中框高度

返回：Bool

设置自定义命中框(`offset` + `setSize`).

```lua
sprite:hitbox('player', 20, 30, 80, 120)
```

### 颜色和描边和裁剪

着色和填充和描边和遮罩或裁剪精灵,并使它闪烁.

### sprite:color(tag, color, alpha)

参数：
- `tag`(String)——对象标签
- `color`(String)——十六进制颜色——接受 `RRGGBB`和`0xRRGGBB` 或 `#RRGGBB`
- `alpha`(Number?)——可选 alpha `0`..`1`；省略 = 不变 [默认不变]

返回：Bool

直接设置精灵的 `color`(乘法色调)——`game:set('tag.color', hex)` 的简写,同一调用中带可选 alpha.`'FFFFFF'` 恢复原始颜色.

```lua
sprite:color('logo', 'FFD24A')
sprite:color('ghost', '88CCFF', 0.5)
```

### sprite:fill(tag, c)

参数：
- `tag`(String)——精灵标签
- `c`(String)——十六进制颜色——`RRGGBB`和`0xRRGGBB` 或 `#RRGGBB`

返回：Bool

用颜色 `c` 的实心矩形替换精灵的图形,大小与当前帧相同.与 `sprite:color`(现有图像上的色调)不同,这会丢弃像素——将任何加载的精灵变成平面块,或重新着色 `sprite:rec` 占位符.动画帧丢失.

```lua
sprite:add('panel', 'ui/box')
sprite:fill('panel', '101020')   -- 相同大小,现在是实心板
```

### sprite:antialiasing(tag, on)

参数：
- `tag`(String)——对象标签(精灵和背景和网格和文本)
- `on`(Bool?)——`true` = 平滑(双线性)采样,`false` = 清晰/像素化 [默认 true]

返回：Bool

每精灵平滑覆盖.全局 `spriteAntialiasing` 默认为 false,所以代码中缩放的精灵(例如艺术以 1.2× 导出然后缩小)渲染时有锯齿最近邻边缘——仅为该精灵在这里打开平滑,或用 `game:set('spriteAntialiasing', true)` 全局打开.每精灵值在之后的全局切换中存活.

```lua
sprite:add('logo', 'ui/logo')
sprite:scale('logo', 0.833, 0.833, true)   -- 1.2x 导出回 1x
sprite:antialiasing('logo', true)           -- 平滑重采样
```

### sprite:outline(tag, color, size)

参数：
- `tag`(String)——对象标签
- `color`(String)——十六进制描边颜色 [默认黑色]
- `size`(Number)——描边厚度(像素)；`0` 移除描边 [默认 1]

返回：Bool

通过着色器向精灵添加描边.对于有透明度的精灵(角色 PNG),它追踪轮廓——帧需要几像素透明边距,以便描边有空间.对于实心形状(`sprite:rec` 矩形),它改为沿边缘绘制内边框.采样 16 个方向 × 3 步,所以厚描边保持实心环无孔.`size = 0` 清除它.设置精灵的着色器,所以不能与同一精灵上的另一个着色器组合(冲突时记录警告).

```lua
sprite:add('hero', 'char/hero')
sprite:outline('hero', '000000', 2)
-- sprite:outline('hero', nil, 0)  -- 移除
```

### sprite:outlineGradient(tag, colorA, colorB, size, angle, rotateSpeed, offset)

参数：
- `tag`(String)——对象标签
- `colorA`(String)——渐变起始颜色(十六进制)
- `colorB`(String)——渐变结束颜色(十六进制)
- `size`(Number?)——描边厚度(px)；`0` 移除 [默认 1]
- `angle`(Number?)——渐变方向(度)[默认 0]
- `rotateSpeed`(Number?)——每秒旋转渐变方向的度数；`0` = 静态 [默认 0]
- `offset`(Number?)——沿其轴移动渐变(-1..1)[默认 0]

返回：Bool

相同的轮廓描边,但用两色渐变横跨精灵着色——渐变方向可以通过 `rotateSpeed` 连续旋转,产生闪烁的环.`offset` 移动混合点.

```lua
sprite:outlineGradient('hero', 'FF3355', '33AAFF', 3, 0, 90)   -- 旋转红->蓝环
sprite:outlineGradient('hero', 'FFD700', 'FF8800', 2, 45)      -- 静态对角金
```

### sprite:mask(tag, maskTag, ?invert)
*自 v0.6.7*

参数：
- `tag`(String)——要遮罩的对象标签——必须已存在
- `maskTag`(String)——另一个精灵/背景的标签,其自身图像提供遮罩形状.其 alpha 决定什么透出：不透明遮罩像素显示 `tag`,透明像素隐藏它.
- `invert`(Bool)——默认 `false`.当 `true` 时翻转——`tag` 通过遮罩的透明像素显示.[可选]

返回：Bool

用 `maskTag` 的自身图像在世界空间中采样遮罩 `tag`——无论遮罩精灵当前坐在哪里和当前多大.由于遮罩是普通标记精灵,用 `tw:*`/`sprite:position`/`sprite:scale` 动画它以驱动擦除或显示效果；遮罩区域每帧更新以跟踪它.遮罩精灵本身像任何其他精灵一样保持可见和可交互——用 `game:set(maskTag..'.visible', false)` 隐藏它,如果你只想要效果.也在背景上工作,遮罩可以位于与被遮罩精灵不同的相机上(包括缩放和抖动和相机滤镜)：`sprite:mask('dots', 'panel', true)` 在高相机上的面板下隐藏平铺背景.两个精灵上的旋转尚未考虑.使用着色器,所以需要硬件(瓦片)渲染,与 `shader:*` 系列其余部分相同.

```lua
sprite:add('photo', 'ui/photo', 100, 100)
sprite:add('splat', 'fx/splat', 100, 100); game:set('splat.visible', false)

sprite:mask('photo', 'splat')

-- 动画遮罩精灵以将照片擦入视图
sprite:scale('splat', 0.1, 0.1, true)
tw:scale('reveal', 'splat', {1.4, 1.4}, 0.6, 'expoOut')
```

### sprite:unmask(tag)
*自 v0.6.7*

参数：
- `tag`(String)——当前被 `sprite:mask` 遮罩的对象标签

返回：Bool

移除用 `sprite:mask` 应用的遮罩,恢复 `tag` 的正常全 alpha.如果 `tag` 未被遮罩则无操作(仍返回 `true`).

```lua
sprite:unmask('photo')
```

### sprite:clipRect(tag, x, y, w, h)

参数：
- `tag`(String)——精灵标签
- `x`(Number)——裁剪左,本地精灵坐标(不是世界)
- `y`(Number)——裁剪顶,本地精灵坐标
- `w`(Number)——裁剪宽度(像素,必须 > 0)
- `h`(Number)——裁剪高度(像素,必须 > 0)

返回：Bool

裁剪精灵绘制的部分——矩形外的任何东西不可见,但精灵仍占据完整边界用于布局和碰撞.坐标相对于精灵的左上角,所以 `(0, 0, w/2, h)` 只显示左半.重用同一个池化 `FlxRect`,所以从补间每帧驱动是安全的.

```lua
sprite:rec('bar', 20, 20, 200, 16, 'FF4444')

-- 通过滑动裁剪矩形的宽度显示条
local pct = 0.5
sprite:clipRect('bar', 0, 0, 200 * pct, 16)
```

### sprite:clearClipRect(tag)

参数：
- `tag`(String)——精灵标签

返回：Bool

移除任何裁剪并将池化 `FlxRect` 返回给 Flixel 的分配器.精灵再次正常渲染.如果未设置裁剪则无操作.

```lua
sprite:clearClipRect('bar')
```

### sprite:clipRound(tag, x, y, w, h, radius)
*自 v0.7.5*

参数：
- `tag`(String)——精灵和背景或文本标签
- `x`(Number)——可见区域左边缘,世界坐标
- `y`(Number)——可见区域顶边缘,世界坐标
- `w`(Number)——可见区域宽度
- `h`(Number)——可见区域高度
- `radius`(Number?)——圆角半径 [默认 0]

返回：Bool

仅显示对象在圆角矩形内的部分；外面的一切以平滑边缘切掉.与 `sprite:clipRect` 不同,区域放置在世界中,不是图片内部,所以它在平铺背景上工作,并在对象移动或滚动时保持原位.使用对象的着色器槽,所以它替换同一对象上的另一个 `shader:*` 效果.用 `sprite:clearClipRect` 移除它.打开 `debug:clipBoxes()` 查看区域.

```lua
backdrop:add('stripes', 'menu/stripes', 'xy')
sprite:clipRound('stripes', 300, 150, 680, 420, 24)   -- 仅在圆角面板内
sprite:clearClipRect('stripes')                       -- 移除
```

### sprite:clipTo(tag, target, radius, inset)
*自 v0.7.5*

参数：
- `tag`(String)——要裁剪的精灵和背景或文本标签
- `target`(String)——其盒子成为可见区域的对象,像板或面板
- `radius`(Number?)——圆角半径 [默认 0]
- `inset`(Number?)——从每边向内缩小区域,例如保持在板的轮廓内 [默认 0]

返回：Bool

像 `sprite:clipRound`,但区域每帧跟随另一个对象：移动和缩放或补间板,被裁剪的内容跟随它.两个对象可以在不同的相机上.用 `sprite:clearClipRect` 移除它.

```lua
sprite:add('board', 'menu/board')
backdrop:add('pattern', 'menu/pattern', 'xy')
sprite:clipTo('pattern', 'board', 20, 6)   -- 图案仅在板内,距其边缘 6 px
```

### sprite:flicker(tag, ?speed, ?min, ?max, ?seed)
*自 v0.6.7*

参数：
- `tag`(String)——对象标签——也在文本/数字显示上工作,因为 `text:*` 对象底层是精灵
- `speed`(Number?)——它摆动的速度 [默认 2]
- `min`(Number?)——它降到的最低 alpha [默认 0.3]
- `max`(Number?)——它达到的最高 alpha [默认 1.0]
- `seed`(Number?)——相位偏移,使多个闪烁精灵不同步摆动.每次调用随机,除非给出.[可选]

返回：Bool

使用 `util:flicker` 连续摆动精灵的 `alpha`——有机的蜡烛/霓虹灯亮度闪烁,不是干净的开/关切换.在同一标签上再次调用只更新运行中闪烁的参数而不是重启它.用 `sprite:stopFlicker` 停止,保持 alpha 在 `max`.

```lua
-- 闪烁的火炬
sprite:flicker('torch', 3, 0.5, 1.0)

-- 警告灯,更极端的范围
sprite:flicker('alarmLight', 6, 0, 1)

-- 停止它
sprite:stopFlicker('torch')
```

### sprite:stopFlicker(tag)
*自 v0.6.7*

参数：
- `tag`(String)——对象标签

返回：Bool

停止 `sprite:flicker` 并将 alpha 设置到该闪烁的 `max`.

```lua
sprite:stopFlicker('torch')
```

### sprite:isFlickering(tag)
*自 v0.6.7*

参数：
- `tag`(String)——对象标签

返回：Bool

精灵闪烁期间为 `true`.用它避免重启已经在运行的闪烁.

```lua
if not sprite:isFlickering('torch') then
    sprite:flicker('torch', 3, 0.5, 1.0)
end
```

### 绘制顺序和相机

哪个精灵绘制在顶部和哪个相机显示它,以及它如何随视图移动.

### sprite:priority(tag, priority)

参数：
- `tag`(String)——对象标签
- `priority`(Int | String)——桶——int(`0`/`1`/`2`)或字符串别名.字符串匹配不区分大小写；未知值返回 `false` 并保持精灵不动.[默认 0]

返回：Bool

按 int 或不区分大小写的字符串别名在三个层桶之间移动精灵：

| Int | 字符串别名 |
|---|---|
| `0` | `'back'`和`'bottom'`和`'bg'` |
| `1` | `'middle'`和`'mid'`和`'center'` |
| `2` | `'front'`和`'top'`和`'fg'` |

```lua
sprite:priority('logo', 2)         -- 到前面
sprite:priority('box', 'back')     -- 到后面
sprite:priority('hud', 'FRONT')    -- 不区分大小写
```

### sprite:getPriority(tag)

参数：
- `tag`(String)——对象标签

返回：Int

返回精灵当前桶作为 int(`0`和`1` 或 `2`)——用于复制另一个精灵的层放置.如果标签未知则返回 `-1`.从精灵的绘制索引派生：`0` → 后,最后索引 → 前,中间任何 → 中.

```lua
local p = sprite:getPriority('logo')
sprite:priority('shadow', p)  -- 匹配 logo 的桶
```

### sprite:order(tag, order)

参数：
- `tag`(String)——对象标签
- `order`(Int)——目标索引(钳制到范围)

返回：Bool

将精灵移动到状态成员列表中的特定索引.与 `sprite:getOrder` 配对以相对于另一个放置一个精灵.

```lua
sprite:order('player', 5)

-- 相对放置
sprite:order('shadow', sprite:getOrder('player') - 1)  -- 就在 player 后面
sprite:order('aura',   sprite:getOrder('player') + 1)  -- 就在 player 前面
```

### sprite:getOrder(tag)

参数：
- `tag`(String)——对象标签

返回：Int

返回精灵在状态成员列表中的当前索引.如果标签未知则返回 `-1`.索引是快照——在读取和写入之间重新排序其他精灵可能使其无效.

```lua
local i = sprite:getOrder('logo')
print(i)                         -- 例如 4
sprite:order('player', i)        -- 将 player 放在 logo 所在位置
```

### sprite:camera(tag, cam)

参数：
- `tag`(String)——对象标签
- `cam`(String)——相机名称：`'game'`和`'hud'`和`'other'` [默认 'game']

返回：Bool

将精灵重新分配给命名相机.

```lua
sprite:camera('box', 'hud')
sprite:camera('logo', 'other')
sprite:camera('player', 'game')
```

### sprite:onScreen(tag, cam, fullyInside)

参数：
- `tag`(String)——对象标签
- `cam`(String)——测试的相机名称：`'game'`和`'hud'`和`'other'` [默认 'game']
- `fullyInside`(Bool)——如果 `true`,要求精灵完全在视图内；否则任何重叠都算 [默认 false]

返回：Bool

当用户实际能在给定相机上看到精灵时返回 `true`.首先检查精灵是否根本能绘制(存在和`visible`和`alpha > 0`和相机未隐藏和精灵的 `cameras` 过滤器包含这个),然后运行边界测试——默认接触边缘,`fullyInside` 为 `true` 时完全包含.严格逆：`camera:offScreen`.用它剔除 AI/动画更新或跳过玩家看不到的演员的 VFX.

```lua
if sprite:onScreen('enemy') then
    updateEnemyAI()
end

if sprite:onScreen('banner', 'hud', true) then
    -- 整个横幅在 HUD 视图内
end
```

### sprite:parallax(tag, amount, opts)
*自 v0.6.5*

参数：
- `tag`(String)——精灵标签
- `amount`(Float)——鼠标到达屏幕边缘时的最大漂移(px)(鼠标在中心 = 无偏移).除非设置 `opts.y`,否则用于两个轴.`0` 关闭它
- `opts`(Table)——`{ y, smooth = 0.9, invert = false, clamp = false }`——见下文 [可选]

返回：Bool

使精灵每帧随鼠标漂移——便宜的视差/"活菜单"效果.应用为精灵已有位置周围的平滑偏移,所以它与 `sprite:center`和`sprite:scale`和补间和你自己的 `game:set` 位置写入组合——无需管理原始位置.再次调用以重新调整；用 `sprite:parallax(tag, 0)` 或 `sprite:parallaxOff` 停止(弹回真实位置).状态切换时清除.给更近的层更大的 `amount` 以获得深度.

opts

- `y` Float——单独的垂直量(默认为 `amount`).`{ y = 0 }` = 仅水平.

- `smooth` 0–1,默认 0.9——它跟随的松散程度.`0` = 粘在光标上；`0.9` = 轻柔漂移；`0.97` = 沉重/飘浮.帧率无关.(`speed` 仍作为遗留别名工作.)

- `invert` Bool——向光标漂移而不是远离.

- `clamp` Bool——在精灵的屏幕外余量处停止偏移,使背景永远不会露出边缘.没有它,`amount` 大于精灵有空间移动的量会记录警告.

```lua
sprite:parallax('bg', 14, { clamp = true })       -- 背景：永不露出边缘
sprite:parallax('logo', 24, { smooth = 0.85 })    -- 前景,稍微更灵敏
sprite:parallax('cursorDot', 40, { smooth = 0 })  -- 粘在鼠标上
sprite:parallax('clouds', 30, { invert = true })  -- 向光标漂移
sprite:parallax('hudRow', 6, { y = 0 })           -- 仅水平
```

### sprite:parallaxOff(tag)
*自 v0.6.5*

参数：
- `tag`(String)——精灵标签

返回：Bool

停止精灵上的鼠标视差并将其恢复到真实(未偏移)位置.与 `sprite:parallax(tag, 0)` 相同.

```lua
sprite:parallaxOff('bg')
```

### order:* 命名空间

`sprite:order` / `sprite:getOrder` 只解析通过 `sprite:add` 添加的标签.少数引擎拥有的对象也被标记,但不是 `FlxSprite`——`'notes'`(下落音符)和`'holds'`(长条尾部)和接收器,可以在任一名称下到达：`'playerStrums'` / `'opponentStrums'`(匹配 game:get 名称)或 `'playerReceptors'` / `'opponentReceptors'`——同一对象,哪个在脚本中读起来更清楚.到达这些需要一个不是仅精灵的解析器.`order:get` / `order:set` 就是那个：相同的操作,在其自己的命名空间下,在精灵标签或这些内置项之一上工作.

### order:get(tag)
*自 v0.6.3*

参数：
- `tag`(String)——对象标签——你添加的精灵,或内置项：'notes'和'holds'和'playerStrums'/'playerReceptors'和'opponentStrums'/'opponentReceptors'

返回：Int

返回标签在状态成员列表中的当前索引,如果未知则 `-1`(内置项仅在歌曲内解析).与 `sprite:getOrder` 为普通精灵标签给出的值相同.

```lua
print(order:get('notes'))  -- 例如 12,仅在歌曲中有效
```

### order:set(tag, index)
*自 v0.6.3*

参数：
- `tag`(String)——对象标签——你添加的精灵,或内置项：'notes'和'holds'和'playerStrums'/'playerReceptors'和'opponentStrums'/'opponentReceptors'
- `index`(Int)——目标索引(钳制到范围)

返回：Bool

将标签移动到状态成员列表中的特定索引——与 `sprite:order` 相同,但也可以定位上述内置项.绘制顺序跨相机共享：成员的索引决定它何时绘制,无论它在哪个相机上.

```lua
sprite:add('backdrop', 'ui/panel', 0, 0)
sprite:camera('backdrop', 'hud')
order:set('backdrop', order:get('notes'))  -- 就在下落音符后面绘制,在 hud 相机上
```

### 运动和碰撞

速度和重力和阻力,以及精灵之间重叠和距离的检查.

### sprite:velocity(tag, x, y)

参数：
- `tag`(String)——对象标签
- `x`(Number)——水平速度(px/秒)
- `y`(Number)——垂直速度(px/秒)

返回：Bool

设置精灵的速度.引擎每帧自动积分位置,所以设置一次而不是每帧重新应用 `game:set('tag.x', …)`.

```lua
sprite:velocity('coin', 0, -120)   -- 向上漂移
```

### sprite:acceleration(tag, x, y)

参数：
- `tag`(String)——对象标签
- `x`(Number)——水平加速度(px/秒²)
- `y`(Number)——垂直加速度(px/秒²)

返回：Bool

设置每帧应用于精灵速度的连续加速度.

```lua
sprite:acceleration('ball', 0, 600)
```

### sprite:gravity(tag, g)

参数：
- `tag`(String)——对象标签
- `g`(Number)——向下加速度(px/秒²)；负值向上浮

返回：Bool

`acceleration.y` 的简写.与 `sprite:velocity` 组合用于跳跃,与 `sprite:maxVelocity` 组合以限制下落速度.自 v0.7.7 起移动以小的步骤(1/120 秒)计算,所以跳跃在任何帧率下都达到相同高度,设置在 maxVelocity 以上的速度立即被钳制而不是在第一次帧后.`game:set('physicsStep', 0)` 关闭步骤.

```lua
sprite:gravity('player', 900)
sprite:velocity('player', 0, -400)   -- 跳跃冲量
```

### sprite:maxVelocity(tag, x, y)

参数：
- `tag`(String)——对象标签
- `x`(Number)——最大水平速度(px/秒)；0 = 无上限
- `y`(Number)——最大垂直速度(px/秒)；0 = 无上限

返回：Bool

限制精灵在每个轴上移动的速度——例如终端下落速度.

```lua
sprite:maxVelocity('player', 300, 1200)
```

### sprite:angularVelocity(tag, degrees)
*自 v0.7.7*

参数：
- `tag`(String)——精灵标签
- `degrees`(Number)——每秒旋转度数,负值向左转

返回：Bool

让精灵自行旋转.像速度一样工作,但用于角度.

```lua
sprite:angularVelocity('coin', 360)
```

### sprite:angularAcceleration(tag, degrees)
*自 v0.7.7*

参数：
- `tag`(String)——精灵标签
- `degrees`(Number)——每秒旋转速度的变化

返回：Bool

随时间加速或减慢旋转.

```lua
sprite:angularAcceleration('wheel', 90)
```

### sprite:angularDrag(tag, degrees)
*自 v0.7.7*

参数：
- `tag`(String)——精灵标签
- `degrees`(Number)——没有角加速度时旋转每秒减慢多少

返回：Bool

让旋转自行减速.

```lua
sprite:angularVelocity('top', 720)
sprite:angularDrag('top', 200)
```

### sprite:maxAngular(tag, degrees)
*自 v0.7.7*

参数：
- `tag`(String)——精灵标签
- `degrees`(Number)——最高旋转速度.`0` 表示无限制

返回：Bool

限制旋转速度.

```lua
sprite:maxAngular('wheel', 540)
```

### sprite:drag(tag, x, y)

参数：
- `tag`(String)——对象标签
- `x`(Number)——水平减速度(px/秒²)
- `y`(Number)——垂直减速度(px/秒²)

返回：Bool

当没有加速度作用于该轴时应用的被动减速度——摩擦.让精灵在将输入归零后滑行到停止.

```lua
sprite:drag('player', 800, 0)
```

### sprite:immovable(tag, value)

参数：
- `tag`(String)——对象标签
- `value`(Bool)——`true` = 碰撞时不被推动 [默认 true]

返回：Bool

将精灵标记为不可移动,所以 `sprite:collide` 只推动另一个对象.在墙和块和地面上设置它.

```lua
sprite:immovable('block1')
```

### sprite:collide(tag1, tag2)

参数：
- `tag1`(String)——第一个对象标签
- `tag2`(String)——第二个对象标签

返回：Bool

分离两个重叠对象(HaxeFlixel 的 `FlxG.collide`),如果它们接触则返回 `true`.尊重 `immovable` 和速度——实心平台的基础.在 `onUpdate` 中每帧调用.

```lua
sprite:immovable('floor')
if sprite:collide('player', 'floor') then
  -- 落地
end
```

### sprite:overlap(tag1, tag2, pixel, alphaTolerance)

参数：
- `tag1`(String)——第一个对象标签
- `tag2`(String)——第二个对象标签.省略(或传递空)进行光标悬停测试.传递 `'camera.<tag>'`(或 `'cam.<tag>'`)以针对该特定相机进行悬停测试,而不是 `tag1` 自己的 [可选——回退到光标悬停]
- `pixel`(Bool)——当 `true` 时,对精灵的实际非透明像素(当前动画帧)进行像素完美测试,而不是它们的边界框 [默认 false]
- `alphaTolerance`(Int)——仅在 `pixel` 为 `true` 时使用：像素 alpha ≥ 此值(`1`–`255`)时算作实心.`1` 追踪完整可见轮廓；`255` 要求完全不透明像素.[默认 1]

返回：Bool

当两个精灵重叠时返回 `true`.如果省略 `tag2`(或空),则测试鼠标悬停 `tag1` 代替——光标通过 `tag1` 自己的相机转换为世界空间,所以即使精灵住在非活动相机上(HUD/制作叠加层和小地图和滚动或缩放的世界相机),悬停也对齐.要改为针对特定相机测试,传递其标签作为 `tag2` 并带 `camera.`(或 `cam.`)前缀——例如 `sprite:overlap('button', 'camera.maker')`.

默认测试是快速边界框检查.传递 `pixel = true` 进行像素完美检查：它首先做便宜的盒子测试,然后比较重叠区域的实际像素(在旋转和缩放和动画精灵上工作,当前帧)——更重,所以保留给冲击时刻(命中和精确拾取),而不是每帧数百对.

注意：这只是检测——`sprite:collide`(物理分离)总是使用边界框,因为 Flixel 没有每像素碰撞响应.用 `sprite:hitbox` 缩小盒子以获得更紧的实心.

```lua
-- 边界框(默认,快速)
if sprite:overlap('logo', 'player') then
    print('boxes overlap')
end

-- 像素完美：仅在可见艺术实际接触时触发
if sprite:overlap('sword', 'enemy', true) then
    onHit()
end

-- 要求接近不透明像素(忽略微弱的抗锯齿边缘)
if sprite:overlap('sword', 'enemy', true, 200) then ... end

-- 像素完美光标悬停(仅在绘制形状上,不在盒子上)
if sprite:overlap('button', '', true) then ... end

-- 针对特定相机测试悬停(在 'maker' 叠加层上的 UI)
if sprite:overlap('button', 'camera.maker') then ... end
```

### sprite:inside(tag1, tag2)

参数：
- `tag1`(String)——内部对象标签
- `tag2`(String)——外部对象标签

返回：Bool

当对象 1 完全包含在对象 2 的边界内(不只是重叠)时返回 `true`.部分重叠使用 `sprite:overlap`.

```lua
if sprite:inside('player', 'safezone') then ... end
```

### sprite:touching(tag, dir)

参数：
- `tag`(String)——精灵标签
- `dir`(String?)——测试方向：`left`和`right`和`up`/`ceiling`和`down`/`floor`和`wall`(左|右)或 `any`(默认)

返回：Bool

从上一次碰撞传递中读取 `FlxObject.touching`.如果精灵在此帧或上一帧在请求侧接触则返回 `true`——`wasTouching` 宽限覆盖 Flixel 分离创建的一帧间隙,所以玩家顶着墙持有时它保持稳定.在同一 `onUpdate` 滴答中的 `sprite:collide` 之后调用.

```lua
for _, w in ipairs(group:get('walls')) do sprite:collide('player', w) end

local ax = 0
if input:get('D') and not sprite:touching('player', 'right') then ax = SPEED end
if input:get('A') and not sprite:touching('player', 'left')  then ax = -SPEED end
sprite:acceleration('player', ax, GRAVITY)
```

### sprite:distance(tag1, tag2)

参数：
- `tag1`(String)——第一个对象标签
- `tag2`(String)——第二个对象标签

返回：Number

两个对象中心之间的像素距离.如果任一标签缺失则返回 `-1`.

```lua
if sprite:distance('player', 'enemy') < 64 then ... end
```

### 形状和线条

本页每个函数都贯穿一对共享参数：`filled`(默认 `true`)绘制实心形状；设为 `false` 只绘制轮廓——圆环而不是圆盘,空心三角形而不是实心——然后 `thickness` 设置该轮廓的宽度(填充时忽略).每个形状将自身精灵紧贴在其绘制内容周围(加上轮廓的一点填充),所以 `sprite:position`/补间将整个形状作为一个整体移动,与 `sprite:rec`/`sprite:line` 相同.

始终清晰 v0.7.7.形状在显示更大时以更高分辨率重绘自身：`sprite:scale`和缩放相机或大窗口.它的大小和命中框和位置保持不变,所以脚本中没有任何变化.

### sprite:rec(tag, x, y, w, h, c, priority)

参数：
- `tag`(String)——对象标签
- `x`(Float)——X 位置
- `y`(Float)——Y 位置
- `w`(Float)——宽度
- `h`(Float)——高度
- `c`(String)——十六进制颜色(例如 `'FF6699'`)[默认白色]
- `priority`(String|Number?)——绘制层：`'back'`和`'middle'`和`'front'` 或数字.省略以绘制在顶部 [可选]

返回：Bool

创建实心颜色矩形精灵.

```lua
sprite:rec('box', 100, 100, 120, 80, 'FF6699')
```

### sprite:gradient(tag, x, y, w, h, colors, angle, chunkSize, interpolate, priority)
*自 v0.6.2*

参数：
- `tag`(String)——对象标签
- `x`(Float)——X 位置
- `y`(Float)——Y 位置
- `w`(Int)——宽度
- `h`(Int)——高度
- `colors`(Table)——要循环的十六进制颜色字符串,例如 `{'FF6699', '6699FF'}`——2+ 在它们之间混合,1 只是实心填充
- `angle`(Int?)——方向(度).90 = 从上到下,180 = 从左到右,任何角度都工作 [默认 90]
- `chunkSize`(Int?)——色带高度(px)用于厚重/复古带状外观而不是平滑混合.1 = 平滑 [默认 1]
- `interpolate`(Bool?)——true 在 RGB 空间混合,false 在线性 RGB 中(略有不同和有时更浑浊的曲线)[默认 true]
- `priority`(String|Number?)——绘制层：`'back'`和`'middle'`和`'front'` 或数字.省略以绘制在顶部 [可选]

返回：Bool

创建用两个或更多颜色之间的线性渐变填充的精灵——快速获得背景面板和淡出条或 UI 点缀而无需手工制作图像的方式.除此之外像 `sprite:rec` 一样工作(相同的标签/分层规则,创建后相同的命中框/颜色/着色器支持).

```lua
sprite:gradient('panel', 0, 0, 1280, 200, {'1B1B2F', '3A3F5C'})

-- 三个停止点,每 8px 带状以获得复古外观
sprite:gradient('stripe', 0, 640, 1280, 40, {'FF6699', 'FFCC66', '66CCFF'}, 180, 8)
```

### sprite:line(tag, x1, y1, x2, y2, c, thickness)

参数：
- `tag`(String)——对象标签
- `x1`(Float)——起点 X(世界空间)
- `y1`(Float)——起点 Y(世界空间)
- `x2`(Float)——终点 X(世界空间)
- `y2`(Float)——终点 Y(世界空间)
- `c`(String)——十六进制颜色(例如 `'FF6699'`)[默认白色]
- `thickness`(Number)——线宽(像素)[默认 1]

返回：Bool

创建在两个世界空间点之间绘制直线的精灵,大小与线的边界框相同(加上厚度填充)——用 `sprite:position` 移动它移动整条线.厚度必须大于 0.

```lua
sprite:line('beam', 100, 100, 300, 180, 'FF6699', 3)
```

### sprite:circle(tag, x, y, radius, c, filled, thickness)
*自 v0.6.4*

参数：
- `tag`(String)——对象标签
- `x`(Float)——中心 X
- `y`(Float)——中心 Y
- `radius`(Float)——半径(像素)
- `c`(String)——十六进制颜色(例如 `'FF6699'`)[默认白色]
- `filled`(Bool?)——false 绘制圆环而不是实心圆盘 [默认 true]
- `thickness`(Float?)——圆环宽度(像素)——仅在 filled 为 false 时使用 [默认 2]
- `priority`(Int|String?)——层桶('back'/'middle'/'front' 或数字)——见 sprite:priority [默认 0]

返回：Bool

创建圆或圆环精灵,以 (x, y) 为中心.

```lua
sprite:circle('dot', 200, 200, 30, 'FF6699')            -- 填充
sprite:circle('ring', 300, 200, 30, '66CCFF', false, 4)  -- 仅圆环
```

### sprite:ellipse(tag, x, y, w, h, c, filled, thickness)
*自 v0.6.4*

参数：
- `tag`(String)——对象标签
- `x`(Float)——中心 X
- `y`(Float)——中心 Y
- `w`(Float)——全宽
- `h`(Float)——全高
- `c`(String)——十六进制颜色 [默认白色]
- `filled`(Bool?)——false 只绘制轮廓 [默认 true]
- `thickness`(Float?)——轮廓宽度(像素)——仅在 filled 为 false 时使用 [默认 2]
- `priority`(Int|String?)——层桶——见 sprite:priority [默认 0]

返回：Bool

创建椭圆或环椭圆精灵,以 (x, y) 为中心.圆就是 w == h 的椭圆——用 `sprite:circle` 那个,少一个参数.

```lua
sprite:ellipse('badge', 200, 200, 140, 80, 'FFCC66')
```

### sprite:triangle(tag, x, y, size, c, filled, thickness)
*自 v0.6.4*

参数：
- `tag`(String)——对象标签
- `x`(Float)——三角形边界框的中心 X
- `y`(Float)——三角形边界框的中心 Y
- `size`(Float)——边界框的宽度和高度
- `c`(String)——十六进制颜色 [默认白色]
- `filled`(Bool?)——false 只绘制轮廓 [默认 true]
- `thickness`(Float?)——轮廓宽度(像素)——仅在 filled 为 false 时使用 [默认 2]
- `priority`(Int|String?)——层桶——见 sprite:priority [默认 0]

返回：Bool

创建向上指的等边风格三角形,以 (x, y) 为中心.

```lua
sprite:triangle('warn', 640, 100, 60, 'FFCC00', false, 3)
```

### sprite:roundRect(tag, x, y, w, h, cornerRadius, c, filled, thickness)
*自 v0.6.4*

参数：
- `tag`(String)——对象标签
- `x`(Float)——左上 X
- `y`(Float)——左上 Y
- `w`(Float)——宽度
- `h`(Float)——高度
- `cornerRadius`(Float?)——圆角半径(像素)[默认 8]
- `c`(String)——十六进制颜色 [默认白色]
- `filled`(Bool?)——false 只绘制轮廓 [默认 true]
- `thickness`(Float?)——轮廓宽度(像素)——仅在 filled 为 false 时使用 [默认 2]
- `priority`(Int|String?)——层桶——见 sprite:priority [默认 0]

返回：Bool

创建圆角矩形精灵,像 `sprite:rec` 一样左上定位(后者的尖角版本——`cornerRadius` 为 0 行为相同,但 sprite:rec 对普通矩形更便宜).

```lua
sprite:roundRect('panel', 40, 40, 240, 120, 16, '2C2E3F')
```

### sprite:polygon(tag, points, c, filled, thickness)
*自 v0.6.4*

参数：
- `tag`(String)——对象标签
- `points`(Table)——至少 3 个 `{x, y}` 对的表,世界空间,按顺序
- `c`(String)——十六进制颜色 [默认白色]
- `filled`(Bool?)——false 只绘制轮廓 [默认 true]
- `thickness`(Float?)——轮廓宽度(像素)——仅在 filled 为 false 时使用 [默认 2]
- `priority`(Int|String?)——层桶——见 sprite:priority [默认 0]

返回：Bool

从世界空间点列表创建任意多边形——星形和五边形和箭头,任何有直边的东西.精灵大小与多边形自己的边界框相同,所以无论形状如何都保持紧凑.

```lua
-- 一个菱形
sprite:polygon('gem', {
    {400, 60}, {440, 100}, {400, 140}, {360, 100}
}, '66FFCC')
```

### sprite:shapeQuality(tag, quality)
*自 v0.7.7*

参数：
- `tag`(String)——一个形状：`sprite:circle`和`ellipse`和`triangle`和`roundRect`和`polygon`和`line` 或 `bar:circular`
- `quality`(Float?)——`1`…`4` 保持形状以那么多倍清晰绘制.`0` 让引擎选择 [默认 0]

返回：Bool

设置形状绘制的清晰度.默认情况下,引擎从缩放和相机缩放和窗口大小和 `internalResolution` 中选择,并等待片刻再改变,所以快速增长的形状可能看起来模糊几帧.固定值保持它一直清晰.

```lua
sprite:circle('ring', 640, 360, 40, 'FFFFFF', false, 4)
sprite:shapeQuality('ring', 4)
tw:scale('ringS', 'ring', {6, 6}, 0.6, 'expoOut')
tw:alpha('ringA', 'ring', 0, 0.6, 'linear')
```

### sprite:tint(tag, color, strength)
*自 v0.7.7*

参数：
- `tag`(String)——精灵标签
- `color`(String)——十六进制颜色
- `strength`(Float?)——混合量 `0`…`1` [默认 1]

返回：Bool

与 `color:tint` 相同,也在 `sprite` 下可用.

```lua
sprite:rec('flash', 0, 0, 1280, 720, 'FFFFFF')
sprite:tint('flash', '805D00')
blend:set('flash', 'add')
```

### 轨迹和丝带

跟随精灵的运动轨迹.

### sprite:trail(tag, length, delay, alpha, diff)

参数：
- `tag`(String)——对象标签——要拖尾的精灵.其当前图形/帧用于残影.
- `length`(Int)——轨迹中的残影数 [默认 10]
- `delay`(Int)——每个残影采样之间的帧数——更高 = 更长和更稀疏的轨迹 [默认 3]
- `alpha`(Number)——第一个(最前)残影的不透明度,沿轨迹淡出到 0 [默认 0.4]
- `diff`(Number)——每图像缩放衰减(0–1)；每个残影缩小这个分数 [默认 0.05]

返回：Bool

通过 `FlxTrail` 向标记的精灵附加运动轨迹(残影/回声效果).在精灵后面绘制 `length` 个淡出副本——适合冲刺和投射物和快速角色和道具.按绘制顺序插入精灵后面,跟踪其位置/角度/缩放,并使用其当前外观(包括动画帧).在同一标签上重新调用替换轨迹；移除精灵(`sprite:remove`)或更改状态会自动清除它.

```lua
sprite:anim('player', 'characters/bf')
sprite:trail('player')                 -- 默认回声

sprite:rec('dash', 200, 300, 24, 24, '66CCFF')
sprite:trail('dash', 16, 2, 0.6, 0.04) -- 更长和更亮和更温和的收缩
sprite:velocity('dash', 400, 0)
```

### sprite:trailOff(tag)

参数：
- `tag`(String)——轨迹应被冻结的对象标签

返回：Bool

冻结 `sprite:trail` 的运动轨迹——停止烙印新幽灵图像,但现有副本留在原地而不是立即消失.如果精灵没有轨迹则返回 `false`.重新调用 `sprite:trail(...)` 获得新的；冻结的轨迹在 `sprite:remove` 或状态切换时清除.

```lua
sprite:trailOff('player')
```

### sprite:trailArea(tag, x, y, w, h, alpha, delay)

参数：
- `tag`(String)——对象标签——留下轨迹的精灵
- `x`(Float)——轨迹区域左边缘(世界空间)
- `y`(Float)——轨迹区域顶边缘(世界空间)
- `w`(Float)——区域宽度(像素,精灵必须在此矩形内移动才能留下轨迹)
- `h`(Float)——区域高度(像素)
- `alpha`(Number)——每帧衰减乘数,`0..1`.更高 = 涂抹停留更久(更长的轨迹)；更低 = 快速淡出.`1` 永不淡出.[默认 0.8]
- `delay`(Int)——轨迹捕获之间的帧数——更高留下更厚重和更间隔的轨迹 [默认 2]

返回：Bool

通过 `FlxTrailArea` 向标记的精灵附加涂抹/丝带轨迹(像彗星尾巴或引擎尾气).与 `sprite:trail`——它烙印离散的淡出副本——不同,这将精灵的像素绘制到缓冲区中每帧稍微淡出一点,所以快速移动的精灵留下连续锥形尾巴.在精灵后面绘制,在精灵的相机上.

生活在 `(x, y, w, h)` 世界矩形内——调整大小到精灵旅行的区域(例如你的关卡边界).缓冲区是 `w×h` 位图,所以将矩形保持在游戏区域内,不是巨大的东西.重新调用替换轨迹；`sprite:trailAreaOff(tag)` 移除它,并在 `sprite:remove` 或状态切换时自动清除.

```lua
-- 在 2000x2000 竞技场内移动的飞船的尾气轨迹
sprite:add('ship', 'ships/sun')
sprite:trailArea('ship', 0, 0, 2000, 2000, 0.85, 1)

-- 更短和更灵敏的轨迹
sprite:trailArea('bullet', 0, 0, 1280, 720, 0.6)
```

### sprite:trailAreaOff(tag)

参数：
- `tag`(String)——涂抹轨迹应被移除的对象标签

返回：Bool

移除并销毁之前用 `sprite:trailArea` 附加的涂抹轨迹.如果精灵没有涂抹轨迹则返回 `false`.精灵本身不受影响.

```lua
sprite:trailAreaOff('ship')
```

### sprite:ribbon(tag, width, color, length, tailScale, alpha, ownSprite)
*自 v0.4.0*

参数：
- `tag`(String)——对象标签——丝带跟随的精灵
- `width`(Float)——头部(精灵端)的丝带厚度(像素)[默认 12]
- `color`(String)——丝带的十六进制颜色 [默认白色]
- `length`(Int)——保留的轨迹点数——更长 = 更长的丝带 [默认 20]
- `tailScale`(Float)——尾部的宽度乘数：`0` 锥形到点(彗星条纹外观),`1` 保持恒定宽度 [默认 0]
- `alpha`(Number)——整体不透明度,`0..1` [默认 1]
- `ownSprite`(Bool)——链接生命周期：当 `true` 时,`sprite:ribbonOff` 也移除精灵 [默认 false]

返回：Bool

附加丝带轨迹——一条平滑和锥形的实心颜色条带——在精灵移动时跟随其中心.与 `sprite:trail`(离散幽灵副本)不同,它是单个连续网格,与 `sprite:trailArea` 不同,它不需要世界矩形——只需附加到标签.适合速度条纹和投射物尾部和引擎尾气.在精灵后面绘制,在精灵的相机上.

尾部的淡出来自宽度锥形(`tailScale = 0` 将它缩到无),因为网格使用一个 `alpha` 而不是每点渐变.重新调用替换丝带；`sprite:ribbonOff` 停止其增长,并在 `sprite:remove` 或状态切换时清除.

自 v0.5.3 起,丝带的不透明度每帧乘以精灵的 `alpha`,所以淡出精灵也会淡出其轨迹.传递 `ownSprite = true` 使丝带拥有精灵——移除丝带也移除精灵(见 `ribbonOff`).

```lua
-- 飞船后面的青色速度条纹
sprite:add('ship', 'ships/sun')
sprite:ribbon('ship', 16, '00FFFF', 24, 0, 0.8)

-- 淡出精灵现在会随它淡出轨迹
tween:tween('ship', 'alpha', 0, 1)

-- 一个拥有其轨迹的投射物：杀死丝带,精灵也消失
sprite:ribbon('shot', 12, 'FFEE55', 20, 0, 1, true)
```

### sprite:ribbonBlur(tag, amount)

参数：
- `tag`(String)——有 `sprite:ribbon` 的标签
- `amount`(Float?)——边缘有多柔和,0 清晰到 1 非常柔和 [默认 0.5]

返回：Bool

柔化丝带轨迹的边缘.

```lua
sprite:ribbon('sword', 16, 'AEE6FF')
sprite:ribbonBlur('sword', 0.8)
```

### sprite:ribbonOff(tag, fade)
*自 v0.4.0*

参数：
- `tag`(String)——丝带要移除或冻结的对象标签
- `fade`(Bool)——当 `true` 时,软停止代替：冻结丝带并保留精灵 [默认 false]

返回：Bool

从 `sprite:ribbon` 移除丝带.如果它用 `ownSprite = true` 创建,跟随的精灵也被移除——投射物及其轨迹的一键清理.传递 `fade = true` 改为冻结它：它停止在精灵移动时添加点,已绘制的条带留在原地,精灵继续存在(v0.5.3 之前的行为).如果精灵没有丝带则返回 `false`.移除精灵(`sprite:remove`)或状态切换也总是清除丝带.

```lua
sprite:ribbonOff('ship', true)   -- 冻结,让尾部拖出
sprite:ribbonOff('shot')         -- ownSprite 丝带：也移除精灵
```

### sprite:animFinished(tag)
*自 v0.7.3*

参数：
- `tag`(String)——精灵标签

返回：Bool

当前动画播放完最后一帧后为 `true`.循环动画永不完成.

```lua
if sprite:animFinished('startBtn') then state:change('menu/title') end
```

### sprite:animExists(tag, name)
*自 v0.7.3*

参数：
- `tag`(String)——精灵标签
- `name`(String)——动画名称

返回：Bool

如果精灵有该名称的动画(用 `sprite:addAnim` 添加)则为 `true`.

```lua
if sprite:animExists('press', 'confirm') then sprite:play('press', 'confirm') end
```

### sprite:animName(tag)
*自 v0.7.3*

参数：
- `tag`(String)——精灵标签

返回：String

现在播放的动画名称,如果没有则为 `nil`.

```lua
print(sprite:animName('bf'))
```

### sprite:onAnimEnd(tag, callback)
*自 v0.7.3*

参数：
- `tag`(String)——精灵标签
- `callback`(Function?)——每次非循环动画结束时用动画名称调用.省略以移除回调

返回：Bool

动画结束时运行函数,所以你不必每帧轮询.每个精灵一个回调；设置新的替换旧的.状态切换时清除.

```lua
sprite:play('startBtn', 'pressed', true)
sprite:onAnimEnd('startBtn', function(name)
    if name == 'pressed' then state:change('menu/title') end
end)
```

### sprite:onClick(tag, callback)
*自 v0.7.3*

参数：
- `tag`(String)——精灵标签
- `callback`(Function?)——精灵被点击时用标签调用.省略以移除它

返回：Bool

当鼠标左键在精灵上按下时运行函数.使用与 `input:mouseClicked` 相同的命中测试,所以它尊重精灵的相机和停靠和 `input:block`.状态切换和精灵移除时清除.

```lua
sprite:onClick('playButton', function() state:change('state/freeplay') end)
```

### sprite:onHover(tag, over, out)
*自 v0.7.3*

参数：
- `tag`(String)——精灵标签
- `over`(Function?)——鼠标进入精灵时用标签调用
- `out`(Function?)——鼠标离开时用标签调用

返回：Bool

当鼠标移上移下精灵时运行函数.什么都不传递以移除两者.

```lua
sprite:onHover('playButton',
    function(t) sprite:scale(t, 1.1, 1.1) end,
    function(t) sprite:scale(t, 1, 1) end)
```

---

## 组函数

`group` 命名空间是在精灵之上的第二层标签.精灵保持自己唯一的 `tag`(创建时设置)；在此基础上,你把标签注册到一个或多个命名组中.许多精灵可以共享一个组,一个精灵也可以同时属于多个组.

这是"我的玩家碰到了这些中的哪些？"的答案——把每面墙放进一个 `'walls'` 组,然后 `group:get` 成员标签并用 `sprite:overlap` 对它们做重叠测试.组存储标签,不是精灵句柄,所以任何组结果直接反馈到其他 `sprite:*` 函数.已销毁的精灵会自动从它们的组中修剪(组在每次读取时过滤标签存在性).

### 成员

### group:add(group, tag)

参数：
- `group`(String)——组名(首次使用时创建)
- `tag`(String)——要加入的现有精灵标签

返回：Bool

将标记的精灵添加到一个组,如果组不存在则创建它.重复添加被忽略.如果找不到精灵标签则返回 `false`(并记录错误).

```lua
sprite:rec('wall1', 100, 100, 80, 80, '3399FF')
sprite:rec('wall2', 400, 280, 80, 80, '3399FF')
group:add('walls', 'wall1')
group:add('walls', 'wall2')
```

### group:remove(group, tag)

参数：
- `group`(String)——组名
- `tag`(String)——要从组中移除的标签

返回：Bool

从组中移除单个标签而不销毁精灵.如果组或标签不存在则返回 `false`.

```lua
group:remove('walls', 'wall1')
```

### group:clear(group)

参数：
- `group`(String)——组名

返回：Bool

丢弃整个组.精灵本身不受影响——只忘记分组.如果不存在这样的组则返回 `false`.

```lua
group:clear('walls')
```

### group:has(group, tag)

参数：
- `group`(String)——组名
- `tag`(String)——要测试的标签

返回：Bool

如果(仍然存活的)标签是组的成员则返回 `true`.

```lua
if group:has('walls', 'wall2') then
    print('wall2 is a wall')
end
```

### group:count(group)

参数：
- `group`(String)——组名

返回：Int

组中活成员的数量(排除死标签).未知或空组返回 `0`.

```lua
print('walls left:', group:count('walls'))
```

### group:get(group)

参数：
- `group`(String)——组名

返回：Table

返回组活成员标签的表(数组部分).用 `ipairs` 迭代,将每个标签传入任何 `sprite:*` 函数——例如对每个成员运行 `sprite:overlap` 来测试玩家碰到什么.未知组给出空表.

```lua
-- 玩家现在在哪些墙上？
for _, tag in ipairs(group:get('walls')) do
    if sprite:overlap('player', tag) then
        print('player is touching', tag)
    end
end
```

### 选择和鼠标

一个组可以携带一个选择——一个成员索引是"当前"的——这使任何精灵/文本组变成菜单.从键盘驱动它(`group:move`)或鼠标(`group:hovered` / `group:clicked` 对光标下的组成员进行命中测试,使用每个成员自己的相机).组只跟踪选中了哪个项目；你从 `group:selected` 自己绘制高亮(色调和缩放和光标).索引是 0 基的,与引擎其余部分一致.见 `song_select.lua` 示例,了解用歌曲数组构建的完整鼠标+键盘菜单.

### group:select(group, index)

参数：
- `group`(String)——组名
- `index`(Int)——0 基成员索引(钳制到组的范围)

返回：Int

设置组的选中索引并返回钳制后的值.如果组为空则为 `-1`.

```lua
group:select('songs', 0)   -- 选择第一行
```

### group:selected(group)

参数：
- `group`(String)——组名

返回：Int

当前选中的索引(0 基),自动钳制到活成员数.组为空时为 `-1`.与 `group:tagAt` / `group:selectedTag` 配对以对选中的成员采取行动.

```lua
local i = group:selected('songs')
local tag = group:tagAt('songs', i)
```

### group:selectedTag(group)

参数：
- `group`(String)——组名

返回：String

用 `group:select` 选中的成员的标签,空组为 `''`.

```lua
if input:keyJustPressed('ENTER') then
    print('chosen: '..group:selectedTag('songs'))
end
```

### group:tagAt(group, index)

参数：
- `group`(String)——组名
- `index`(Int)——组中的位置,从 0 开始

返回：String

位置处成员的标签,如果没有则为 `''`.按编号遍历菜单行的简单方式.

```lua
for i = 0, group:count('songs') - 1 do
    local tag = group:tagAt('songs', i)
    if i == group:selected('songs') then color:tint(tag, 'FFE24A', 1)
    else color:reset(tag) end
end
```

### group:move(group, delta, wrap)

参数：
- `group`(String)——组名
- `delta`(Int)——移动选择的步数(`-1` 上,`1` 下)
- `wrap`(Bool?)——在两端环绕(底 → 顶).`false` 在两端钳制 [默认 true]

返回：Int

将选择移动 `delta` 并返回新索引——菜单的键盘部分.

```lua
if input:keyJustPressed('UP')   then group:move('songs', -1) end
if input:keyJustPressed('DOWN') then group:move('songs',  1) end
```

### group:moveBy(group, dx, dy)
*自 v0.6.7*

参数：
- `group`(String)——组名
- `dx`(Float)——X 上移动的像素
- `dy`(Float)——Y 上移动的像素

返回：Bool

按相同量移动每个成员,所以组的布局保持不变.适合拖拽编队或滑动整个 UI 面板.

```lua
function onUpdate(dt)
    group:moveBy('formation', 0, -120 * dt)   -- 向上浮
end
```

### group:moveTo(group, x, y)
*自 v0.6.7*

参数：
- `group`(String)——组名
- `x`(Float)——组的左边缘应在哪里
- `y`(Float)——顶边缘应在哪里

返回：Bool

移动整个组,使其左上角(来自 `group:getBounds`)落在 `x, y`.成员保持彼此的相对位置.

```lua
group:moveTo('panel', 40, 40)
```

### group:getBounds(group)
*自 v0.6.7*

参数：
- `group`(String)——组名

返回：Table

每个活成员周围的盒子,作为 `{x, y, width, height}`.空或未知组全为零.

```lua
local b = group:getBounds('cards')
sprite:rec('frame', b.x - 8, b.y - 8, b.width + 16, b.height + 16, '00000088')
```

### group:getMidpoint(group)
*自 v0.6.7*

参数：
- `group`(String)——组名

返回：Table

来自 `group:getBounds` 的盒子的中心,作为 `{x, y}`.

```lua
local mid = group:getMidpoint('formation')
camera:followPos(mid.x, mid.y)
```

### group:hovered(group)

参数：
- `group`(String)——组名

返回：Int

鼠标当前悬停的成员索引(0 基),如果没有则为 `-1`.使用每个成员自己的相机对光标进行命中测试,所以对 HUD 相机菜单也工作.不可见/完全透明的成员被跳过.

```lua
local h = group:hovered('songs')
if h >= 0 then group:select('songs', h) end   -- 悬停以高亮
```

### group:clicked(group)

参数：
- `group`(String)——组名

返回：Int

本帧点击的成员索引(左键刚按下时在其上),或 `-1`.菜单的点击部分——用它确认选择.

```lua
local c = group:clicked('songs')
if c >= 0 then playSong(group:tagAt('songs', c)) end
```

### 批量设置器

这些中的每一个都在单次调用中对组的每个活成员应用一个更改——与你自己循环 `group:get` 并调用匹配的 `sprite:*` 函数相同,只是更短.如果组为空或未知,全部返回 `false`(带错误),否则返回 `true`.

### group:alpha(group, value)
*自 v0.6.7*

参数：
- `group`(String)——组名
- `value`(Float)——Alpha 0..1

返回：Bool

设置每个成员的 alpha.

```lua
group:alpha('hud', 0.5)
```

### group:scale(group, x, y)
*自 v0.6.7*

参数：
- `group`(String)——组名
- `x`(Float)——水平缩放
- `y`(Float)——垂直缩放

返回：Bool

直接设置每个成员的缩放(不是乘数——见 `sprite:scale` 的区别).

```lua
group:scale('icons', 0.8, 0.8)
```

### group:visible(group, value)
*自 v0.6.7*

参数：
- `group`(String)——组名
- `value`(Bool)——显示或隐藏

返回：Bool

显示或隐藏每个成员.

```lua
group:visible('tooltip', false)
```

### group:active(group, value)
*自 v0.6.7*

参数：
- `group`(String)——组名
- `value`(Bool)——活跃与否

返回：Bool

设置每个成员的 `active` 标志(Flixel 在非活跃对象上跳过 `update()`——它们上的补间/物理暂停,但仍绘制).

```lua
group:active('background', false)   -- 冻结它,保持可见
```

### group:exists(group, value)
*自 v0.6.7*

参数：
- `group`(String)——组名
- `value`(Bool)——存在与否

返回：Bool

设置每个成员的 `exists` 标志——与 `group:visible` 不同,这还会将它们完全拉出碰撞/重叠检查,而不销毁它们或从组中丢弃它们的标签.

```lua
group:exists('enemies', false)   -- 暂停遭遇而不移除任何东西
```

### group:scrollFactor(group, x, y)
*自 v0.6.7*

参数：
- `group`(String)——组名
- `x`(Float)——水平滚动因子
- `y`(Float)——垂直滚动因子

返回：Bool

设置每个成员的滚动因子——`0, 0` 将整个组固定在屏幕上,无论相机如何移动,与 `sprite:anchor` 相同的想法但用于视差而不是边缘锚定.

```lua
group:scrollFactor('hud', 0, 0)
```

### group:rotateBy(group, angleDelta)
*自 v0.6.7*

参数：
- `group`(String)——组名
- `angleDelta`(Float)——添加到每个成员当前角度的度数

返回：Bool

添加到每个成员的当前角度(相对,不是绝对)——每个成员从它已经在的地方继续旋转,所以每帧调用它会连续旋转整个组.

```lua
function onUpdate(dt)
    group:rotateBy('gears', 90 * dt)
end
```

### group:set(group, field, value)
*自 v0.6.7*

参数：
- `group`(String)——组名
- `field`(String)——底层精灵对象上的任何属性名
- `value`(Dynamic)——要分配的值

返回：Bool

通用逃生舱——按名称在每个成员上设置任意属性,用于上面专用批量设置器未覆盖的任何内容.当存在时优先使用 `group:alpha`/`group:scale`/等；这个没有类型检查,所以拼错或错误类型的字段会在每个成员上静默失败.

```lua
group:set('particles', 'blend', 'add')
```

### 排序

### group:sort(group, type, descending)

参数：
- `group`(String)——组名
- `type`(String)——排序依据：`y` / `feet` / `bottom`(= `y + height`,经典俯视深度排序)和`top`(`y`)和`centery`和`x` / `left`和`right`和`centerx` [默认 "y"]
- `descending`(Bool)——翻转顺序(最大键先绘制/在后)[默认 false]

返回：Bool

重新排序组的精灵在绘制列表中,使它们按位置正确重叠——俯视场景的 Y 排序,较低的精灵绘制在较高精灵的前面.默认升序.

设置后忘记：调用 `group:sort` 注册组,引擎每帧自动重新排序它——无需从 `onUpdate` 调用.再次调用以更改 `type`,`group:sortOff` 停止,或 `group:sortOnce` 进行单次排序而无需自动注册.

它只在成员已经占据的绘制顺序槽位之间打乱,所以它永远不会跨越你的 `sprite:priority` / 层桶或干扰非成员——将你想排序的演员保持在一个带中.当列表已经大致有序时(正常情况),排序是稳定的且接近线性,所以每帧成本很小.

自 v0.4.0(2026-06-16).

```lua
-- 启用一次；引擎每帧保持排序
group:sort('actors')                -- 按脚(y + height)

group:sort('actors', 'top')         -- 按 y(顶边缘)
group:sort('actors', 'centery')     -- 按垂直中心
group:sort('actors', 'x')           -- 从左到右
group:sort('actors', 'y', true)     -- 反转

group:sortOff('actors')             -- 停止自动排序
```

### group:sortOnce(group, type, descending)

参数：
- `group`(String)——组名
- `type`(String)——与 `group:sort` 相同的键 [默认 "y"]
- `descending`(Bool)——翻转顺序 [默认 false]

返回：Bool

现在排序组一次,而不注册它进行每帧自动排序.用于静态场景,或在一批生成之后,当顺序不会每帧改变时.

自 v0.4.0(2026-06-16).

```lua
-- 放置道具后一次性
group:sortOnce('props', 'feet')
```

### group:sortOff(group)

参数：
- `group`(String)——组名

返回：Bool

停止 `group:sort` 启动的每帧自动排序.当前绘制顺序保持原样；只是不再重新排序.如果组正在自动排序则返回 `true`.

自 v0.4.0(2026-06-16).

```lua
group:sortOff('actors')
```

---

## 背景函数

`backdrop` 命名空间通过 `FlxBackdrop` 创建平铺和滚动的背景.背景沿轴(或两者)重复其纹理,并使用 `scrollFactor` 独立于相机滚动——非常适合视差天空和水面或重复的地牢墙壁.背景与精灵共享标签注册表,所以这里创建的任何标签对 `sprite:*` 标签都是唯一的.

### backdrop:add(tag, img, repeat, spacingX, spacingY, layer)

参数：
- `tag`(String)——背景标签
- `img`(String)——图像路径(无扩展名),通过 `Paths.image` 解析
- `repeat`(String)——平铺轴：`'xy'`和`'x'`和`'y'`和`'none'` [默认 'xy']
- `spacingX`(Float)——水平瓦片之间的间隙像素 [默认 0]
- `spacingY`(Float)——垂直瓦片之间的间隙像素 [默认 0]
- `layer`(Int)——绘制层(back/middle/front——与 `sprite:priority` 相同)[默认 0]

返回：Bool

创建平铺和滚动的背景精灵.重用现有标签先逐出前一个背景.空标签或缺少图像时返回 `false`.

```lua
backdrop:add('sky', 'backgrounds/sky', 'x', 0, 0, 0)
backdrop:scroll('sky', 0.3, 0)  -- 视差：以相机速度的 30% 滚动
```

### backdrop:repeat(tag, axes)

参数：
- `tag`(String)——背景标签
- `axes`(String)——`'xy'`和`'x'`和`'y'` 或 `'none'`

返回：Bool

在背景添加后更改它沿哪些轴平铺.

```lua
backdrop:repeat('sky', 'x')
```

### backdrop:spacing(tag, x, y)

参数：
- `tag`(String)——背景标签
- `x`(Float)——瓦片之间的水平间隙,像素
- `y`(Float)——瓦片之间的垂直间隙,像素

返回：Bool

设置重复瓦片之间的间隙.

```lua
backdrop:spacing('grid', 4, 4)
```

### backdrop:velocity(tag, x, y)

参数：
- `tag`(String)——背景标签
- `x`(Float)——水平速度(像素/秒)
- `y`(Float)——垂直速度(像素/秒)

返回：Bool

自动滚动背景的纹理(独立于相机移动).与 `scrollFactor` 结合,这就是你获得云漂移和水流效果的方式.

```lua
backdrop:velocity('clouds', 20, 0)
```

### backdrop:autoScroll(tag, x, y, unit)
*自 v0.7.3*

参数：
- `tag`(String)——背景标签
- `x`(Float)——沿瓦片 X 轴的滚动速度(像素/秒)
- `y`(Float)——沿瓦片 Y 轴的滚动速度(像素/秒)
- `unit`(String?)——`px` 表示像素每秒,`tiles` 表示瓦片每秒 [默认 px]

返回：Bool

滚动瓦片而不移动背景,所以 `x`/`y` 保持在你放置的位置,对它们的补间继续工作.滚动保持在一个瓦片内,所以无论运行多久都不会漂移或抖动,与 `backdrop:velocity` 不同.在旋转的背景上,瓦片沿它们自己的旋转轴滚动.在像素中,瓦片通常需要数百的速度才能快速移动,使用 `tiles` 时速度不取决于图像大小：`1` 是每秒一整个瓦片.

```lua
backdrop:add('stripes', 'bar', 'x')
game:set('stripes.angle', 20)
backdrop:autoScroll('stripes', 50, 0)
backdrop:autoScroll('stripes', 0.5, 0, 'tiles')   -- 每秒半个瓦片
```

### backdrop:scroll(tag, x, y)

参数：
- `tag`(String)——背景标签
- `x`(Float)——水平滚动因子
- `y`(Float)——垂直滚动因子

返回：Bool

设置背景的相机滚动因子——较低的值给出经典视差(背景比相机移动慢).将两者都设为 `0` 将背景锁定到屏幕.

```lua
backdrop:scroll('sky', 0.3, 0.3)   -- 远处视差
backdrop:scroll('hud_bg', 0, 0)    -- HUD 层,无滚动
```

### backdrop:position(tag, x, y)

参数：
- `tag`(String)——背景标签
- `x`(Float)——新 X 位置(世界空间)
- `y`(Float)——新 Y 位置(世界空间)

返回：Bool

将背景吸附到绝对世界位置.平铺覆盖仍从这个原点沿配置的 `repeat` 轴向外延伸.

```lua
backdrop:position('clouds', 0, -50)
```

### backdrop:hitbox(tag, x, y, w, h)

参数：
- `tag`(String)——背景标签
- `x`(Float)——偏移 X(碰撞盒左上角,相对于精灵)
- `y`(Float)——偏移 Y
- `w`(Int)——碰撞盒宽度
- `h`(Int)——碰撞盒高度

返回：Bool

调整背景的碰撞矩形(`offset` + `setSize`).视觉平铺不受影响——只有 `backdrop:collide` / `backdrop:overlap` 测试的内容.与 `backdrop:hitboxDebug` 配对以查看新盒子.

```lua
backdrop:hitbox('floor', 0, 0, 1280, 32)
```

### backdrop:solid(tag, value)

参数：
- `tag`(String)——背景标签
- `value`(Bool)——背景是否参与碰撞 [默认 true]

返回：Bool

切换背景的 `solid` 标志.`true` 表示它参与 `backdrop:collide` / `sprite:collide` 解决；`false` 表示它仅重叠(例如水面触发事件而不将玩家推回).

```lua
backdrop:solid('water', false)
```

### backdrop:immovable(tag, value)

参数：
- `tag`(String)——背景标签
- `value`(Bool)——背景在碰撞期间是否不可移动 [默认 true]

返回：Bool

在碰撞解决期间将背景标记为不可移动——与它碰撞的精灵弹跳/停止,但背景不会被推动.地板 / 墙 / 天花板背景的自然选择.

```lua
backdrop:add('floor', 'tiles/floor', 'x')
backdrop:immovable('floor', true)
sprite:gravity('player', 800)
-- ... 在 onUpdate 中：
backdrop:collide('floor', 'player')
```

### backdrop:collide(tag, otherTag)

参数：
- `tag`(String)——背景标签
- `otherTag`(String)——精灵标签或背景标签

返回：Bool

在背景和另一个精灵/背景之间运行 Flixel 的碰撞解决——分离重叠对,尊重 `backdrop:immovable` / `sprite:immovable`,接触时返回 `true`.平铺背景对其底层 `FlxSprite` 边界碰撞(见 `backdrop:hitbox`),不是视觉重复区域——如果碰撞没有在你期望的地方触发,打开 `backdrop:hitboxDebug`.

```lua
function onUpdate()
    backdrop:collide('floor', 'player')   -- 玩家落在平铺地板上
end
```

### backdrop:overlap(tag, otherTag)

参数：
- `tag`(String)——背景标签
- `otherTag`(String)——精灵/背景标签,或省略以测试鼠标光标 [可选]

返回：Bool

纯重叠测试——无分离.如果背景的命中框与另一个对象的命中框重叠则返回 `true`.省略 `otherTag` 时,改为测试世界空间鼠标位置,所以你可以像按钮一样点击背景.

```lua
if backdrop:overlap('water', 'player') then
    sprite:velocity('player', 0, -200)   -- 水 = 跳板
end
if backdrop:overlap('clouds') then       -- 鼠标在云上
    print('mouse is on the clouds')
end
```

---

## 文本函数

`text` 命名空间创建和动画文本.每个文本像精灵一样由字符串 `tag` 键控.两种构造模式：`text:add` 制作单个 `FlxText`(一个位图,一个颜色)；`text:letters` / `text:gradient` 将内容拆分为组内每个字符一个 `FlxText`,所以每个字母可以独立着色和移动或着色.来自 tw:* 的补间在文本标签上工作,与在精灵上工作相同.

### 创建文本

选择与你需要匹配的模式：

| 函数 | 你得到 | 最适合 |
|---|---|---|
| `text:add` | 一个 `FlxText` | 静态标签和HUD 文本和任何单色内容.最便宜. |
| `text:letters` | 一个 `LetterText` 组：每个字符一个 `FlxText`,作为合成文本绘制 | 逐字母颜色/字体/动画(`wave`和`shake`和`rainbow`),应读作一个单词的边框和渐变. |
| `text:gradient` | 与 `text:letters` 相同,带插值的逐字母颜色 | 一键彩色单词.与 `text:gradientShader` 配对以在静态颜色上移动色调. |

字母组是合成的 v0.6.8.字母仍然是可移动和着色和逐个动画的独立对象,但它们不再逐个绘制.每帧有变化时,组将所有字母合并为每个边框一个层加一个填充层在 GPU 上,并按顺序绘制这些层：所有边框在所有填充下面.这在实践中意味着：

- 邻居的描边永远不会覆盖前一个字母的填充,半透明组(`game:set(tag..'.alpha', .7)`)在字母或层重叠的地方没有更暗的接缝.
- 边框跟随字母：`wave`和`shake`和`reveal` 和 `markEffect` 将描边与字形一起移动.
- `text:gradientShader` 和 `text:borderGradient` 在整个单词上运行一次,而不是在每个字母上重新开始.
- 缩放组(`sprite:scale`和`tw:scale`)围绕其中心缩放整个文本,所以字母之间的间隙也缩放.逐字母缩放效果(`markEffect` 脉冲和`reveal` 缩放)在上面相乘.
- 普通混合模式(`blend:set(tag, 'add')`)应用于合成文本.读取目标的模式(overlay和hardlight和softlight)逐字母绘制填充.
- 每个相机都看不到的文本跳过重组,直到它们回到屏幕上.

### 像 Figma 一样布局文本

自 v0.7.5 起,文本可以像 Figma 中的文本层一样放置和调整大小：一个带宽度和高度的盒子,盒子内的对齐,行高和字母间距以百分比表示,以及按字母本身而不是字体的空白定位.

### 文本框：宽度和高度和对齐

没有宽度的文本是 Auto width：它的盒子与最长行一样宽,`text:align` 只将行相互对齐.给它一个宽度,它变成 Fixed width：行在该宽度处换行并在其中居中或右对齐.也给它一个高度,`text:align` 的第三个参数将文本放在盒子的 `top`和`middle` 或 `bottom`.

- 文本上的 `sprite:size(tag, w, h)` 调整盒子大小(不拉伸字母)；`0` 保持该侧自动.
- `game:set(tag..'.width', w)` / `game:set(tag..'.height', h)` 做同样的事,可以用 `tw:any` 补间.
- 宽度是字母得到的空间,完全像 Figma：160 px 的盒子将 159.8 px 的行保持在一行.
- 没有高度时,`'middle'` 和 `'bottom'` 没有什么可以在里面移动,控制台会这样说.

### 按字母定位(垂直修剪)

默认情况下,文本的 `y` 是其盒子的顶部,字母从更下方开始,因为大写字母上方有字体的空白.打开 `letterAnchor`,文本的行为就像 Figma 的 Vertical trim：
- `x` / `y` 指向字母周围描边的外边缘,所以文本在同一坐标处与图像对齐.
- 盒子(命中框和`debug:hitbox`和`sprite:center`和点击)从大写字母顶部到最后一行的基线,加上每边的描边——没有空白.
- 顶部从字体测量,所以文本改变时不会跳动(`acti` 和 `ACTI` 在同一高度).
- 缩放和旋转围绕该盒子的中心发生.

### 行高和字母间距

`text:leading` 和 `text:letterSpacing` 将 Figma 的百分比值作为字符串,将像素作为数字.两种类型堆叠：百分比是基础,像素加在上面.百分比值跟随之后的尺寸和字体更改.

### 从语言文件高亮

`text:markup` 为两个标记之间的所有内容着色并移除标记,所以翻译者可以直接在 `.lang` 文件中标记单词.规则粘在文本上,并由 `text:set` 再次应用.颜色接受带不透明度的 Figma 记法.

### 回声和辉光效果的副本

`text:copy` 克隆具有每个设置的文本,所以效果层总是匹配原始——在每种语言和每次编辑后.在循环中缩放的副本上固定 `text:resolution`,这样它们不会每次增长时重新绘制.

### 描边

`text:border` 将描边烘焙到文本图片中.`shader:outline` 在 GPU 上围绕整个形状绘制平滑描边,具有 Figma 的位置：`outside`和`inside` 或 `center`.它的大小和颜色和不透明度是文本参数(`outlineSize`和`outlineColor`和`outlineAlpha`),可以免费补间.

### text:add(tag, content, ?x, ?y, ?width, ?size, ?color)

参数：
- `tag`(String)——文本标签
- `content`(String)——要显示的文本
- `x`(Float)——X 位置 [默认 0]
- `y`(Float)——Y 位置 [默认 0]
- `width`(Float)——字段宽度(`0` = 自动)[默认 0]
- `size`(Int)——字体大小(像素)[默认 16]
- `color`(String)——颜色十六进制(例如 `'FFFFFF'`)[默认白色]

返回：Bool

设置 `game:set(tag..'.letterAnchor', true)` 使文本的 `y` 表示其大写字母的顶部而不是盒子顶部(从字体测量,所以位置不随文本内容变化),所以它在同一 `y` 处与图像或另一个文本对齐,无论其字体和大小和描边或 `text:mark` 大小如何.创建单个 `FlxText` 并在 `tag` 下注册.补间(`tw:x`和`tw:alpha`和`tw:scale`和`tw:color`)在文本标签上工作,与精灵标签相同.v0.7.3 除了位置参数,你可以传递一个表作为第三个参数：`{x, y, width, size, color, align, font}`,所以对齐和字体在同一调用中设置.

```lua
text:add('title', 'TEXT API TEST', 20, 20, 0, 28, 'FF66AA')
text:border('title', 'outline', '000000', 2)

-- 命名选项
text:add('title', 'Options', {x = 0, y = 40, width = 1280, size = 48, align = 'center', font = 'vcr'})
```

### text:letters(tag, content, ?x, ?y, ?size, ?color)

参数：
- `tag`(String)——组标签
- `content`(String)——要拆分为字母的文本
- `x`(Float)——组 X [默认 0]
- `y`(Float)——组 Y [默认 0]
- `size`(Int)——字体大小 [默认 16]
- `color`(String)——每个字母的基础颜色 [默认白色]

返回：Bool

在 `(x, y)` 处为每个字符创建一个 `FlxText` 在组内；组是 `tag` 指向的对象,所以补间一起移动每个字母.`\n` 开始真正的新行,字距被校正,所以单词在更大尺寸下不会间隙,逐字母颜色/字体/动画和`text:align` 和 `text:wrap` 都在此模式上工作.

```lua
text:letters('split', 'individually colored', 40, 170, 22, 'FFFFFF')
for i = 0, text:count('split') - 1 do
    text:letterColor('split', i, (i % 2 == 0) and 'FF6699' or '66CCFF')
end

-- 多行,块居中
text:letters('note', 'Coolant offline.\nThe reactor will melt down.', 0, 200, 24)
sprite:center('note', 'x')
```

### text:gradient(tag, content, colors, ?x, ?y, ?size)

参数：
- `tag`(String)——组标签
- `content`(String)——要拆分为字母的文本
- `colors`(Table)——颜色十六进制字符串的数组(例如 `{'FF0000','00FF00','0000FF'}`)
- `x`(Float)——组 X [默认 0]
- `y`(Float)——组 Y [默认 0]
- `size`(Int)——字体大小 [默认 16]

返回：Bool

像 `text:letters`,但逐字母颜色在 `colors` 数组上插值(第一 → 最后).2 色数组给出平滑的从左到右渐变；更多颜色是均匀间隔的停止点.停止列表被记住,所以之后的 `text:set` 自动在新内容上重建渐变.

```lua
text:gradient('grad1',
    'horizontal gradient text',
    {'FF0000', 'FFAA00', '00FF66', '00AAFF', 'AA66FF'},
    40, 220, 26)
```

### 内容和样式

这些在任何标签上工作——单文本(`text:add`)或字母组(`text:letters` / `text:gradient`).对于字母组,它们将更改应用于每个子字母.

### text:set(tag, content)

参数：
- `tag`(String)——文本标签
- `content`(String)——新文本内容

返回：Bool

设置文本已经显示的相同文本时什么都不做 v0.6.8：不重新渲染,运行中的 `text:marquee` 不重启.替换文本内容.对于字母组,销毁旧字母并从 `content` 重建组,然后重新应用存储的渐变停止点和边框层和活动着色器,所以装饰在重建后存活.运行中的效果(`wave`和`shake`和`rainbow`)和 `text:marquee` 在新内容上继续.

v0.6.8 修复：在 `wave`/`shake` 运行时设置较短的字符串不再崩溃；来自 `text:mark` 的颜色在重建前恢复,而不是按索引泄漏到新字母上；进行中的 `text:type` 被停止而不是覆盖新文本；`text:slant` 延续；再次设置相同内容是无操作(无重建).

```lua
text:set('title', 'NEW TITLE')
text:set('grad1', 'rebuilt gradient text')  -- 在存储的停止点上重新插值
```

### text:camera(tag, cam)
*自 v0.7.6*

参数：
- `tag`(String)——文本标签
- `cam`(String)——相机标签 [默认 game]

返回：Bool

将文本移动到另一个相机.与 `sprite:camera` 相同,在你会寻找的文本名称下.

```lua
text:add('hint', 'Press Enter', 20, 680)
text:camera('hint', 'hud')
```

### text:font(tag, ?fontName, ?size)

参数：
- `tag`(String)——文本标签
- `fontName`(String)——通过 `Paths.font` 解析的字体键——像 `'vcr'` 这样的裸键匹配 `assets/fonts/vcr.ttf` 或 `assets/fonts/vcr.otf`(如果两者都存在,`.ttf` 优先).传递完整路径或以 `.ttf` / `.otf` 结尾的名称以绕过解析器.`nil` 或空 = 默认字体.[可选]
- `size`(Int)——新字体大小(像素)(`0` = 保持不变)[默认 0]

返回：Bool

设置字体和可选的大小.对于字母组,重新布局字母,因为字形宽度随字体变化.

```lua
text:font('title', 'vcr', 32)
text:font('typer', nil, 20)  -- 默认字体,大小 20
```

### text:size(tag, size)

参数：
- `tag`(String)——文本标签
- `size`(Int)——新字体大小

返回：Bool

仅更改字体大小.对于字母组,重新布局字母.

```lua
text:size('title', 48)
```

### text:resolution(tag, value)
*自 v0.6.0*

参数：
- `tag`(String)——文本标签,或字母组标签
- `value`(Number)——栅格化比例,钳制到 1–4

返回：Bool

在其字形缩回之前栅格化多少次.文本现在根据其真实屏幕大小(其缩放和相机缩放和窗口大小)自行选择,所以你只需要这个来固定精确值.新文本遵循引擎的自动跟踪全局默认值,直到你调用这个,这使标签永久退出(即使默认值之后更改,它也保持这个精确值)；用 `text:add` 重新创建它以恢复自动跟踪.

```lua
text:add('zoomedLabel', 'HUD TEXT', 100, 100, 0, 20)
sprite:camera('zoomedLabel', 'zoomedCam')   -- 放大 2x 的相机
text:resolution('zoomedLabel', 2)           -- 在该缩放级别保持清晰
```

### text:fillAlpha(tag, value)
*自 v0.7.5*

参数：
- `tag`(String)——文本标签,或字母组标签
- `value`(Number)——字母本身的不透明度,`0`–`1`

返回：Bool

仅淡出字母并保持每个描边和阴影和边框层完全可见.低于 `1` 时,字母形状从描边中切出,所以 `0` 给出你可以看穿背景的空心描边,`0.5` 给出实心描边内的透视字母.当你想要描边保持时使用这个而不是 `alpha`：`alpha` 淡出整个文本,包括描边.与 `text:border`和`text:addBorder` 和字母组一起工作.

```lua
text:add('title', 'GAME OVER', 0, 200, 0, 64)
text:border('title', 'outline', 'FFFFFF', 4)
text:fillAlpha('title', 0)      -- 仅空心白色描边
text:fillAlpha('title', 0.4)    -- 微弱字母,实心描边
```

### text:fillGradient(tag, colors, stops)
*自 v0.7.5*

参数：
- `tag`(String)——文本标签
- `colors`(Table?)——从上到下的颜色,像 `{'FFFFFF', 'FF8A3D'}`.省略以移除渐变
- `stops`(Table?)——每个颜色坐在哪里,`0`(顶)到 `1`(底),每个颜色一个数字 [均匀间隔]

返回：Bool

用垂直渐变绘制字母,从最高字母的顶部运行到最低字母的底部,横跨文本的所有行.渐变烘焙到文本图片中,所以每帧没有成本,并与 `shader:outline` 和其他着色器一起工作.只有字母被着色；`text:border` 和 `text:addBorder` 层保持自己的颜色.与 `text:fillAlpha` 一起工作.

```lua
text:add('title', 'LEVEL\nCOMPLETE', 0, 72, 0, 48)
text:border('title', 'outline', '2B2D42', 3)
text:fillGradient('title', {'FFFFFF', 'FFE08A', 'FF8A3D'}, {0, 0.48, 1})
text:fillGradient('title')   -- 移除
```

### text:copy(from, tag, x, y, behind)
*自 v0.7.5*

参数：
- `from`(String)——要复制的文本
- `tag`(String)——新文本的标签
- `x`(Number?)——副本的位置 [与原始相同]
- `y`(Number?)——副本的位置 [与原始相同]
- `behind`(Bool?)——将副本放在原始后面而不是前面 [默认 false]

返回：Bool

制作文本的精确副本：其内容和字体和大小和颜色和`text:mark` 范围和行高和字母间距和宽度/高度盒子和对齐和边框和边框层和填充渐变和 alpha和letterAnchor和缩放和角度和alpha 和相机.之后更改任何应该不同的内容.适合必须始终匹配原始的回声和阴影和辉光副本——例如当语言改变且文本获得不同长度时.着色器(`shader:*`)不被复制,因为精灵有一个着色器槽.

```lua
text:add('title', lang:get('result.title'), 420, 48, 0, 48)
text:border('title', 'outline', '2B2D42', 3)
text:copy('title', 'echo', nil, nil, true)   -- 相同文本,就在标题后面
text:border('echo', 'outline', 'FFFFFF', 3)
text:fillAlpha('echo', 0)
```

### text:markup(tag, marker, color, opts)
*自 v0.7.5*

参数：
- `tag`(String)——文本标签
- `marker`(String)——包裹高亮部分的符号,像 `'*'` 或 `'#'`
- `color`(String?)——包裹部分的颜色
- `opts`(Table?)——与 `text:mark` 相同的样式选项：`bold`和`italic`和`underline`和`border`和`size`

返回：Number

高亮两个标记之间写的文本的每个部分并移除标记,所以翻译者可以直接在语言文件中标记单词：`shop.desc=Restores *50 HP* instantly`.规则粘在文本上——`text:set` 再次将其应用于新内容——并且可以同时使用多个标记,每个有自己的样式.其他 `text:mark` 高亮保持它们的位置.返回高亮了多少部分.

```lua
text:add('itemDesc', lang:get('shop.item1.desc'), 300, 230, 160, 16)
text:markup('itemDesc', '*', 'FFC857')              -- *50 HP* 变成金色
text:markup('itemDesc', '#', nil, {bold = true})     -- #word# 变粗
```

### text:leading(tag, value)

参数：
- `tag`(String)——文本标签
- `value`(Number | String)——行间的额外像素,或像 `'103.7%'` 的百分比字符串用于 Figma 的行高

返回：Bool

设置行距(leading)——多行文本行之间的额外间隙.驱动文本格式的 `leading` 并重新应用它.在单文本和字母组上工作.传递百分比字符串以 Figma 方式设置行高：`'120%'` 表示每行是字体大小的 120%,在大小或字体更改时自动重新计算.与 `game:set(tag..'.lineHeight', 120)` 相同.两种类型堆叠：百分比设置基础行高,像素值加在上面,所以 `text:leading(tag, '120%')` 后跟 `text:leading(tag, -2)` 给出 120% 减 2 px；`text:leading(tag, '0%')` 或 `0` 清除该部分.

```lua
text:add('body', 'line one\nline two', 20, 20, 400)
text:leading('body', 8)
text:leading('title', '103.7%')   -- Figma 行高
```

### text:letterSpacing(tag, spacing)

参数：
- `tag`(String)——文本标签
- `spacing`(Number | String)——字母之间的像素,或字体大小的百分比字符串像 `'5%'`(Figma 的字母间距)

返回：Bool

设置字距(字母间距)——字符之间的额外水平空间.在 `text:add` 上它是原生 FlxText 属性.在 `text:letters` 组上,每个字母是自己的单字符字段(字段内没有字距属性可以间隔),所以它按标签跟踪,组重新布局,额外间隙烘焙到每个字母的推进中——包括字面空格,所以它也加宽单词之间的间隙.馈入 `text:wave` / `shake` / `reveal` / `markEffect`,它们共享相同的布局.百分比字符串以 Figma 方式设置它,作为字体大小的份额,并跟随之后的尺寸更改.与 `game:set(tag..'.letterSpacing', '5%')` 相同.百分比和像素堆叠方式与 `text:leading` 相同：`'5%'` 加 `1` 给出大小的 5% 加 1 px.

```lua
text:letterSpacing('title', 4)
text:letters('title2', 'TRACKED OUT', 40, 40, 32)
text:letterSpacing('title2', 6)
text:letterSpacing('title', '5%')   -- Figma 字母间距
```

### text:color(tag, color)

参数：
- `tag`(String)——文本标签
- `color`(String)——颜色十六进制(例如 `'FF6699'`)

返回：Bool

设置文本填充颜色.对于字母组,覆盖每个字母的颜色——包括渐变停止点.(要在此之后恢复渐变颜色,再次调用 `text:gradient` 或通过 `text:gradientShader` 使用基于着色器的渐变.)

```lua
text:color('title', 'FF66AA')
```

### text:upper(tag)
*自 v0.6.6*

参数：
- `tag`(String)——一个 `text:add` 文本,或一个 `text:letters` 组

返回：Bool

就地大写文本内容.在字母组上,之后重新布局,因为大写字形比它们的小写对应物更宽.

```lua
text:upper('title')
```

### text:lower(tag)
*自 v0.6.6*

参数：
- `tag`(String)——一个 `text:add` 文本,或一个 `text:letters` 组

返回：Bool

就地小写文本内容.在字母组上,之后重新布局,因为字形宽度改变.

```lua
text:lower('title')
```

### text:align(tag, align, vertical)

参数：
- `tag`(String)——一个 `text:add` 文本,或一个 `text:letters` 组
- `align`(String)——`'left'`和`'center'`(`'centre'` / `'mid'` 也接受)和`'right'`和`'justify'`(仅 `text:add`)之一.未知值回退到 `'left'`.
- `vertical`(String?)——`top`和`middle` 或 `bottom`——文本在固定高度盒子内的位置(用 `game:set(tag..'.height', h)` 设置它)[默认 top]

返回：Bool

设置文本对齐,像 Figma 中的对齐按钮.

在 `text:add` 上,文本的盒子保持你放置它的确切位置.没有宽度时,盒子与最长行一样宽,所以 `center`/`right` 只将行相互对齐.用 `game:set(tag..'.width', w)`(或 `text:add` 的宽度参数)给盒子一个宽度,文本在其中居中或右对齐,不适合时换行.用 `game:set(tag..'.height', h)` 给它一个高度,`vertical` 将文本放在该盒子的顶部和中间或底部；开启 `letterAnchor` 时,字母本身(大写顶部到基线)被居中,像 Figma 的垂直修剪.两者之后也可以用 `game:set(tag..'.align', ...)` 和 `game:set(tag..'.valign', ...)` 更改.

在 `text:letters` 组上(没有 `'justify'`),每行相对于其他行居中或右对齐,最宽行设置块宽度——与 `sprite:center` 配对以居中整个块.通过 `text:set`和`text:type` 和动画助手坚持；仅由新的 `text:letters` 调用重置.

```lua
text:add('title', 'SONG SELECT', 0, 40, 0, 40)
text:align('title', 'center')       -- 现在在屏幕上居中

text:add('score', '0', 0, 20)
text:align('score', 'right')         -- 紧贴右边缘

-- 多行字母组,每行相对于其他行居中
text:letters('warn', 'Coolant offline.\nThe reactor will melt down.', 0, 200, 24)
text:align('warn', 'center')
sprite:center('warn', 'x')          -- 在屏幕上居中整个块
```

### text:wrap(tag, ?width)
*自 v0.6.6*

参数：
- `tag`(String)——一个 `text:letters` 组
- `width`(Float)——开始新行前的最大行宽(px).`0`(或省略)关闭换行 [默认 0]

返回：Bool

在超过 `width` px 的单词边界处自动换行字母组,与 `text:add` 的 `width` 参数换行单个文本相同——`text:letters` 否则只在字面 `\n` 处断开.与硬 `\n` 断行组合,从不拆分单词中间,并在之后的 `text:font` / `text:size` / `text:align` / `text:set` 调用中保持应用.`text:wrap(tag, 0)` 关闭它.

```lua
text:letters('warn', 'This is a demo build. Some features are not final and may change before release.', 0, 100, 22)
text:wrap('warn', 550)        -- 在超过 550px 的单词边界处自动断行
text:align('warn', 'center')  -- 每个换行行相对于其他行居中
sprite:center('warn')         -- 居中整个(现在正确换行的)块
```

### text:slant(tag, degrees)

参数：
- `tag`(String)——文本标签——单个文本或 `text:letters` 组
- `degrees`(Float)——剪切角.`0` = 直立；正向右倾(假斜体),负向左倾

返回：Bool

通过 `degrees` 剪切每个字形以获得倾斜/斜体外观,无需斜体字体文件.在底层 `FlxText` 上设置 `glyphSlant`；在字母组上,它应用于每个字母并重新布局组.纯视觉——布局宽度不变.

```lua
text:add('tag', 'FASTER', 0, 300, 0, 48)
text:slant('tag', 12)      -- 向右倾

text:letters('combo', 'COMBO', 100, 100, 32)
text:slant('combo', -8)    -- 整个组向左倾
```

### text:cache(tag, ?enabled)
*自 v0.6.9*

参数：
- `tag`(String)——文本或字母组
- `enabled`(Bool?)——打开或关闭渲染缓存 [默认 true]

返回：Bool

记住此文本对每个它显示过的内容的样子,所以切换回它已经渲染过的内容时,复制保存的像素而不是再次绘制字形和边框.为循环少数值且边框很重的文本制作——等级和分数和计数器和标签——否则 `text:set` 会每次重新渲染描边.缓存是共享的：具有相同字体和大小和颜色和边框和宽度的文本共享条目,它保留最近使用的 64 个渲染.有 `text:mark` 格式的文本从不缓存.

```lua
text:add('rank', '?', 340, 20, 70, 48)
text:addBorder('rank', 'outline', '1B1B2F', 3)
text:cache('rank')

text:set('rank', 'S+')  -- 渲染一次
text:set('rank', 'A')
text:set('rank', 'S+')  -- 从缓存复制
```

### text:count(tag)

参数：
- `tag`(String)——文本标签

返回：Int

返回字母组中字母的数量,或单个文本内容的长度.如果标签未知则返回 `-1`.

```lua
for i = 0, text:count('split') - 1 do
    text:letterColor('split', i, (i % 2 == 0) and 'FF6699' or '66CCFF')
end
```

### 标记单词

### text:mark(tag, target, color, opts)
*自 v0.6.5*

参数：
- `tag`(String)——一个 `text:add` 文本,或一个 `text:letters` 组(仅颜色)
- `target`(String | Table)——一个子字符串——每个出现都被标记——或一个 `{from, to}` 字符范围(1 基,包含)
- `color`(String)——跨度的十六进制颜色 [可选]
- `opts`(Table)——`{ bold, italic, underline, border = '000000' }`——任何子集.仅 `text:add` [可选]
- `opts.size`(Number?)——标记部分的字体大小,例如两行标题中较小的第一行.没有自己 `border` 的标记部分保持文本的描边颜色

返回：Int

为文本的一部分着色或设置样式.在 `text:add` 上它使用 Flixel 的原生格式范围(自动换行,无额外精灵),所以 `opts` 样式都适用.在 `text:letters` 组上它只重新着色匹配的字母——`opts` 样式被拒绝；`text:clearMarks` 恢复它们的原始颜色.

反复调用以堆叠标记；返回匹配了多少跨度(如果未找到则 `0`).需要至少 `color` 或 `opts` 样式之一.子字符串搜索跨行断行,所以短语在换行时仍高亮,并与运行中的 `text:type` 一起工作(匹配最终字符串,标记在打字机到达它们时出现).在 `text:set` 之后重新应用标记.

```lua
text:add('body', 'Coolant offline. The reactor will melt down.', 80, 60, 700, 22)
text:mark('body', 'reactor', 'FF3B3B')                    -- 每个出现
text:mark('body', 'melt down', 'FFD166', { bold = true })
text:mark('body', { 1, 15 }, '7FD1FF', { underline = true })   -- 字符 1..15

-- 在打字机期间,或在字母组上
text:type('warn', 'SYSTEM FAILURE', 18)
text:mark('warn', 'FAILURE', 'FF3B3B')

text:letters('combo', 'PERFECT', 100, 100, 32)
text:mark('combo', 'FECT', 'FFD166')
```

### text:clearMarks(tag)
*自 v0.6.5*

参数：
- `tag`(String)——一个 `text:add` 文本或一个 `text:letters` 组

返回：Bool

移除每个 `text:mark` 跨度——`text:add` 文本回到其基础颜色和样式；字母组的标记字母回到标记之前的颜色.

```lua
text:clearMarks('body')
```

### text:markEffect(tag, target, kind, opts)
*自 v0.6.6*

参数：
- `tag`(String)——一个 `text:letters` 组
- `target`(String | Table)——与 `text:mark` 相同的匹配规则——子字符串(每个出现)或 `{from, to}` 范围
- `kind`(String)——`'wave'`和`'shake'`和`'rainbow'` 或 `'pulse'`
- `opts`(Table)——`{ amplitude, speed, spacing, time, ease, beat }`——任何子集 [可选]

返回：Int

仅在匹配的字母上运行动画,独立于任何整个组的 `text:wave`/`text:shake`/`text:rainbow`.`amplitude`/`speed`/`spacing` 与它们的整个组对应物含义相同.`'pulse'` 放大和缩小匹配的字母；传递 `beat = true` 以在歌曲节拍上冲击(通过 Conductor)而不是在计时器上循环——然后 `time`/`ease` 塑造冲击和稳定.与 `text:mark` 在同一目标上的颜色很好地堆叠；不与接触相同字母的整个组效果混合(每帧最后写入获胜).返回匹配了多少字母.

```lua
text:letters('warn', 'DANGER: reactor critical', 40, 100, 28)
text:mark('warn', 'DANGER', 'FF3B3B')
text:markEffect('warn', 'DANGER', 'shake', { amplitude = 2 })

-- 随节拍冲击
text:markEffect('combo', 'PERFECT', 'pulse', { beat = true, amplitude = 0.3 })
```

### text:clearMarkEffects(tag)
*自 v0.6.6*

参数：
- `tag`(String)——一个 `text:letters` 组

返回：Bool

停止在此标签上运行的每个 `text:markEffect` 并将所有字母重置到它们的基础位置和缩放和色调.来自 `text:mark` 的标记颜色不受影响.

```lua
text:clearMarkEffects('warn')
```

### 边框

### text:border(tag, style, ?color, ?borderSize)

参数：
- `tag`(String)——文本标签
- `style`(String)——`'none'`和`'shadow'`和`'outline'`和`'outline_fast'`(`'outlinefast'` 也接受)之一.未知值映射到 `'none'`.
- `color`(String)——边框颜色十六进制 [默认黑色]
- `borderSize`(Float)——边框厚度 [默认 1]

返回：Bool

设置边框样式和颜色和厚度.在字母组模式下应用于每个字母.

```lua
text:border('title', 'outline', '000000', 2)
text:border('hint',  'shadow',  '003300', 1)
```

### 堆叠边框层

除了单个 `text:border`,文本可以携带任意数量的堆叠边框通道——例如厚深色描边加柔和投影加彩色辉光.每个层保持自己的颜色和大小和质量和阴影方向,并绘制在填充下面.用 `text:addBorder` 添加它们(返回层的索引),然后按索引用 `text:setBorder` 实时调整任何层.层堆叠在 `text:border` 设置的任何内容之上.`text:borderGradient` 以相同方式添加渐变颜色层,所以渐变边框也堆叠——彼此以及与普通 `addBorder` 层.

在 `text:letters` 组上 v0.6.8,层属于组,不属于字母：每个层为每个不同字形烘焙一次(相同字符和字体和大小和层设置在整个游戏中的每个组共享一个烘焙),组将它们合成为每个边框索引一个层.按索引的 `setBorder` / `removeBorder` / `borderShader` / `getBorder` 一次性影响整个单词,层的着色器在整个单词上运行一次.

绘制顺序遵循添加顺序：哪个 `addBorder` / `borderGradient` 调用最后发生就绘制在顶部.在较小层之后添加的大层将完全覆盖它,所以当从大到小分层时,给后来的(较小的)调用显式它们真实的大小而不是依赖默认值.

### text:addBorder(tag, style, ?color, ?size, ?quality, ?shadowX, ?shadowY)

参数：
- `tag`(String)——一个 `text:add` 文本,或一个 `text:letters` 组
- `style`(String)——`'outline'`和`'shadow'`和`'outline_fast'` 或 `'none'`(普通副本——有用作着色器载体)
- `color`(String?)——层颜色十六进制.十六进制中的 alpha(`AARRGGBB`)淡出整个层 [默认黑色]
- `size`(Float?)——边框厚度 / 阴影距离(px)[默认 2]
- `quality`(Float?)——每像素大小的通过数(更高 = 更平滑,成本更高)[默认 1]
- `shadowX`(Float?)——阴影方向 X(SHADOW 样式)[默认 1]
- `shadowY`(Float?)——阴影方向 Y [默认 1]

返回：Int

添加堆叠边框通道并返回其索引(与 `text:setBorder` / `text:removeBorder` 一起使用).多次调用以分层效果.在字母组上,层添加到每个字母；索引在所有字母中仍然对齐.

```lua
-- 厚黑色描边,然后在其下方柔和红色投影
local outline = text:addBorder('title', 'outline', '000000', 3)
local shadow  = text:addBorder('title', 'shadow', '99FF3355', 6, 1, 2, 2)
```

### text:setBorder(tag, index, opts)

参数：
- `tag`(String)——一个 `text:add` 文本,或一个 `text:letters` 组
- `index`(Int)——`text:addBorder` 返回的层索引
- `opts`(Table)——任何：`style`和`color`和`size`和`quality`和`shadowX`和`shadowY`和`visible`.你省略的字段保持不变

返回：Bool

实时调整一个边框层——重新着色和调整大小和移动其阴影或隐藏它.更改在下次绘制时自动重新烘焙.

```lua
text:setBorder('title', shadow, { color = 'FF00AA', size = 8 })
text:setBorder('title', outline, { visible = false })
```

### text:removeBorder(tag, index)

参数：
- `tag`(String)——文本或字母组
- `index`(Int)——哪个边框层,`text:addBorder` 返回的数字

返回：Bool

移除一个边框层.之后的层向下移动一个,所以移除多个时,从最高数字开始.

```lua
local shadow = text:addBorder('title', 'shadow', '000000', 4)
text:removeBorder('title', shadow)
```

### text:clearBorders(tag)

参数：
- `tag`(String)——文本或字母组

返回：Bool

从文本或从字母组的每个字母移除每个边框层.

```lua
text:clearBorders('title')
```

### text:borderCount(tag)

参数：
- `tag`(String)——文本或字母组

返回：Int

文本上堆叠了多少边框层.

```lua
if text:borderCount('title') == 0 then text:border('title', 'outline', '000000', 3) end
```

### text:borderShader(tag, index, name, opts)

参数：
- `tag`(String)——一个 `text:add` 文本,或一个 `text:letters` 组
- `index`(Int)——来自 `text:addBorder` 的层索引
- `name`(String?)——包着色器名称：`chromatic`和`wave`和`grain`和`glitch`和`invert`和`sepia`和`duotone`和`vignette`和`scanlines`和`pixelate`.省略以移除层的着色器
- `opts`(Table?)——该着色器的参数(与匹配的 shader:* 相同字段),例如 `{ amount = 0.02, speed = 3 }`

返回：Bool

将后效果着色器之一附加到单个边框层——波浪动画描边和色差分裂幽灵阴影和故障边缘.只有该通道受影响；填充和其他层不受影响.再次调用以交换,或无 `name` 以清除.在字母组上,应用于每个字母上的该层.

```lua
local outline = text:addBorder('title', 'outline', '000000', 4)
local shadow  = text:addBorder('title', 'shadow', 'CCFF33AA', 8, 1, 3, 3)

-- 波浪动画描边 + 色差幽灵阴影
text:borderShader('title', outline, 'wave', { amount = 0.02, speed = 3, scale = 16 })
text:borderShader('title', shadow,  'chromatic', { amount = 0.01 })

text:borderShader('title', outline)   -- 从该层移除着色器
```

### text:getBorder(tag, index, field)

参数：
- `tag`(String)——一个 `text:add` 文本,或一个 `text:letters` 组
- `index`(Int)——层索引
- `field`(String)——`style`和`color`(AARRGGBB 十六进制)和`size`和`quality`和`shadowX`和`shadowY`和`visible` 或 `hasShader`

返回：Any

读回边框层的一个属性.与 `text:setBorder` 配对以检查和调整.层字段也可以通过点分的 game:get / game:set 行走到达(`title.borderLayers.0.size`).在字母组上,这读取第一个字母——只要层以正常方式设置(通过 `addBorder` / `setBorder`,它们总是保持每个字母同步)就没问题.

```lua
local c = text:getBorder('title', outline, 'color')   -- 'FF000000'
local on = text:getBorder('title', shadow, 'hasShader') -- true
```

### text:borderGradient(tag, colors, ?angle, ?speed, ?rotateSpeed, ?flow, ?style, ?size)

参数：
- `tag`(String)——文本标签(单个文本或字母组)
- `colors`(Array)——1-6 个十六进制颜色停止点,第一 → 最后(与 text:gradient 相同的约定).单个颜色复制成扁平的两停止渐变；超过第 6 个的停止点被忽略
- `angle`(Number?)——渐变方向(度)[默认 0]
- `speed`(Number?)——沿其轴来回滑动渐变的每秒周期数；`0` = 静态 [默认 0]
- `rotateSpeed`(Number?)——旋转渐变方向的每秒度数；`0` = 静态 [默认 0]
- `flow`(Bool?)——`true` = 无限向一个方向流动(无缝循环带)而不是来回滑动.仅在 `speed > 0` 时重要 [默认 false]
- `style`(String?)——新层的边框样式：`'outline'`和`'shadow'` 或 `'outline_fast'`.覆盖 `text:border` 最后设置的任何内容 [默认复制 text:border,否则 'outline']
- `size`(Number?)——新层的厚度(px).覆盖 `text:border` 最后设置的任何内容 [默认复制 text:border,否则 2]

返回：Bool

添加渐变颜色边框层——一个真正的堆叠层(与 `text:addBorder` 相同的底层机制),不是原生边框上的色调,所以它永远不需要先运行 `text:border`.样式和大小来自 `style`/`size` 如果你传递它们,否则来自 `text:border` 最后在标签上设置的任何内容,否则一个普通的 2px 描边.因为它是真正的层,`text:borderGradient` 可以在同一标签上多次调用以堆叠几个独立的渐变边框,并且它与普通 `text:addBorder` 层自由组合——哪个调用最后发生就绘制在顶部,所以如果之后更早的 `addBorder`/`borderGradient` 调用否则会隐藏它,给层一个显式 `size`.之后用 `text:setBorder(tag, index, { size = … })` 调整任何层(添加后立即从 `text:borderCount(tag) - 1` 获得索引).`speed` 滑动渐变,`flow` 无限滚动它,`rotateSpeed` 旋转它.在字母组模式下横跨整个单词.`text:borderGradientAngle(tag, deg)` 一次更新该标签上每个堆叠渐变层的角度.

v0.6.8 当新层从 `text:border` 取样式和大小,该原生边框被转换为层并忘记,所以之后的 `text:set` 不再在渐变顶部带回普通边框.

```lua
text:add('title', 'FREAK ENGINE', 40, 40, 0, 48)
text:border('title', 'outline', '000000', 3)
text:borderGradient('title', {'FF3355', '33AAFF'}, 0, 0, 120)   -- 旋转边框
text:borderGradient('logo', {'FFD700', 'FF4400'}, 90, 0.5)       -- 垂直,滑动
text:borderGradient('logo', {'FFD700', 'FF4400'}, 0, 0.4, 0, true)  -- 无限流动

-- 5 停止彩虹边框
text:borderGradient('rainbow', {'FF0000', 'FFAA00', '00FF66', '00AAFF', 'AA66FF'})

-- 不需要 text:border - 直接给样式/大小
text:addBorder('glow', 'outline', 'FFFFFF', 9)
text:borderGradient('glow', {'FFD9A7', 'FB72C0'}, 0, 0.5, 0, true, 'outline', 7)
text:addBorder('glow', 'outline', '943662', 3)   -- 最后绘制,在顶部

-- 堆叠两个独立的渐变环
text:border('ring', 'outline', '000000', 3)
text:borderGradient('ring', {'FF3366', 'FFD23F'})
local outer = text:borderCount('ring') - 1
text:setBorder('ring', outer, { size = 9 })
text:borderGradient('ring', {'00FFAA', '0055FF'})  -- 内环,绘制在顶部
```

### text:borderGradientAngle(tag, angle?)

参数：
- `tag`(String)——文本标签
- `angle`(Float)——渐变方向(度)[默认 0]

返回：Bool

立即将 `text:borderGradient` 制作的边框渐变转到新角度.如果渐变在旋转,旋转停止.当文本没有边框渐变时失败.

```lua
text:borderGradient('title', {'FF3355', '33AAFF'})
text:borderGradientAngle('title', 90)   -- 从上到下
```

### text:borderGradientColors(tag, colors)
*自 v0.6.9*

参数：
- `tag`(String)——已有 `text:borderGradient` 层的文本或字母组
- `colors`(Array<String>)——新渐变停止点(十六进制),最多 6 个

返回：Bool

就地重新着色标签的现有渐变边框层.什么都不重建：没有新层和没有新着色器,滑动/流动/旋转继续运行.当只有颜色改变时使用这个而不是 `text:clearBorders` + `text:borderGradient`,例如在同一徽章的两种样式之间切换.对于普通边框层,用 `text:setBorder(tag, index, {color = ...})` 更改颜色.

```lua
text:borderGradient('badge', {'FFD9A7', 'FB72C0'}, 0, .5, 0, true, 'outline', 6)
text:addBorder('badge', 'outline', '943662', 3)

text:borderGradientColors('badge', {'FBABFF', '82E4FF'})  -- 切换样式
text:setBorder('badge', 1, {color = '4E43AF'})
```

### 单个字母

仅在字母组(`text:letters` / `text:gradient`)上有意义.`idx` 参数是 0 基的,由 `text:count(tag)` 限制.对单文本标签(或超出范围的索引)的调用静默返回 `false`.

### text:letterColor(tag, idx, color)

参数：
- `tag`(String)——组标签
- `idx`(Int)——字母索引(0 基)
- `color`(String)——颜色十六进制

返回：Bool

重新着色单个字母.触发该字母的位图重新渲染——在颜色改变时调用一次,不是每帧.对于每帧颜色循环使用 `text:rainbow` 代替.

```lua
text:letterColor('split', 0, 'FF6699')
text:letterColor('split', 1, '66CCFF')
```

### text:letterFont(tag, idx, ?fontName, ?size)

参数：
- `tag`(String)——组标签
- `idx`(Int)——字母索引
- `fontName`(String)——字体键和完整路径或 `nil` 为默认 [可选]
- `size`(Int)——字体大小(`0` = 不变)[默认 0]

返回：Bool

更改一个字母的字体和可选的大小.触发布局过程,因为字母宽度改变.

```lua
text:letterFont('animated', 3, 'vcr', 48)
```

### text:letterSize(tag, idx, size)

参数：
- `tag`(String)——组标签
- `idx`(Int)——字母索引
- `size`(Int)——新字体大小

返回：Bool

调整一个字母的大小.重新布局组的其余部分.

```lua
text:letterSize('split', 0, 32)
```

### text:letterAlpha(tag, idx, a)

参数：
- `tag`(String)——组标签
- `idx`(Int)——字母索引
- `a`(Float)——目标 alpha(`0`–`1`)

返回：Bool

设置一个字母的透明度.

```lua
text:letterAlpha('split', 0, 0.3)
```

### text:letterPos(tag, idx, x, y)

参数：
- `tag`(String)——组标签
- `idx`(Int)——字母索引
- `x`(Float)——从字母基线 X 的像素偏移
- `y`(Float)——从字母基线 Y 的像素偏移

返回：Bool

从其基线位置(它在自然布局中会有的位置)偏移移动一个字母.设置 `(0, 0)` 恢复它.如果你需要自定义逐字母动画,使用这个；对于常见正弦波,使用 `text:wave`,它更快.

```lua
for i = 0, text:count('animated') - 1 do
    local off = math.sin(t * 4 + i * 0.4) * 8
    text:letterPos('animated', i, 0, off)
end
```

### 渐变着色器

GLSL 片段着色器在现有文本上应用双色渐变.在字母组上 v0.6.8 组合成填充层上有一个着色器,所以渐变横跨整个块——跨字母和跨行——并在 `wave` / `shake` 移动字母下面时保持不动.单文本模式(`text:add`)获得一个横跨整个位图的着色器.

着色器是乘法的——对于白基文本(`text:add` 或 `text:letters` 默认),可见颜色是渐变.对于彩色基(例如带显式停止点的 `text:gradient`),着色器给那些停止点着色.

角度 / 偏移 / 旋转被存储,所以 `text:set` 和打字机重建自动重新应用渐变.

### text:gradientShader(tag, colorA, colorB, ?angle, ?speed, ?rotateSpeed, ?flow)

参数：
- `tag`(String)——文本标签
- `colorA`(String)——起始颜色十六进制
- `colorB`(String)——结束颜色十六进制
- `angle`(Float)——渐变方向(度)(`0` = 水平,`90` = 垂直)[默认 0]
- `speed`(Float)——偏移扫描频率(每秒过渡)(`0` = 静态).使用乒乓补间,所以循环是无缝的.[默认 0]
- `rotateSpeed`(Float)——角度旋转(每秒度数)(正 = 逆时针,负 = 顺时针,`0` = 不旋转)[默认 0]
- `flow`(Bool)——当 `true` 时,动画渐变向一个方向无限流动(无缝循环带)而不是默认的左右乒乓——连续滚动的渐变.仅在 `speed > 0` 时影响运动.交换 `colorA`/`colorB` 以反转流动方向.[默认 false]

返回：Bool

将渐变着色器附加到文本.用相同标签再次调用取消之前的偏移 / 旋转补间并替换着色器.

```lua
-- 静态对角渐变
text:gradientShader('grad2', 'FF66AA', '66AAFF', 45)

-- 动画：粉↔蓝扫描 + 45°/s 旋转
text:gradientShader('grad2', 'FF66AA', '66AAFF', 0, 1.0, 45)

-- 无限流动渐变(ZZZ 风格)
text:gradientShader('grad2', 'FF66AA', '66AAFF', 0, 0.4, 0, true)
```

### text:gradientAngle(tag, ?angle)

参数：
- `tag`(String)——有活动渐变着色器的文本标签
- `angle`(Float)——新角度(度).省略 = `0`.[默认 0]

返回：Bool

对已应用着色器的角度 uniform 的实时设置器.也取消任何活动的旋转补间(手动控制获胜).如果当前没有着色器应用于 `tag` 则返回 `false`.

```lua
if input:keyJustPressed('ONE')   then text:gradientAngle('grad2', 0)  end
if input:keyJustPressed('TWO')   then text:gradientAngle('grad2', 45) end
if input:keyJustPressed('THREE') then text:gradientAngle('grad2', 90) end
```

### text:clearShader(tag)

参数：
- `tag`(String)——文本标签

返回：Bool

移除渐变着色器并取消其偏移 / 旋转补间.存储的着色器规格被忘记,所以未来的重建不会重新应用它.

```lua
text:clearShader('grad2')
```

### 字母效果

由每个标签单个循环补间驱动的一键动画.每个调用取消同一标签上的任何先前效果.效果仅在字母组(`text:letters` / `text:gradient`)上工作.

### text:wave(tag, ?amplitude, ?speed, ?spacing, ?ease)

参数：
- `tag`(String)——组标签
- `amplitude`(Float)——峰值 Y 偏移(像素)[默认 8]
- `speed`(Float)——每秒周期数 [默认 1]
- `spacing`(Float)——相邻字母之间的相位偏移(弧度)(更大 = 更分散)[默认 0.4]
- `ease`(String?)——每个字母上下运动的缓动名称(与 `tw:*` 相同的名称).省略 = 普通正弦波.有缓动时,每个字母沿该曲线底 → 顶 → 底旅行,邻居按 `spacing` 偏移 v0.6.8 [默认正弦]

返回：Bool

在 Y 轴上波动每个字母.将 `amplitude` 或 `speed` 设为 `0` 停止效果并重置字母位置.布局每个滴答重新计算,所以运行中的 `text:set`和`text:letterSpacing` 或字体更改被拾取而不是破坏波.

```lua
text:wave('animated', 8, 0.6)

-- 用任何补间缓动塑造运动
text:wave('animated', 4, 1, .4, 'sineInOut')   -- 柔和,接近正弦
text:wave('animated', 4, 1, .4, 'expoInOut')   -- 字母悬挂,然后快速穿过
text:wave('animated', 4, 1, .4, 'bounceOut')   -- 弹跳落地
```

### text:shake(tag, ?amplitude, ?speed)

参数：
- `tag`(String)——组标签
- `amplitude`(Float)——最大随机偏移(两个轴 ±px)[默认 2]
- `speed`(Float)——每秒滴答数(偏移重新随机化的频率)[默认 30]

返回：Bool

在两个轴上随机抖动每个字母.

```lua
text:shake('alert', 3, 30)
```

### text:rainbow(tag, ?speed, ?spacing)

参数：
- `tag`(String)——组标签
- `speed`(Float)——每秒色相周期数 [默认 0.5]
- `spacing`(Float)——相邻字母之间的色相偏移(`0` = 全部相同色相,`0.2` ≈ 条带)[默认 0.2]

返回：Bool

以配置的速率让每个字母循环通过 HSB 色相.在 GPU 绘制时使用 `setColorTransform`——底层字母位图不重新渲染,所以成本恒定,无论字体大小.

因为色调是乘法的,白基组上的彩虹显示纯彩虹色相；在彩色基组(例如 `text:gradient`)上它调制现有颜色.`text:stopEffect` 将颜色变换重置回中性.

```lua
text:rainbow('rb', 0.4)
```

### text:stopEffect(tag)

参数：
- `tag`(String)——组标签

返回：Bool

取消标签上的活动 `wave` / `shake` / `rainbow`,将字母弹回基线位置,并将颜色变换重置为中性.

```lua
text:stopEffect('animated')
```

### text:reveal(tag, opts)
*自 v0.6.5*

参数：
- `tag`(String)——一个 `text:letters` 组
- `opts`(Table)——选项表,见下文 [可选]

返回：Float

错开 `text:letters` 组的字母,一个接一个,并返回总运行时间(便于链接).每个字母从它自己的布局位置动画,所以多行和居中文本正确错开无需额外处理；行断行和空格永远不会有自己的步骤.选项：

- `mode`(String)——`'fade'`(默认)和`'scale'`和`'fade+scale'` 或 `'move'`(仅位置,无淡出)

- `by`(String)——`'letter'`(默认)和`'word'` 或 `'line'`(整行,包括换行的).`per` 是你选择的单位之间的间隙

- `per`(Float)——步骤之间的秒数(默认 `0.04`)

- `time`(Float)——每个字母的补间长度(默认 `0.3`)

- `offsetX`和`offsetY`(Float)——每字母起始偏移(px)；每个字母从 `home + (offsetX, offsetY)` 滑入位置(默认 `0`)

- `delay`(Float)——第一步之前的秒数(默认 `0`)

- `ease`(String)——缓动名称(默认 `'quadOut'`)

- `onComplete`(Function)——最后一个字母完成后调用一次(像 `tw:*` 的 `onComplete`)

运行中重新触发总是从真实主位置重新开始(从不从被打断的位置),所以它即使从 `onUpdate` 反复调用也不会漂移.`text:set` 和新的 `text:letters` 都取消运行中的 reveal.`mode` 默认为 `'fade'`——传递 `mode = 'move'` 进行无淡出的滑动.

```lua
text:letters('title', 'REACTOR ONLINE', 80, 200, 44)
text:font('title', 'BA_Bold')
sprite:center('title')

-- reveal 放在最后,一旦布局最终确定
text:reveal('title')

-- 上升 + 淡出 + 增长,然后一行完成后开始下一行
text:reveal('title', { mode = 'fade+scale', per = 0.05, time = 0.35, offsetY = 28, ease = 'backOut',
    onComplete = function() text:reveal('subtitle') end })

-- 一个长的换行段落,逐行显示
text:letters('warn', 'Some features are not final and may change before release.', 0, 100, 22)
text:wrap('warn', 550)
text:reveal('warn', { by = 'line', per = 0.15 })
```

### text:revealReset(tag)
*自 v0.6.5*

参数：
- `tag`(String)——一个 `text:letters` 组

返回：Bool

取消运行中的 `text:reveal` 并将每个字母弹到完全显示——alpha `1`和缩放 `1`和主位置.用它强制完成,或在新的 `text:reveal` 之前干净重启.

```lua
text:revealReset('title')
```

### 打字机

由 `FlxTween.num` 驱动的逐字符显示,所以它会随标签自动取消并通过标准补间管理器滴答.在单文本和字母组标签上都工作.在同一标签上重新运行自动取消之前的打字机.

### text:type(tag, content, ?cps)

参数：
- `tag`(String)——文本标签
- `content`(String)——要显示的全部文本
- `cps`(Float)——每秒字符数 [默认 20]

返回：Bool

启动打字机,在 `content.length / cps` 秒内一次一个字符显示 `content`.对于字母组标签,底层字母被重建以匹配新内容(渐变 + 着色器通过标准重建路径重新应用).

```lua
text:type('typer', 'typewriter at 20 cps...', 20)
text:type('typer', 'fast typewriter at 60 cps!!!', 60)
```

### text:typeStop(tag)

参数：
- `tag`(String)——文本标签

返回：Bool

取消活动打字机而不显示内容的其余部分.可见文本冻结在达到的任何分数处.

```lua
text:typeStop('typer')
```

### text:typeSkip(tag)

参数：
- `tag`(String)——文本标签

返回：Bool

取消活动打字机并弹到完全显示状态.

```lua
if input:keyJustPressed('S') then text:typeSkip('typer') end
```

### 跑马灯

`text:marquee` 处理"可能对盒子来说太长的标签"情况：如果文本适合窗口,它只是在那里带着正常对齐；如果溢出,它在窗口内来回滑动,在每端暂停,可选地淡出或遮罩切割边缘.

窗口附加到文本：它从文本自己的 `x` 开始(加上可选的 `left` 偏移)并随它移动,所以同一标签上的 `tw:x`和`tw:y`和`sprite:position` 或相机滚动在滚动时继续工作.滚动本身作为内部偏移和裁剪应用,从不通过写 `x`.

内容更改时(`text:set`和`game:set(tag..'.text')`和`text:font`和`text:size`和`text:letterSpacing`)它会自动重新测量和重启,所以你在创建文本时设置一次——无需每次更新后重新调用,无需稳定计时器.它在 `text:add` 文本和 `text:letters` 组上工作.

隐藏切割边缘的两种方式：

| 选项 | 如何 | 何时使用 |
|---|---|---|
| `fade` | 文本本身在边缘处变得透明 | 任何背景,包括半透明或加法盒和移动背景.默认选择. |
| `mask` | 在每个边缘绘制彩色渐变条 | 已知颜色的平面不透明背景.在半透明背景上,条显示为更暗/更亮的补丁. |

两者都只在文本实际隐藏的那一侧出现：开始时左边缘清晰,结束时右边缘清晰,它们在中间缓入.

### text:marquee(tag, ?width, ?opts)
*自 v0.6.8*

参数：
- `tag`(String)——一个 `text:add` 文本或一个 `text:letters` 组
- `width`(Float?)——窗口宽度(px).`0`/省略 = 文本创建时的字段宽度(`text:add` 的 `width`).字母组需要 [默认字段宽度]
- `opts.size`(Number?)——开始滚动前切换到的字体大小.之后更改大小(`text:size`和`game:set` 或补间)自动重新测量滚动
- `opts.speed`(Float?)——滚动速度(px/秒)[默认 25]
- `opts.delay`(Float?)——每端暂停,秒(也是第一次移动前的等待)[默认 1]
- `opts.ease`(String?)——每个来回腿的缓动(任何 `tw:*` 缓动名称)[默认 'sineInOut']
- `opts.fade`(Float?)——切割边缘的透明淡出宽度(px).`0` = 硬裁剪 [默认 0]
- `opts.fadeEase`(String?)——淡出曲线(和遮罩渐变)的形状,任何缓动名称.`'quadIn'` 使边缘几乎不可见更久,`'quadOut'` 使文本更接近边缘保持可读 [默认 'linear']
- `opts.mask`(String?)——在每个切割边缘绘制渐变条的颜色(十六进制或像 `'black'` 这样的颜色名).省略为无遮罩
- `opts.maskWidth`(Float?)——每个遮罩条的宽度(px)[默认 fade,否则 16]
- `opts.maskPad`(Float?)——文本上方和下方的额外遮罩高度(px)[默认 2]
- `opts.left`(Float?)——将窗口向右移出文本的 `x`(px)——用于盒子内嵌的窗口 [默认 0]
- `opts.align`(String?)——文本适合时使用的对齐(`'left'` / `'center'` / `'right'`).省略 = 保持文本自己的对齐 [默认保持]

返回：Bool——如果文本溢出并滚动则为 `true`,如果适合则为 `false`

在文本上设置(或替换)跑马灯.溢出时,文本在窗口中左对齐并以 `speed` 滑动；当之后内容适合时,原始字段宽度和对齐回来.在同一标签上再次调用替换设置并保持原始布局.为新的对象重用的标签自动丢弃其跑马灯.

跑马灯在 `shader:perspective` 下工作：倾斜保持固定在窗口上,而文本在它下面滚动,`fade` 跟随倾斜边缘.打开 `shader:perspectiveDebug` 查看窗口的轮廓和角落.

```lua
-- 歌曲卡片下的作者行：180px 窗口,慢,柔和边缘
text:add('art', 'by math & demonstep ft. alwk', 250, 400, 0, 15)
text:marquee('art', 180, {speed = 12, delay = 1.5, fade = 14})
text:set('art', 'by someone')   -- 现在适合：停止并静止,无需重新调用

-- 盒子内的值：窗口 = 文本自己的字段宽度,适合时居中
text:add('value', '', 502, 120, 90, 24); text:align('value', 'center')
text:marquee('value', 0, {speed = 22, delay = 0.5, ease = 'linear', fade = 14})

-- 平面不透明背景：彩色遮罩而不是透明度
text:marquee('ticker', 300, {mask = '101018', maskWidth = 30, fadeEase = 'sineInOut'})

-- 也在字母组上工作,与边框和波一起
text:letters('title', 'A VERY LONG TITLE THAT DOES NOT FIT', 100, 50, 24)
text:addBorder('title', 'outline', '000000', 3)
text:wave('title', 2, 1, .4)
text:marquee('title', 220, {fade = 20})

-- 从 text:autoMarquee(tag, x, y, w, h, 14, ...) 迁移：
-- 在盒子的 x 处创建宽度为 w 的文本,然后调用一次 text:marquee(tag, 0, {fade = 14})

-- 倾斜的新闻牌：轻微透视加滚动标题
text:add('news', 'UPDATE 3.0 IS OUT! NEW SONGS, NEW CHARACTERS AND MORE', 300, 600, 400, 32)
shader:perspective('news', -0.25, 0, -0.5, 0.5)
text:marquee('news', 400, {speed = 60, delay = 1, fade = 24})
```

### text:marqueePause(tag, paused)
*自 v0.6.8*

参数：
- `tag`(String)——有运行中 `text:marquee` 的标签
- `paused`(Bool?)——`false` 恢复 [默认 true]

返回：Bool

停止滚动文本在它所在的位置,或让它继续.

```lua
function onUnselect(tag)
    text:marqueePause(tag, true)
end
```

### text:marqueeReset(tag)
*自 v0.6.8*

参数：
- `tag`(String)——有运行中 `text:marquee` 的标签

返回：Bool

跳回开始并再次等待 `delay`.适合行被选中时.

```lua
function onSelect(tag)
    text:marqueeReset(tag)
end
```

### text:marqueeSpeed(tag, speed)
*自 v0.6.8*

参数：
- `tag`(String)——有运行中 `text:marquee` 的标签
- `speed`(Float)——像素每秒

返回：Bool

更改速度而不重启.

```lua
text:marqueeSpeed('songName', 40)
```

### text:marqueeStop(tag)
*自 v0.6.8*

参数：
- `tag`(String)——要停止的标签

返回：Bool

移除跑马灯：偏移和裁剪和淡出和遮罩被清除,文本回到其原始宽度和对齐.如果标签没有跑马灯则返回 `false`.状态切换自行清除所有跑马灯.

```lua
text:marqueeStop('art')
```

### text:marqueeStopAll()
*自 v0.6.8*

返回：Bool

从每个文本移除跑马灯,例如在重建整个列表之前.

```lua
function onCategoryChange()
    text:marqueeStopAll()
    -- 在这里重建行
end
```

### text:marqueeActive(tag)
*自 v0.6.8*

参数：
- `tag`(String)——文本标签

返回：Bool——文本溢出其窗口并滚动期间为 `true`

跑马灯当前是否滚动.文本适合时(或没有跑马灯)为 `false`.用它显示"更多"提示或为长值选择不同的布局.

```lua
if text:marqueeActive('art') then
    game:set('moreIcon.visible', true)
end
```

### text:marqueeDebug(?enabled)
*自 v0.6.8*

参数：
- `enabled`(Bool?)——显示或隐藏窗口轮廓 [默认 true]

返回：Bool

描边每个跑马灯窗口：文本溢出并滚动时红色,适合时酸橙绿.与 `debug:scroll` 和 `debug:overlay` 的滚动部分相同的视觉.

```lua
text:marqueeDebug(true)
```

### 文本输入

玩家可以输入的文本字段：名字和聊天行和IP 地址和代码.点击它开始输入.退格删除(按住继续删除),Ctrl+V 粘贴,Enter 确认,Esc 只是离开字段.字段活动时,游戏自己的键和键位被关闭,所以输入 W 不会移动任何东西.它是普通文本,所以 `text:font`和`text:border`和`text:camera` 和其余都在它上工作.

### text:input(tag, x, y, width, placeholder, size, color)

参数：
- `tag`(String)——对象标签
- `x`(Float)——X 位置 [默认 0]
- `y`(Float)——Y 位置 [默认 0]
- `width`(Float)——字段宽度(像素)[默认 200]
- `placeholder`(String)——字段为空且未聚焦时显示的灰色提示文本 [可选]
- `size`(Int)——字体大小 [默认 16]
- `color`(String)——文本颜色(十六进制)[默认白色]

返回：Bool

在 `(x, y)` 处创建可聚焦的文本输入字段.点击它开始输入.它像任何其他标记文本对象一样行为——用 `sprite:position` / `game:set` 移动它,用 `sprite:camera` 放到相机上,用 `text:*` 格式化器设置样式.用 `text:inputGet` 读取玩家输入的内容.

```lua
text:input('name', 200, 300, 280, 'enter your name...', 24)
text:font('name', 'myfont'); text:camera('name', 'hud')
```

### text:inputGet(tag)

参数：
- `tag`(String)——输入字段标签

返回：String

返回玩家输入的当前文本(不含光标或占位符).如果字段为空则为空字符串.

```lua
if input:keyJustPressed('ENTER') then
    local name = text:inputGet('name')
    print('hello ' .. name)
end
```

### text:inputSet(tag, str)

参数：
- `tag`(String)——输入字段标签
- `str`(String)——新内容

返回：Bool

以编程方式替换字段的内容(例如预填保存的名字,或用 `''` 清除它).

```lua
text:inputSet('name', game:get('savedName'))
text:inputSet('chat', '')  -- 发送后清除
```

### text:inputFocus(tag, on)

参数：
- `tag`(String)——输入字段标签
- `on`(Bool)——`true` 聚焦(开始捕获输入),`false` 失焦 [默认 true]

返回：Bool

从脚本聚焦或失焦字段,而不是等待点击——例如菜单打开时自动聚焦名称框.聚焦一个字段会使之前聚焦的字段失焦.

```lua
text:inputFocus('name')        -- 在这里开始输入
text:inputFocus('name', false) -- 停止
```

### text:inputFocused(tag)

参数：
- `tag`(String)——输入字段标签

返回：Bool

当此字段是正在输入的字段时为 `true`.输入时游戏键已经关闭,所以你主要需要这个用于你自己的鼠标或触控控制.

```lua
if not text:inputFocused('name') then
    handleMovement()
end
```

### text:inputOn(tag, event, fn)
*自 v0.7.6*

参数：
- `tag`(String)——输入字段标签
- `event`(String)——`change`和`submit`和`focus` 或 `blur`
- `fn`(Function)——获取当前文本.传递 `nil` 以移除它

返回：Bool

`change` 在每个输入和删除或粘贴的字符上运行,`submit` 在玩家按 Enter 时运行,`focus` 和 `blur` 在字段开始和停止接收键时运行.如果你宁愿在一个地方处理所有字段,使用 `onInputChange(tag, value)` 和 `onInputSubmit(tag, value)` 代替.

```lua
text:inputOn('chat', 'submit', function(value)
    net:send('chat', {text = value})
    text:inputSet('chat', '')
end)
```

### text:inputAllow(tag, chars)
*自 v0.7.6*

参数：
- `tag`(String)——输入字段标签
- `chars`(String)——可以输入哪些字符：`'ip'`和`'digits'`和`'letters'` 或你自己的集合像 `'0-9a-fA-F'`.省略以允许一切 [可选]

返回：Bool

其他任何东西被跳过,包括粘贴的文本.

```lua
text:inputAllow('ip', 'ip')
text:inputAllow('code', 'A-Z0-9')
```

### text:inputMax(tag, length)
*自 v0.7.6*

参数：
- `tag`(String)——输入字段标签
- `length`(Int)——允许的最长文本,`0` 为无限制 [默认 0]

返回：Bool

阻止字段增长超过这么多字符.

```lua
text:inputMax('name', 16)
```

### 示例：按 IP 加入

一个只接受地址的字段,在看起来像地址之前变红,记住最后一个并在 Enter 时加入.端口可以省略,默认为 7777.

---

## 字母函数

用图集中的精灵字母组成的文本,像 Funkin' 菜单中的那样.可以直接使用 Psych Engine 的 `alphabet` 图集,也可以使用你自己的.

### 工作原理

每个字符变成一个独立的动画精灵,从 `images/<image>.png` 和 `.xml` 中切出.整个文本是一个标签,像精灵一样移动和缩放和淡出,每个字母也有自己的标签：`title_1`和`title_2`……按它们出现的顺序(跳过空格),所以任何 sprite和补间和颜色或着色器函数都可以作用于单个字母.

一个字符使用哪个帧.对于 Psych 图集：粗体字母用 `a bold`,普通字母用 `a lowercase` / `a uppercase`,数字和符号用 `1 bold` / `1 normal`,一些符号有名称(`question`和`period`和`comma`和`apostrophe`和`exclamation`和`quote`和`forward slash`……).任何其他图集也可以工作,只要其帧按字符命名(`A`和`b`和`7`)；对于不同名称使用 `alphabet:map`.

字母站在一条基线上；引号和 `^` 位于顶部,`-` `+` `~` 在中间,普通字体的 `g j p q y` 悬挂在下方.没有帧的字符被省略并由 `alphabet:missing` 列出.

### alphabet:add(tag, text, x, y, bold, image, priority)
*自 v0.7.7*

参数：
- `tag`(String)——文本标签
- `text`(String)——写什么.`\n` 开始新行
- `x`(Float?)——左边缘 [默认 0]
- `y`(Float?)——顶边缘 [默认 0]
- `bold`(Bool?)——`true` 使用粗体动画字母,`false` 使用普通字体 [默认 true]
- `image`(String?)——`images/` 下的图集 [默认 "alphabet"]
- `priority`(Int|String?)——层,见 `sprite:priority` [默认 0]

返回：Bool

创建文本.

```lua
alphabet:add('title', 'Freak Engine!', 60, 40)
alphabet:add('hint', 'Press Enter', 60, 600, false)
```

### alphabet:text(tag, text)
*自 v0.7.7*

参数：
- `tag`(String)——字母标签
- `text`(String)——新文本

返回：Bool

更改写的内容.颜色保留；字母标签为新文本重新创建.

```lua
alphabet:text('score', 'Score: '..score)
```

### alphabet:bold(tag, on)
*自 v0.7.7*

参数：
- `tag`(String)——字母标签
- `on`(Bool?)——粗体或普通字体 [默认 true]

返回：Bool

在粗体和普通字体之间切换.

### alphabet:image(tag, image)
*自 v0.7.7*

参数：
- `tag`(String)——字母标签
- `image`(String)——`images/` 下的另一个图集

返回：Bool

使用另一个字母图集.

### alphabet:size(tag, scale)
*自 v0.7.7*

参数：
- `tag`(String)——字母标签
- `scale`(Float)——`1` 是图集中的大小

返回：Bool

缩放字母和它们之间的间隙,不像整个文本上的 `sprite:scale`.

```lua
alphabet:size('hint', 0.6)
```

### alphabet:spacing(tag, letter, space, line)
*自 v0.7.7*

参数：
- `tag`(String)——字母标签
- `letter`(Float?)——字母之间的额外间隙 [默认 0]
- `space`(Float?)——空格的宽度 [默认 40]
- `line`(Float?)——行之间的额外间隙 [默认 10]

返回：Bool

设置间隙,以图集像素为单位；它们随 `alphabet:size` 缩放.

### alphabet:align(tag, alignment)
*自 v0.7.7*

参数：
- `tag`(String)——字母标签
- `alignment`(String?)——`"left"`和`"center"` 或 `"right"` [默认 "left"]

返回：Bool

对齐多行文本的行.

```lua
alphabet:add('menu', 'Story Mode\nFreeplay\nOptions', 0, 200)
alphabet:align('menu', 'center')
sprite:center('menu', 'x')
```

### alphabet:fps(tag, fps)
*自 v0.7.7*

参数：
- `tag`(String)——字母标签
- `fps`(Float)——字母的动画速度,`0` 停止它们

返回：Bool

设置动画字母播放的速度.

### alphabet:color(tag, color, from, to)
*自 v0.7.7*

参数：
- `tag`(String)——字母标签
- `color`(String)——十六进制颜色
- `from`(Int?)——第一个字母,从 1 开始计数.省略以着色整个文本
- `to`(Int?)——最后一个字母 [默认 from]

返回：Bool

为整个文本或其一些字母着色.粗体字体被着色,所以其描边保持深色；普通字体是黑色,用颜色填充.文本更改时颜色保留.

```lua
alphabet:color('title', 'FFFFFF')
alphabet:color('title', 'FFDD44', 1, 5)
```

### alphabet:gradient(tag, first, last)
*自 v0.7.7*

参数：
- `tag`(String)——字母标签
- `first`(String)——第一个字母的颜色
- `last`(String)——最后一个字母的颜色

返回：Bool

从一种颜色到另一种颜色为字母着色.

```lua
alphabet:gradient('title', 'FF4466', '44CCFF')
```

### alphabet:resetColor(tag)
*自 v0.7.7*

参数：
- `tag`(String)——字母标签

返回：Bool

恢复图集的颜色.

### alphabet:count(tag)
*自 v0.7.7*

参数：
- `tag`(String)——字母标签

返回：Int

字母的数量,也是最高字母标签编号.

```lua
for i = 1, alphabet:count('title') do
    game:set('title_'..i..'.angle', i % 2 == 0 and 5 or -5)
end
```

### alphabet:missing(tag)
*自 v0.7.7*

参数：
- `tag`(String)——字母标签

返回：String

在图集中没有帧的字符,一切找到时为空.

### alphabet:map(image, char, frame, style)
*自 v0.7.7*

参数：
- `image`(String)——规则适用的图集
- `char`(String)——一个字符
- `frame`(String)——它在 XML 中的动画名称,不带帧编号
- `style`(String?)——`"bold"` 或 `"normal"` 仅用于一种字体

返回：Bool

告诉哪个帧绘制一个字符,用于你自己的有自己名称的字母表.使用该图集的文本立即更新.

```lua
alphabet:map('myfont', 'a', 'letter A')
alphabet:map('myfont', '?', 'what', 'bold')
alphabet:add('t', 'a?', 100, 100, true, 'myfont')
```

### alphabet:offset(image, char, x, y)
*自 v0.7.7*

参数：
- `image`(String)——图集
- `char`(String)——一个字符
- `x`(Float)——向右移动,以图集像素为单位
- `y`(Float)——向下移动,以图集像素为单位

返回：Bool

当图集的一个字符位置太高或太低时微调它.

```lua
alphabet:offset('alphabet', '-', 0, -6)
```

---

## 波形函数

在声音播放时绘制它：示波器线和频谱条和镜像形状或你自己的数字.波形是普通标记精灵.

### 工作原理

波形是一个精灵,在声音推进时重绘自己的图片.由于它是普通精灵,其他一切继续在它上工作：用 `sprite:camera` 放到任何相机,用 `game:set` 移动它,用 `tw:*` 动画它,用 `shader:*` 着色或混合它.它用普通矩形绘制,所以即使弱计算机也能同时处理几个.

它读取四种数据之一：
- `wave`：声音本身,示波器显示的方式.用于 `scope` 和 `line`.
- `spectrum`：每个频带的响度,从低到高.用于其他样式.
- `history`：声音在过去时刻的响度,最新的在右边.
- `frequency`：声音在过去时刻的音高,最新的在右边.低音靠近底部,踩镲和高声乐靠近顶部,静音降到零 v0.7.9
- `custom`：你用 `wave:data` 给它的数字.

源是 `song`(伴奏)和`vocals`和`opponent`和`music` 或来自 `music:play` 或来自 `sound:playTag` 的轨道的标签.

### 样式

| 样式 | 看起来像 | 默认数据 |
|---|---|---|
| `scope` | 中间线上有深色描边的线,像示波器 | `wave` |
| `line` | 只是线 | `wave` |
| `bars` | 从底部上升的条 | `spectrum` |
| `mirror` | 围绕中间镜像的形状 | `spectrum` |
| `peaks` | 从底部填充的山线 | `spectrum` |
| `dots` | 堆叠的点,像老式均衡器 | `spectrum` |

### wave:add(tag, x, y, width, height, style, source, priority)
*自 v0.7.7*

参数：
- `tag`(String)——新标签
- `x`(Number)——左边缘
- `y`(Number)——顶边缘
- `width`(Int)——宽度(像素)
- `height`(Int)——高度(像素)
- `style`(String?)——上面的样式之一 [默认 'scope']
- `source`(String?)——`song`和`vocals`和`opponent`和`music` 或音乐/声音标签 [默认 'song']
- `priority`(String|Number?)——绘制层：`'back'`和`'middle'`和`'front'` 或数字 [可选]

返回：Bool

创建波形并立即开始绘制它.

```lua
wave:add('osc', 140, 60, 1000, 260, 'scope')
wave:color('osc', '9E1B1B', '3A0606')
wave:thickness('osc', 3)
```

### wave:style(tag, style)
*自 v0.7.7*

参数：
- `tag`(String)——波形标签
- `style`(String)——上面的样式之一

返回：Bool

切换到另一种样式.数据类型保持不变,所以从 `scope` 切换到 `bars` 后你可能还需要 `wave:source(tag, source, 'spectrum')`.

```lua
wave:style('osc', 'mirror')
wave:source('osc', 'song', 'spectrum')
```

### wave:source(tag, source, kind)
*自 v0.7.7*

参数：
- `tag`(String)——波形标签
- `source`(String)——声音来自哪里
- `kind`(String?)——`wave`和`spectrum`和`history`和`frequency` 或 `custom`.省略以保持当前的 [可选]

返回：Bool

更改波形监听哪个声音,以及从它读取什么.

`spectrum` 以耳朵听到的方式显示每个频带：频带从 20 Hz 到 16 kHz 按八度分布,以分贝测量,并抹平高频的自然响度下降,所以低音不会压倒一切,高频仍然可见.v0.7.9 你自己的数学的原始数字保留在 `audio:spectrum` 中.

```lua
music:play('menu', 'freakyMenu')
wave:source('osc', 'menu')
wave:source('meter', 'vocals', 'history')
wave:source('pitch', 'vocals', 'frequency')
```

### wave:data(tag, values)
*自 v0.7.7*

参数：
- `tag`(String)——波形标签
- `values`(Table)——数字列表.高度用 `0..1`,或围绕中间的线用 `-1..1`

返回：Bool

绘制你自己的数字而不是声音.值的数量变成点的数量.每当数字变化时再次调用它,例如每帧.

```lua
local t = 0
function onUpdate(dt)
    t = t + dt
    local values = {}
    for i = 1, 64 do
        values[i] = math.sin(t * 3 + i * 0.3) * 0.8
    end
    wave:data('custom', values)
end
```

### wave:color(tag, color, outline)
*自 v0.7.7*

参数：
- `tag`(String)——波形标签
- `color`(String)——主色
- `outline`(String?)——`scope` 的描边和中间线 [可选]

返回：Bool

设置颜色.通过 `game:set(tag..'.alpha', ...)` 和 `color:*` 淡出和着色整个波形也工作.

```lua
wave:color('osc', 'FFFFFF', '000000')
```

### wave:freq(tag, on, low, mid, high)
*自 v0.7.9*

参数：
- `tag`(String)——波形标签
- `on`(Bool?)——`false` 回到单一主色 [默认 true]
- `low`(String?)——低音颜色 [默认 FF3B3B]
- `mid`(String?)——中间颜色 [默认 3BFF6A]
- `high`(String?)——高频颜色 [默认 3B8BFF]

返回：Bool

按频率着色波形而不是一种颜色,所以你可以看到正在播放什么而不仅是多响.`history` 和 `frequency` 按每个时刻的低音和中间和高频混合为其着色：底鼓将条涂成红色,人声绿色,踩镲蓝色.`spectrum` 样式将每个频带从低到高着色.`wave`(`scope`和`line`)按当前播放的内容重新着色整条线.主色的 alpha 仍然适用.

```lua
wave:add('meter', 40, 600, 600, 80, 'mirror', 'song')
wave:source('meter', 'song', 'history')
wave:count('meter', 120)
wave:freq('meter')

wave:add('pitch', 40, 500, 600, 80, 'line', 'vocals')
wave:source('pitch', 'vocals', 'frequency')
wave:freq('pitch', true, 'FF6060', 'FFFFFF', '60C0FF')
```

### wave:thickness(tag, px)
*自 v0.7.7*

参数：
- `tag`(String)——波形标签
- `px`(Number)——线宽(像素),至少 1

返回：Bool

`scope` 和 `line` 的线宽.

```lua
wave:thickness('osc', 4)
```

### wave:count(tag, count)
*自 v0.7.7*

参数：
- `tag`(String)——波形标签
- `count`(Int)——从 2 到 512

返回：Bool

波形有多少点或条.点越多线看起来越平滑,条越少看起来越粗厚.

```lua
wave:count('eq', 24)
```

### wave:gain(tag, gain)
*自 v0.7.7*

参数：
- `tag`(String)——波形标签
- `gain`(Number)——高度乘数,1 是正常

返回：Bool

使安静的声音看起来更大,或响亮的声音更小.

```lua
wave:gain('osc', 2.5)
```

### wave:smooth(tag, amount)
*自 v0.7.7*

参数：
- `tag`(String)——波形标签
- `amount`(Number)——`0` 完全跟随声音,`1` 移动非常柔和

返回：Bool

柔化帧之间的快速变化.条和其他频谱样式从 `0.5` 开始,示波器从 `0` 开始.

```lua
wave:smooth('eq', 0.8)
```

### wave:window(tag, ms)
*自 v0.7.7*

参数：
- `tag`(String)——波形标签
- `ms`(Number)——一个屏幕显示多少声音,以毫秒为单位

返回：Bool

波形显示多少声音,以毫秒为单位.歌曲播放时图片保持从右到左滑动.短窗口(约 `20`-`80`)绘制平滑线,可以看到单个波,长窗口(`500`-`2000`)将声音打包成密集的移动墙.默认 `200`.

```lua
wave:window('osc', 40)    -- 平滑,宽波
wave:window('osc', 1500)  -- 密集,一次大量声音
```

### wave:trigger(tag, on)
*自 v0.7.7*

参数：
- `tag`(String)——波形标签
- `on`(Bool?)——`false` 回到滑动 [默认 true]

返回：Bool

像实验室示波器一样保持图片静止：每帧从声音穿过中间线的地方开始,所以稳定音调站在原地而不是滑动.最适合短窗口.

```lua
wave:trigger('osc')
wave:window('osc', 30)
```

### wave:size(tag, width, height)
*自 v0.7.7*

参数：
- `tag`(String)——波形标签
- `width`(Int)——新宽度(像素)
- `height`(Int)——新高度(像素)

返回：Bool

更改绘图区域而不拉伸图片.要拉伸它,使用 `sprite:scale`.

```lua
wave:size('osc', 600, 120)
```

### 示例：歌曲下方的可视化器

HUD 相机上的细示波器在均衡器上方,随节拍脉动.

---

## 视频函数

在屏幕上播放视频文件,带声音.视频是普通标记精灵.

### 工作原理

将 `.mp4` 文件放在 `assets/videos` 中.`video:add` 打开一个并显示其第一帧,`video:play` 启动它.因为视频是普通精灵,其他一切在它上工作：`sprite:camera`和`sprite:center`和`game:set(tag..'.alpha', ...)`和`tw:*`和`shader:*` 和混合模式.

世界冻结时(`game:freeze`和P 键)和歌曲暂停时以及窗口在后台时(如果 `FlxG.autoPause` 开启),视频自行暂停.所有这些结束后它继续.它的声音遵循游戏音量和静音.屏幕切换时视频关闭.

### video:add(tag, path, x, y, priority)
*自 v0.7.7*

参数：
- `tag`(String)——新标签
- `path`(String)——`assets/videos` 中的文件名,`.mp4` 可以省略
- `x`(Number?)——左边缘 [默认 0]
- `y`(Number?)——顶边缘 [默认 0]
- `priority`(String|Number?)——绘制层：`'back'`和`'middle'`和`'front'` 或数字 [可选]

返回：Bool

打开视频并显示其第一帧.如果文件缺失或无法解码则返回 `false`.

```lua
video:add('intro', 'intro')
sprite:center('intro')
video:play('intro')
```

### video:play(tag)
*自 v0.7.7*

参数：
- `tag`(String)——视频标签

返回：Bool

启动视频,或暂停后继续它.

```lua
video:play('intro')
```

### video:pause(tag)
*自 v0.7.7*

参数：
- `tag`(String)——视频标签

返回：Bool

在当前帧暂停.

```lua
if input:keyJustPressed('SPACE') then video:pause('intro') end
```

### video:resume(tag)
*自 v0.7.7*

参数：
- `tag`(String)——视频标签

返回：Bool

与 `video:play` 相同.

```lua
video:resume('intro')
```

### video:stop(tag)
*自 v0.7.7*

参数：
- `tag`(String)——视频标签

返回：Bool

停止并回到开始.

```lua
video:stop('intro')
```

### video:seek(tag, seconds)
*自 v0.7.7*

参数：
- `tag`(String)——视频标签
- `seconds`(Number)——跳到哪里

返回：Bool

跳到视频中的一个时间.

```lua
video:seek('intro', video:time('intro') + 5)
```

### video:time(tag)
*自 v0.7.7*

参数：
- `tag`(String)——视频标签

返回：Number

当前位置(秒).

```lua
text:set('clock', string.format('%.1f', video:time('intro')))
```

### video:length(tag)
*自 v0.7.7*

参数：
- `tag`(String)——视频标签

返回：Number

视频长度(秒).

```lua
local left = video:length('intro') - video:time('intro')
```

### video:playing(tag)
*自 v0.7.7*

参数：
- `tag`(String)——视频标签

返回：Bool

视频运行期间为 `true`.

```lua
if not video:playing('intro') then video:play('intro') end
```

### video:loop(tag, on)
*自 v0.7.7*

参数：
- `tag`(String)——视频标签
- `on`(Bool?)——`false` 只播放一次 [默认 true]

返回：Bool

每次结束时从头再次播放视频.

```lua
video:loop('bgLoop')
```

### video:volume(tag, value)
*自 v0.7.7*

参数：
- `tag`(String)——视频标签
- `value`(Number)——0 到 1

返回：Bool

视频的音量,在游戏音量之上.

```lua
video:volume('intro', 0.6)
```

### video:speed(tag, speed)
*自 v0.7.7*

参数：
- `tag`(String)——视频标签
- `speed`(Float)——`1` 是正常,`2` 两倍快,`0.5` 一半.从 `0.25` 到 `4`

返回：Bool

更改视频播放的速度.它的声音也加速或减速并改变音高,像另一速率的歌曲,所以它们保持同步.

```lua
video:add('cut', 'intro')
video:play('cut')
video:speed('cut', 1.5)
```

### video:size(tag, width, height)
*自 v0.7.7*

参数：
- `tag`(String)——视频标签
- `width`(Number)——宽度(像素)
- `height`(Number?)——高度(像素).省略以保持形状 [可选]

返回：Bool

在屏幕上调整视频大小.

```lua
video:size('intro', 1280, 720)
```

### video:skippable(tag, key)
*自 v0.7.7*

参数：
- `tag`(String)——视频标签
- `key`(String|Bool?)——键名称,`false` 关闭跳过.省略为 Enter和Space 或 Esc [可选]

返回：Bool

让玩家跳过视频.跳过结束它的方式与播放到结束相同.

```lua
video:skippable('intro')
```

### video:onEnd(tag, fn)
*自 v0.7.7*

参数：
- `tag`(String)——视频标签
- `fn`(Function)——获取标签以及是否被跳过

返回：Bool

视频结束时运行函数.每个脚本也得到 `onVideoEnd(tag, skipped)`.

```lua
video:onEnd('intro', function(tag, skipped)
    sprite:remove(tag)
    song:play('tutorial', {script = 'game'})
end)
```

### video:supported()
*自 v0.7.7*

返回：Bool

此构建是否可以播放视频.

```lua
if video:supported() then video:add('intro', 'intro') end
```

### 示例：歌曲前的过场动画

淡入视频,让玩家跳过它,然后开始歌曲.

---

## 条函数

基于标签的进度条(HP和耐力和歌曲进度和充能计).基于 `FlxBar`,具有目标/显示分离——你设置目标,条的显示值在四种动画模式之一下追赶.

### 条如何工作

每个条是一个标记的 `FlxBar`,有两个值：`target`(你想它显示的,通过 `bar:value` 设置)和当前显示的值,它根据条的模式每帧向目标前进.

| 模式 | 行为 | 速度参数 |
|---|---|---|
| `instant`(默认) | 立即弹到目标. | — |
| `lerp` | 每帧向目标缓动. | 每秒 lerp 速率(默认 `10`).更高 = 更灵敏. |
| `pixel` | 按固定像素速率前进. | 每秒条宽度的像素(默认 `200`). |
| `manual` | 无动画；`bar:value` 直接写显示. | — |

范围默认为 `0..1`,所以典型的血条可以通过 `bar:range` 扩大它,或通过 `bar:percent(tag, 0..100)` 驱动它.重用标签会逐出前一个条.

### 通过 game:get / game:set 的条字段

除了 `bar:*` 助手,条的参数可以通过 game:get / game:set 的点分路径读取和写入——便于补间条的外观或内联读取进度.颜色接受十六进制字符串或 ARGB int；设置需要重绘的颜色(厚度和半径和颜色和角度)立即重绘条.由于条也是精灵,所有通常的精灵字段(`x`和`y`和`alpha`和`scale.x`和`angle`……)也工作.

| 路径 | 类型 | R/W | 备注 |
|---|---|---|---|
| `tag.value` | Float | R/W | 写入向它动画(像 `bar:value`) |
| `tag.now` | Float | W | 立即设置显示值(无动画) |
| `tag.target` | Float | R/W | 正在缓动到的值 |
| `tag.progress` | Float 0–1 | R/W | 归一化填充分数 |
| `tag.percent` | Float 0–100 | R/W | 与 progress × 100 相同 |
| `tag.min` / `tag.max` | Float | R/W | 范围端 |
| `tag.mode` | String | R/W | `instant`/`lerp`/`pixel`/`manual` |
| `tag.speed` | Float | R/W | Lerp 速率或像素速度(按模式) |
| `tag.fillColor` / `tag.emptyColor` | Color | R/W | 十六进制字符串或 ARGB int；重绘 |
| `tag.thickness` | Float | R/W | 仅圆形——环厚度(`0` = 全圆盘) |
| `tag.radius` | Float | R/W | 仅圆形——调整图形大小 |
| `tag.startAngle` | Float | R/W | 仅圆形——度数；填充从哪里开始 |
| `tag.clockwise` | Bool | R/W | 仅圆形 |

注意：`tag.angle` 保持精灵旋转(不是填充开始)——使用 `tag.startAngle` 作为圆形条的填充起点.

### 创建条

### bar:add(tag, x, y, w, h, emptyColor, fillColor)

参数：
- `tag`(String)——新条标签(逐出此标签处的任何精灵/条)
- `x`(Number)——世界 x
- `y`(Number)——世界 y
- `w`(Int)——条宽度(像素)
- `h`(Int)——条高度(像素)
- `emptyColor`(String?)——空部分的十六进制颜色(默认 `333333`)
- `fillColor`(String?)——填充部分的十六进制颜色(默认 `00FF66`)

返回：Bool

创建水平从左到右的条.范围从 `0..1` 开始,模式为 `instant`.条底层是 `FlxSprite`,所以 `sprite:position`和`sprite:scale`和`sprite:camera`和`scroll:lock` 等都针对同一标签工作.

```lua
bar:add('hp', 20, 20, 120, 12, '330000', 'FF4444')
scroll:lock('hp')   -- HUD 锁定
bar:range('hp', 0, 100)
bar:value('hp', 100)
```

### bar:image(tag, emptyImage, fillImage)
*自 v0.5.9*

参数：
- `tag`(String)——条标签(用 `bar:add` 制作)
- `emptyImage`(String?)——空部分的图像键.省略以保持该部分为实心颜色 [可选]
- `fillImage`(String?)——填充部分的图像键.省略以保持该部分为实心颜色 [可选]

返回：Bool

将条的纯色换成图像,所以它看起来像真实的血条框架而不是彩色矩形.给一个图像或两个；你跳过的保持实心颜色.之后 `bar:colors` 继续工作并给图像着色而不是替换它们.

仅矩形条(`bar:add`).圆形条是手工绘制的,不能使用图像.

```lua
bar:add('hp', 20, 20, 200, 24)
bar:image('hp', 'ui/hp_empty', 'ui/hp_fill')
bar:value('hp', 80)

-- 之后,低生命值：给图像着色而不是替换它们
bar:colors('hp', '330000', 'FF3333')
```

### bar:clearImage(tag)
*自 v0.5.9*

参数：
- `tag`(String)——条标签

返回：Bool

移除用 `bar:image` 设置的图像并回到纯色.

```lua
bar:clearImage('hp')
```

### bar:circular(tag, x, y, radius, emptyColor, fillColor, thickness)

参数：
- `tag`(String)——新条标签(逐出此标签处的任何精灵/条)
- `x`(Number)——世界 x(条正方形的左上角)
- `y`(Number)——世界 y
- `radius`(Number)——圆半径(像素)(精灵是 `2*radius` 正方形)
- `emptyColor`(String?)——空轨道的十六进制颜色(默认 `333333`)
- `fillColor`(String?)——填充弧的十六进制颜色(默认 `00FF66`)
- `thickness`(Number?)——环宽度(像素).`0`(默认)填充实心饼；任何正值绘制该厚度的环

返回：Bool

创建圆形 / 径向进度条——填充饼或随值扫过的环.与线性条共享整个 `bar:*` 表面(相同的 `IProgressBar`)不变,仅在值变化时重绘.使用 bar:angle 设置起始角度 / 方向——`bar:direction` 仅线性,`bar:angle` 仅圆形.

```lua
bar:circular('health', 600, 40, 60, '330000', 'FF0044', 12)  -- 环,12px 厚
bar:angle('health', -90, true)   -- 从顶部开始,顺时针
bar:mode('health', 'lerp', 6)
bar:range('health', 0, 100)
bar:percent('health', 75)
```

### bar:angle(tag, startAngle, clockwise)

参数：
- `tag`(String)——圆形条标签
- `startAngle`(Number)——填充开始的度数.`-90` = 顶,`0` = 右,`90` = 底
- `clockwise`(Bool?)——扫过方向(默认 `true` = 顺时针)

返回：Bool

设置圆形条从哪里开始填充以及向哪个方向扫过.仅圆形条——在线性条上失败.

```lua
bar:angle('health', -90, true)   -- 经典顶部开始,顺时针
bar:angle('timer', 90, false)    -- 底部开始,逆时针
```

### bar:remove(tag)

参数：
- `tag`(String)——条标签

返回：Bool

销毁条并释放其标签.与条标签上的 `sprite:remove` 效果相同.

```lua
bar:remove('hp')
```

### 值和填充

### bar:range(tag, min, max)

参数：
- `tag`(String)——条标签
- `min`(Number)——范围最小(通常是 `0`)
- `max`(Number)——范围最大(必须 > min)

返回：Bool

设置值范围.条从 `min` 到 `max` 线性映射当前值.

```lua
bar:range('xp', 0, 1000)
bar:value('xp', currentXp)
```

### bar:value(tag, v)

参数：
- `tag`(String)——条标签
- `v`(Number)——条范围内的新目标值

返回：Bool

设置目标.显示的值根据当前模式在下一帧向它动画.在 `manual` 模式中这直接写显示——无动画.

```lua
function onHit()
  bar:value('hp', currentHp - 10)
end
```

### bar:track(tag, what)
*自 v0.7.7*

参数：
- `tag`(String)——条标签
- `what`(String?)——`"health"`和`"opponentHealth"` 或 `game:get` 可以读取的任何数字.`"none"` 停止 [默认 "health"]

返回：Bool

使条每帧自行跟随一个值,所以自定义血条不需要 onUpdate 代码.使用 `"health"` 或 `"opponentHealth"` 时范围设置为 0..2.角色的颜色来自 `game:get('boyfriend.healthColor')` 和 `game:get('dad.healthColor')`.

```lua
function onCreate()
    bar:add('myHealth', 340, 650, 600, 18)
    bar:colors('myHealth', game:get('dad.healthColor'), game:get('boyfriend.healthColor'))
    bar:direction('myHealth', 'right_to_left')
    bar:track('myHealth', 'health')
end

function onCharacterChange()
    bar:colors('myHealth', game:get('dad.healthColor'), game:get('boyfriend.healthColor'))
end
```

### bar:setNow(tag, v)

参数：
- `tag`(String)——条标签
- `v`(Number)——要弹到的值

返回：Bool

立即将目标和显示弹到 `v`,忽略当前模式.适合重置(重生和关卡开始)你不想追赶动画的地方.

```lua
function onRespawn()
  bar:setNow('hp', 100)
end
```

### bar:percent(tag, p)

参数：
- `tag`(String)——条标签
- `p`(Number)——`0..100` 百分比

返回：Bool

将 `p` 转换为条范围内的值并设置为目标的便利.与 `bar:value` 相同的动画规则.

```lua
bar:percent('progress', currentTimeMs / songLengthMs * 100)
```

### bar:getValue(tag)

参数：
- `tag`(String)——条标签

返回：Number

当前显示的值(向目标动画的那个).条在追赶时与 `getTarget` 不同.

```lua
if bar:getValue('charge') >= 100 then fireSpecial() end
```

### bar:getTarget(tag)

参数：
- `tag`(String)——条标签

返回：Number

传递给 `bar:value` / `bar:percent` 的最新值,无论条是否完成动画.

```lua
if bar:getTarget('hp') <= 0 then state:open('gameover') end
```

### bar:mode(tag, mode, speed)

参数：
- `tag`(String)——条标签
- `mode`(String)——`instant` | `lerp` | `pixel` | `manual`
- `speed`(Number?)——`lerp`：每秒速率(默认 `10`).`pixel`：每秒像素(默认 `200`).instant/manual 忽略

返回：Bool

选择条如何追赶其目标.模式保持直到改变.

```lua
bar:mode('hp', 'lerp', 8)        -- 平滑缓动,约 1/8 秒稳定
bar:mode('progress', 'pixel', 60) -- 60px/s 稳定填充
bar:mode('charge', 'manual')      -- 我自己驱动视觉
```

### 外观

### bar:direction(tag, dir)

参数：
- `tag`(String)——条标签
- `dir`(String)——填充方向

返回：Bool

更改填充方向而无需重新创建条.接受的值：

| 名称(别名) | 填充增长 |
|---|---|
| `right`(`ltr`) | 左 → 右(默认) |
| `left`(`rtl`) | 右 → 左 |
| `down`(`ttb`) | 上 → 下 |
| `up`(`btt`) | 下 → 上 |
| `horizontal`(`h`) | 左 → 右(方向别名) |
| `vertical`(`v`) | 下 → 上(方向别名) |
| `hin` | 中心 → 向外(水平) |
| `hout` | 边缘 → 中心(水平) |
| `vin` | 中心 → 向外(垂直) |
| `vout` | 边缘 → 中心(垂直) |

```lua
bar:direction('mana', 'up')
```

### bar:colors(tag, emptyColor, fillColor, showBorder, borderColor)

参数：
- `tag`(String)——条标签
- `emptyColor`(String)——空部分的十六进制颜色
- `fillColor`(String)——填充部分的十六进制颜色
- `showBorder`(Bool?)——绘制 1px 边框(默认 `false`)
- `borderColor`(String?)——十六进制边框颜色(默认白色)

返回：Bool

用新颜色和可选边框重新生成条的填充和空图形.用于交换配色方案(低 HP 红和满 HP 绿等)而无需重新创建条.

```lua
function onUpdate(elapsed)
  local v = bar:getValue('hp')
  if v < 30 then
      bar:colors('hp', '330000', 'FF2222', true, 'FFAAAA')
  else
    bar:colors('hp', '003311', '22FF66', true, 'AAFFCC')
  end
end
```

---

## 滚动条函数

`scrollbar` 命名空间制作轨道 + 可拖动滑块——列表和菜单的经典滚动条.底层是 `FlxSpriteGroup`,所以它是一个像其他一切一样的标记精灵：放到相机上和淡出它和锚定它.它本身不滚动内容——你读取它的 `progress`(0–1)并从中驱动你的列表,与驱动相机滚动的方式相同.

### 工作原理

`scrollbar:add` 构建一个轨道,滑块大小由 `scrollbar:thumb` 设置(轨道的一个分数 = 可见内容多少).用 `scrollbar:get` 读取位置(开始在 0,结束在 1),用 `scrollbar:set` 设置它.打开 `scrollbar:drag` 让用户用鼠标抓取和滑动滑块——命中测试使用条自己的相机,所以它在 HUD 相机上工作.

因为它是标记的 `FlxSpriteGroup`,通常的标签便利适用：`sprite:camera('list', 'ui')`和`game:set('list.alpha', 0.6)`和`sprite:anchor` 在宽屏中紧贴窗口边缘,等等.

### 简单方式

你不必手工计算滑块大小或滚动数学.告诉条你的内容多大和可见多少,然后读回一个现成的像素偏移而不是 0–1 分数.

### 创建和样式

### scrollbar:add(tag, x, y, length, thickness, vertical, trackColor, thumbColor)

参数：
- `tag`(String)——新滚动条标签(逐出此标签处的任何精灵)
- `x`(Number)——条的世界 x
- `y`(Number)——世界 y
- `length`(Number)——沿其轴的轨道长度(px)
- `thickness`(Number)——横跨其轴的条宽度(px)
- `vertical`(Bool?)——`true` = 垂直(默认),`false` = 水平 [默认 true]
- `trackColor`(String?)——轨道(凹槽)的十六进制颜色.默认深灰 [默认 2A2A33]
- `thumbColor`(String?)——滑块(手柄)的十六进制颜色.默认浅灰 [默认 CCCCDD]

返回：Bool

创建滚动条.默认垂直.两种颜色都接受 `RRGGBB`和`0xRRGGBB` 或 `#RRGGBB`.

```lua
scrollbar:add('list', 1250, 100, 400, 14, true, '2A2A33', 'CCCCDD')
sprite:camera('list', 'ui')   -- 固定到 HUD 相机
```

### scrollbar:content(tag, contentLength, viewLength)
*自 v0.5.9*

参数：
- `tag`(String)——滚动条标签
- `contentLength`(Number)——你滚动浏览的内容总大小(px)——例如歌曲列表的完整高度
- `viewLength`(Number)——一次可见多少(px)——例如显示它的窗口的高度

返回：Bool

给条真实大小而不是分数,它自己算出滑块大小——相当于 `scrollbar:thumb(tag, viewLength / contentLength)` 而不做除法.与 scrollbar:offset 配对以读回像素而不是 `progress`.如果 `viewLength` 覆盖所有 `contentLength`,滑块填满整个轨道.

```lua
scrollbar:content('list', 1200, 400)
```

### scrollbar:thumb(tag, fraction)

参数：
- `tag`(String)——滚动条标签
- `fraction`(Number)——滑块大小作为轨道的分数,`0`..`1`(最小 8px)

返回：Bool

设置滑块长度——这是你的"页面大小".设置为 `visibleItems / totalItems` 以便手柄视觉上反映一次适合多少列表.

```lua
scrollbar:thumb('list', 6 / #songs)   -- 可见 6 行
```

### scrollbar:image(tag, trackImage, thumbImage)
*自 v0.5.9*

参数：
- `tag`(String)——滚动条标签
- `trackImage`(String?)——轨道的图像键.省略以保持轨道为实心颜色 [可选]
- `thumbImage`(String?)——滑块的图像键.省略以保持滑块为实心颜色 [可选]

返回：Bool

用图像而不是纯色皮肤轨道和/或滑块——给一个和另一个或两者.`scrollbar:colors` 仍在图像皮肤的条上工作；它给图像着色而不是替换它.

```lua
scrollbar:add('list', 1250, 100, 400, 14)
scrollbar:image('list', 'ui/track', 'ui/thumb')
```

### scrollbar:colors(tag, trackColor, thumbColor)

参数：
- `tag`(String)——滚动条标签
- `trackColor`(String)——轨道颜色
- `thumbColor`(String)——滑块颜色

返回：Bool

在创建后更改滚动条的颜色.

```lua
scrollbar:colors('list', '1A1A22', 'FFCC55')
```

### scrollbar:resize(tag, length, thickness)

参数：
- `tag`(String)——滚动条标签
- `length`(Float)——新轨道长度(像素)
- `thickness`(Float)——新轨道厚度(像素)

返回：Bool

更改轨道大小并再次布局滑块.两个值必须至少为 1.

```lua
scrollbar:resize('list', 500, 18)
```

### scrollbar:remove(tag)

参数：
- `tag`(String)——滚动条标签

返回：Bool

销毁滚动条并释放其标签.

```lua
scrollbar:remove('list')
```

### 位置和输入

### scrollbar:offset(tag)
*自 v0.5.9*

参数：
- `tag`(String)——滚动条标签

返回：Float

内容现在应该移动多少像素,由 scrollbar:content 和当前位置算出.直接馈入相机或组.

```lua
function onUpdate(dt)
    game:set('cam.list.scroll.y', scrollbar:offset('list'))
end
```

### scrollbar:scrollBy(tag, delta)
*自 v0.5.9*

参数：
- `tag`(String)——滚动条标签
- `delta`(Number)——移动多远,作为整个轨道的一部分(0.1 = 十分之一)

返回：Bool

按其长度的一部分移动滚动条,与它的 progress 相同单位.

```lua
if input:keyJustPressed('PAGEDOWN') then scrollbar:scrollBy('list', 0.25) end
```

### scrollbar:scrollPixels(tag, pixels)
*自 v0.5.9*

参数：
- `tag`(String)——滚动条标签
- `pixels`(Number)——内容移动多远,以像素为单位

返回：Bool

按像素数移动内容.适合"向下一行"按钮.

```lua
if input:keyJustPressed('DOWN') then scrollbar:scrollPixels('list', 32) end
```

### scrollbar:set(tag, progress)

参数：
- `tag`(String)——滚动条标签
- `progress`(Number)——从 `0`(开始)到 `1`(结束)的位置

返回：Bool

将滑块移动到一个位置.

```lua
scrollbar:set('list', 0)   -- 回到顶部
```

### scrollbar:get(tag)

参数：
- `tag`(String)——滚动条标签

返回：Float

当前位置,从 `0` 到 `1`.

```lua
function onUpdate(dt)
    game:set('cam.list.scroll.y', scrollbar:get('list') * 800)
end
```

### scrollbar:drag(tag, enabled)

参数：
- `tag`(String)——滚动条标签
- `enabled`(Bool?)——(仅拖拽)打开/关闭鼠标拖拽.默认 `true` [默认 true]

返回：Bool

让玩家抓取滑块并用鼠标滑动它.在条所在的任何相机上工作.

```lua
scrollbar:drag('list', true)
```

### scrollbar:dragging(tag)

参数：
- `tag`(String)——滚动条标签

返回：Bool

如果滑块可以拖拽(用 `scrollbar:drag` 打开)则为 `true`.

```lua
if not scrollbar:dragging('list') then scrollbar:drag('list') end
```

### scrollbar:wheel(tag, step)
*自 v0.5.9*

参数：
- `tag`(String)——滚动条标签
- `step`(Number)——一个滚轮档移动多远,作为轨道的一部分.`0` 关闭滚轮.默认 `0.1`

返回：Bool

鼠标滚轮滚动默认开启,所以你通常不需要调用这个.用它更改步长,或传递 `0` 关闭你宁愿以其他方式驱动的条的滚轮.

```lua
scrollbar:wheel('list', 0.05)   -- 更精细的滚动
scrollbar:wheel('list', 0)      -- 滚轮关闭
```

### 轻扫滚动

用手指拖动细滑块很尴尬.`scrollbar:dragArea` 将整个区域标记为可拖拽——通常是可见列表本身——触摸(或鼠标)在其中的任何地方并拖动以滚动,像每个手机列表一样.还在移动时松开,它继续滑行,随时间减慢而不是立即停止.

先设置 scrollbar:content——这是将拖拽距离(像素)转换为位置变化的东西.

### scrollbar:dragArea(tag, x, y, w, h)
*自 v0.5.9*

参数：
- `tag`(String)——滚动条标签
- `x`(Number)——可拖拽盒的左边缘(与条的相机相同的世界空间)
- `y`(Number)——顶边缘
- `w`(Number)——盒宽度,必须 > 0
- `h`(Number)——盒高度,必须 > 0

返回：Bool

使一个盒子可拖拽滚动,通常是可见列表本身而不是滑块,像在手机上滚动.

```lua
scrollbar:dragArea('list', 0, 0, 720, 400)
```

### scrollbar:clearDragArea(tag)
*自 v0.5.9*

参数：
- `tag`(String)——滚动条标签

返回：Bool

移除用 `scrollbar:dragArea` 设置的盒子并停止任何滑行.

```lua
scrollbar:clearDragArea('list')
```

### scrollbar:decay(tag, rate)
*自 v0.5.9*

参数：
- `tag`(String)——滚动条标签
- `rate`(Number)——更高 = 滑行更快停止.默认 `5`

返回：Bool

控制手指(或鼠标)抬起后轻扫动量衰减的速度.仅在设置 scrollbar:dragArea 时重要——否则没有东西可滑行.

```lua
scrollbar:decay('list', 8)   -- 更快停止滑行
scrollbar:decay('list', 2)   -- 滑行更远
```

---

## GUI 函数

`gui` 命名空间构建 Freak Engine 风格的工具窗口(与 FPS 计数器相同的外观)：标签页和下拉菜单和滑块和步进器和文本输入和复选框和进度条和滚动条和文件树和颜色选择器.它们用 OpenFL 绘制在游戏上方,所以相机和缩放和着色器和焦点模糊永远不会触及它们,文本在任何窗口大小下保持清晰,窗口在场景变化中存活.

### 工作原理

用 `gui:window` 创建窗口,然后向它添加控件.控件的父级要么是窗口本身(`'dbg'`,显示在标签页下方——适合 Apply / Close 按钮)要么是它的一个标签页(`'dbg.audio'`).标签页在你第一次使用它们时自行出现.窗口增长以适合其控件,由标题栏(或没有标题时的背景)拖动,其关闭按钮隐藏它.

用 `gui:get` / `gui:set` 读写值,用 `gui:on` 或下面的全局回调对它们做出反应.窗口上的点击永远不会到达游戏,文本输入有焦点时游戏键盘输入暂停.如果游戏隐藏鼠标光标,鼠标在窗口上时系统光标出现.

示例：`scripts/examples/chart_editor.lua` 是一个完全用 gui 构建的 Funkin 风格谱面编辑器：菜单栏(File / Edit / View / Audio / Test / Window / Help)和传输栏和同步谱面网格和歌曲窗口和事件窗口.

### 事件和回调

每个控件通过事件报告发生了什么.用 `gui:on(tag, event, fn)` 监听一个控件,或在任何脚本中用全局回调捕获一切：

- `change` → `onWidgetChanged(tag, value)`——任何值改变(滑块移动和项目选择和文本输入和文件选择和颜色改变)
- `click` → `onWidgetClicked(tag)`——按钮被按下
- `submit` → `onWidgetSubmitted(tag, text)`——文本输入中按 Enter
- `open` → `onFileOpened(tag, path)`——列表中的文件被双击
- `toggle` → `onBranchToggled(tag, path, open)`——列表中的文件夹被打开或关闭
- `pick` → `onItemClicked(tag, path)`——列表中的文件被点击(每次点击,即使已选中)
- `tab` → `onTabSelected(window, tab)`——用户切换标签页
- `close` → `onWindowClosed(window)`——关闭按钮隐藏了窗口
- `key` → `onTimelineKey(tag, track, time, value)`——播放时播放头经过关键帧
- `seek` → `onTimelineSeek(tag, time)`——用户松开播放头
- `select` → `onKeySelected(tag, track, time, value)`——关键帧被点击或创建(歌曲事件添加 `v1, v2`)
- `end` → `onTimelineEnd(tag)`——不循环的时间线到达终点
- `cell` → `onGridCell(tag, col, row, button)`——网格单元格被点击或拖过
- `move` → `onWindowMoved(window, x, y)`——用户完成拖动窗口
- `resize` → `onWindowResized(window, width, height)`——用户完成调整窗口大小

传递给 `gui:on` 的处理程序得到相同的参数,但没有前导标签.

### 属性

像 `game:get('tag.field')`,`gui:get` 和 `gui:set` 接受 `'tag.property'`.

窗口：`x`和`y`和`width`和`height`和`visible`和`tab`和`title`和`locked`和`movable`和`resizable`和`minWidth`和`minHeight`和`maxWidth`和`maxHeight`(全部可设置)和 `contentHeight`(只读).

控件：`value`和`visible`和`enabled`和`tooltip`(可设置)和 `x`和`y`(屏幕上的位置)和`width`和`height`和`window`(只读).

窗口始终留在屏幕上：拖动在边缘停止,当游戏窗口调整大小和从最大化恢复或 gui 重新缩放时,每个窗口都被拉回视图.

### 窗口和标签页

### gui:window(tag, ?title, ?x, ?y, ?width)
*自 v0.7.0*

参数：
- `tag`(String)——窗口标签
- `title`(String?)——标题栏文本；`nil` 或 `''` 制作没有标题栏或关闭按钮的窗口
- `x`(Number?)——左边缘(窗口像素)[默认 40]
- `y`(Number?)——顶边缘 [默认 40]
- `width`(Number?)——宽度(像素,最小 160)；高度跟随内容 [默认 360]

返回：Bool

创建工具窗口.没有标题时它仍然可以拖动其背景或标签栏.

```lua
gui:window('dbg', 'Debug tools', 40, 40, 440)
gui:window('hud', nil, 900, 20, 260)
```

### gui:tab(window, id, ?caption)
*自 v0.7.0*

参数：
- `window`(String)——窗口标签
- `id`(String)——标签页 id,用作 `'window.id'` 父级
- `caption`(String?)——标签页文本 [默认 id]

返回：Bool

添加标签页.可选：使用 `'window.id'` 作为父级也会创建标签页；当你想要更好的标题或固定顺序时先调用这个.第一个标签页被选中.

```lua
gui:tab('dbg', 'audio', 'Audio')
```

### gui:title(window, text)
*自 v0.7.0*

参数：
- `window`(String)——窗口标签
- `text`(String)——新标题

返回：Bool

更改有标题栏窗口的标题.

```lua
gui:title('dbg', 'Debug tools - ' .. song)
```

### gui:size(window, width, ?height)
*自 v0.7.0*

参数：
- `window`(String)——窗口标签
- `width`(Number)——保持在最小和最大宽度之间
- `height`(Number?)——`0` = 适合内容 [默认 0]

返回：Bool

从代码调整窗口大小.

```lua
gui:size('dbg', 520, 420)
```

### gui:resizable(window, ?enabled, ?maxWidth, ?maxHeight)
*自 v0.7.0*

参数：
- `window`(String)——窗口标签
- `enabled`(Bool?)[默认 true]
- `maxWidth`(Number?)——最大宽度；`0` = 到屏幕边缘 [默认 0]
- `maxHeight`(Number?)——最大高度；`0` = 到屏幕边缘 [默认 0]

返回：Bool

在右下角显示握柄.窗口创建时的大小(及其内容高度)是最小值；页面的最后一个列表或图表增长到额外高度.

```lua
gui:resizable('dbg', true, 900, 640)
```

### gui:lock(window, ?locked)
*自 v0.7.0*

参数：
- `window`(String)——窗口标签
- `locked`(Bool?)[默认 true]

返回：Bool

锁定的窗口不能拖动或调整大小；其控件仍然工作.

```lua
gui:lock('hud')
```

### gui:closable(window, ?enabled)
*自 v0.7.7*

参数：
- `window`(String)——窗口标签
- `enabled`(Bool?)——`false` 隐藏关闭按钮 [默认 true]

返回：Bool

显示或隐藏标题栏中的 X.没有它玩家不能关闭窗口；`gui:hide` 和 `gui:remove` 仍然从脚本工作.

```lua
gui:window('hud', 'Stats', 900, 20, 260)
gui:closable('hud', false)
```

### gui:hotkey(window, ?key)
*自 v0.7.0*

参数：
- `window`(String)——窗口标签
- `key`(String?)——键名称(`F2`和`TAB`和`G`)；省略以移除

返回：Bool

键显示和隐藏窗口.在文本输入中输入时忽略.

```lua
gui:hotkey('dbg', 'F2')
```

### gui:move(window, x, y)
*自 v0.7.0*

参数：
- `window`(String)——窗口标签
- `x`(Number)
- `y`(Number)

返回：Bool

移动窗口使其左上角在屏幕上的 `x, y`.用于恢复玩家保存的布局.

```lua
gui:move('dbg', 20, 20)
```

### gui:front(window)
*自 v0.7.0*

参数：
- `window`(String)——窗口标签

返回：Bool

将窗口带到其他窗口上方(点击窗口也会这样做).

```lua
gui:front('dbg')
```

### gui:gap(window, pixels)
*自 v0.7.2*

参数：
- `window`(String)——窗口标签
- `pixels`(Number)——控件行之间的空间,0 或更多 [默认 8]

返回：Bool

设置窗口控件之间的垂直空间并再次布局它.

```lua
gui:window('dbg', 'Debug')
gui:gap('dbg', 14)
```

### 基本控件

### gui:label(tag, parent, text)
*自 v0.7.0*

参数：
- `tag`(String)——新控件标签,在所有 gui 窗口和控件中唯一(无点)
- `parent`(String)——`'window'` 用于标签页下方的区域,或 `'window.tab'` 用于标签页(缺失时创建标签页)
- `text`(String)——文本

返回：Bool

一行暗色文本.`gui:set` 更改它.

```lua
gui:label('hint', 'dbg', 'F2 hides this window')
```

### gui:rule(tag, parent, ?text, ?color)
*自 v0.7.0*

参数：
- `tag`(String)——新控件标签,在所有 gui 窗口和控件中唯一(无点)
- `parent`(String)——`'window'` 或 `'window.tab'`
- `text`(String)——可选标题绘制在行的中间
- `color`(String)——可选行颜色作为十六进制,像 `'6C5CE7'`

返回：Bool

分隔控件组的水平线,像 HaxeUI 的规则.有 `text` 时标题坐在两半线之间.`gui:set` 更改标题.

```lua
gui:rule('audioRule', 'dbg', 'AUDIO')
gui:rule('line', 'dbg', nil, 'FF4D6A')
```

### gui:spacer(tag, parent, ?height)
*自 v0.7.0*

参数：
- `tag`(String)——新控件标签,在所有 gui 窗口和控件中唯一(无点)
- `parent`(String)——`'window'` 或 `'window.tab'`
- `height`(Float)——空白空间(像素).默认 12

返回：Bool

控件之间的不可见空白空间.`gui:set(tag, height)` 更改大小.

```lua
gui:spacer('gap', 'dbg', 24)
```

### gui:button(tag, parent, text, ?label)
*自 v0.7.0*

参数：
- `tag`(String)——新控件标签,在所有 gui 窗口和控件中唯一(无点)
- `parent`(String)——`'window'` 用于标签页下方的区域,或 `'window.tab'` 用于标签页(缺失时创建标签页)
- `text`(String)——按钮文本
- `label`(String)——左标签列中的标题；`nil` 或 `''` 给控件整行

返回：Bool

触发 `click` 的按钮.

```lua
gui:button('apply', 'dbg', 'Apply')
```

### gui:checkbox(tag, parent, text, ?checked, ?label)
*自 v0.7.0*

参数：
- `tag`(String)——新控件标签,在所有 gui 窗口和控件中唯一(无点)
- `parent`(String)——`'window'` 用于标签页下方的区域,或 `'window.tab'` 用于标签页(缺失时创建标签页)
- `text`(String)——框旁边的标题
- `checked`(Bool?)[默认 false]
- `label`(String)——左标签列中的标题；`nil` 或 `''` 给控件整行

返回：Bool

复选框.值：`true` / `false`.

```lua
gui:checkbox('shaders', 'dbg.video', 'Shaders', true)
```

### gui:slider(tag, parent, label, min, max, ?value, ?step)
*自 v0.7.0*

参数：
- `tag`(String)——新控件标签,在所有 gui 窗口和控件中唯一(无点)
- `parent`(String)——`'window'` 用于标签页下方的区域,或 `'window.tab'` 用于标签页(缺失时创建标签页)
- `label`(String)——左标签列中的标题；`nil` 或 `''` 给控件整行
- `min`(Number)——最低值
- `max`(Number)——最高值
- `value`(Number?)——起始值 [默认 min]
- `step`(Number?)——吸附步长；`0` = 平滑.读数显示步长有几位小数 [默认 0]

返回：Bool

带值读数的水平滑块.拖动它或使用鼠标滚轮.

```lua
gui:slider('volume', 'dbg.audio', 'Volume', 0, 100, 70, 1)
```

### gui:stepper(tag, parent, label, min, max, ?value, ?step)
*自 v0.7.0*

参数：
- `tag`(String)——新控件标签,在所有 gui 窗口和控件中唯一(无点)
- `parent`(String)——`'window'` 用于标签页下方的区域,或 `'window.tab'` 用于标签页(缺失时创建标签页)
- `label`(String)——左标签列中的标题；`nil` 或 `''` 给控件整行
- `min`(Number)——最低值
- `max`(Number)——最高值
- `value`(Number?)——起始值 [默认 min]
- `step`(Number?)——每次点击的量 [默认 1]

返回：Bool

带减 / 加按钮的数字.鼠标滚轮也步进它.

```lua
gui:stepper('speed', 'dbg', 'Scroll speed', 0.5, 5, 2.5, 0.1)
```

### gui:input(tag, parent, label, ?text, ?placeholder)
*自 v0.7.0*

参数：
- `tag`(String)——新控件标签,在所有 gui 窗口和控件中唯一(无点)
- `parent`(String)——`'window'` 用于标签页下方的区域,或 `'window.tab'` 用于标签页(缺失时创建标签页)
- `label`(String)——左标签列中的标题；`nil` 或 `''` 给控件整行
- `text`(String?)——起始文本
- `placeholder`(String?)——空时显示的灰色提示

返回：Bool

引擎风格的单行文本字段.在每次编辑时触发 `change`,在 Enter 时触发 `submit`；Enter 和 Escape 放弃焦点.有焦点时游戏不接收键.

```lua
gui:input('name', 'dbg', 'Player name', 'Boyfriend', 'Type a name')
```

### gui:dropdown(tag, parent, label, items, ?index)
*自 v0.7.0*

参数：
- `tag`(String)——新控件标签,在所有 gui 窗口和控件中唯一(无点)
- `parent`(String)——`'window'` 用于标签页下方的区域,或 `'window.tab'` 用于标签页(缺失时创建标签页)
- `label`(String)——左标签列中的标题；`nil` 或 `''` 给控件整行
- `items`(Table)——字符串列表
- `index`(Int?)——选中项,1 基 [默认 1]

返回：Bool

下拉列表.值：选中文本.`gui:set` 接受 1 基索引或文本；`gui:items` 替换列表.长列表用滚轮滚动.

```lua
gui:dropdown('stage', 'dbg', 'Stage', {'Park', 'Train', 'School'}, 1)
```

### gui:progress(tag, parent, label, ?value)
*自 v0.7.0*

参数：
- `tag`(String)——新控件标签,在所有 gui 窗口和控件中唯一(无点)
- `parent`(String)——`'window'` 用于标签页下方的区域,或 `'window.tab'` 用于标签页(缺失时创建标签页)
- `label`(String)——左标签列中的标题；`nil` 或 `''` 给控件整行
- `value`(Number?)——0..1 [默认 0]

返回：Bool

进度条；用 `gui:set(tag, 0..1)` 设置它.

```lua
gui:progress('load', 'dbg', 'Loading', 0)
gui:set('load', game:get('loadingProgress'))
```

### gui:scrollbar(tag, parent, label, ?value, ?thumb)
*自 v0.7.0*

参数：
- `tag`(String)——新控件标签,在所有 gui 窗口和控件中唯一(无点)
- `parent`(String)——`'window'` 用于标签页下方的区域,或 `'window.tab'` 用于标签页(缺失时创建标签页)
- `label`(String)——左标签列中的标题；`nil` 或 `''` 给控件整行
- `value`(Number?)——位置 0..1 [默认 0]
- `thumb`(Number?)——滑块大小作为轨道的份额 [默认 0.25]

返回：Bool

独立水平滚动条.它通过 `change` 报告 0..1 位置；列表有自己的内置滚动条.

```lua
gui:scrollbar('offset', 'dbg', 'Offset', 0, 0.3)
```

### gui:colorButton(tag, parent, ?color, ?label)
*自 v0.7.0*

参数：
- `tag`(String)——新控件标签,在所有 gui 窗口和控件中唯一(无点)
- `parent`(String)——`'window'` 或 `'window.tab'`
- `color`(String)——起始颜色作为十六进制.默认 `'FFFFFF'`
- `label`(String)——左侧可选标签

返回：Bool

紧凑颜色字段：一个带十六进制代码的小色块.点击它打开单独的弹出窗口,带完整选择器和预设颜色和 Done 按钮,所以窗口保持短.像 `gui:colorPicker` 一样触发 `onWidgetChanged(tag, hex)`.

```lua
gui:colorButton('tint', 'dbg', '6C5CE7', 'Tint')
```

### gui:colorPicker(tag, parent, ?color, ?label, ?mode)
*自 v0.7.0*

参数：
- `tag`(String)——新控件标签,在所有 gui 窗口和控件中唯一(无点)
- `parent`(String)——`'window'` 用于标签页下方的区域,或 `'window.tab'` 用于标签页(缺失时创建标签页)
- `color`(String?)——起始颜色,十六进制 `RRGGBB` [默认 FFFFFF]
- `label`(String)——左标签列中的标题；`nil` 或 `''` 给控件整行
- `mode`(String)——`'full'` 显示整个选择器；`'compact'` 显示一行带颜色及其十六进制,点击颜色在列表中就地打开完整选择器(再次点击折叠).触发 `open` 和 `close`.[默认 full]

返回：Bool

饱和度/亮度方块和色相条和色块和十六进制字段.值：`'RRGGBB'`.长颜色列表用 `'compact'` 保持短.

```lua
gui:colorPicker('tint', 'dbg', '6C5CE7', 'Tint')
```

### 列表和文件

### gui:list(tag, parent, items, ?height, ?expanded, ?label)
*自 v0.7.0*

参数：
- `tag`(String)——新控件标签,在所有 gui 窗口和控件中唯一(无点)
- `parent`(String)——`'window'` 用于标签页下方的区域,或 `'window.tab'` 用于标签页(缺失时创建标签页)
- `items`(Table)——像 `'menu/main.lua'` 的路径；文件夹从斜杠构建.以 `/` 结尾的路径是空文件夹
- `height`(Number?)——高度(像素)；更长的列表滚动 [默认 120]
- `expanded`(Bool?)——开始时打开每个文件夹 [默认 false]
- `label`(String)——左标签列中的标题；`nil` 或 `''` 给控件整行

返回：Bool

带分支的列表：文件夹用点击打开和关闭(`toggle`),点击文件选中它(`change`,值 = 其路径)并双击打开它(`open`).文件夹列在文件之前,都按字母顺序；`gui:items` 替换列表时打开的文件夹保持打开.

```lua
gui:list('songs', 'dbg', {'week1/your-song', 'week1/your-song-2', 'week2/your-song-3'}, 140)
```

### gui:files(tag, parent, folder, ?height, ?ext, ?label)
*自 v0.7.0*

参数：
- `tag`(String)——新控件标签,在所有 gui 窗口和控件中唯一(无点)
- `parent`(String)——`'window'` 用于标签页下方的区域,或 `'window.tab'` 用于标签页(缺失时创建标签页)
- `folder`(String)——要读取的文件夹,相对于游戏文件夹(`'scripts'`和`'assets/charts'`)
- `height`(Number?)[默认 160]
- `ext`(String?)——仅此扩展名的文件(`'lua'`)
- `label`(String)——左标签列中的标题；`nil` 或 `''` 给控件整行

返回：Bool

用文件夹及其所有子文件夹的文件填充的 `gui:list`.路径相对于 `folder`.

```lua
gui:files('scripts', 'dbg.files', 'scripts', 200, 'lua')

function onFileOpened(tag, path)
    print('scripts/' .. path)
end
```

### gui:items(tag, values)
*自 v0.7.0*

参数：
- `tag`(String)——下拉菜单或列表标签
- `values`(Table)——新项目

返回：Bool

替换下拉菜单或列表的项目.

```lua
gui:items('stage', {'Park', 'Train'})
```

### gui:expand(tag, path, ?open)
*自 v0.7.0*

参数：
- `tag`(String)——列表标签
- `path`(String)——文件夹路径
- `open`(Bool?)[默认 true]

返回：Bool

打开或关闭列表的文件夹.

```lua
gui:expand('scripts', 'menu')
```

### gui:onItem(tag, path, fn)
*自 v0.7.0*

参数：
- `tag`(String)——列表标签
- `path`(String)——列表中的文件路径
- `fn`(Function)——每次文件被点击时用路径运行

返回：Bool

将函数绑定到列表中的一个文件,像菜单项.

```lua
gui:list('menu', 'dbg', {'songs/your-song', 'songs/your-song-2', 'settings'})
gui:onItem('menu', 'settings', function() state:change('menu/settings') end)
```

### 图表和缓动曲线

### gui:graph(tag, parent, label, ?height, ?min, ?max, ?samples)
*自 v0.7.0*

参数：
- `tag`(String)——新控件标签
- `parent`(String)——窗口或 window.tab
- `label`(String)——标签列文本
- `height`(Number?)[默认 80]
- `min`(Number?)——固定底部范围；省略以适合数据
- `max`(Number?)——固定顶部范围；省略以适合数据
- `samples`(Int?)——它保留多少值 [默认 120]

返回：Bool

推入它的最后值的线图,带填充区域和网格线和左侧范围和右侧最新值.用 `gui:push` 每帧喂它；`gui:set(tag, {...})` 替换所有值.在可调整大小的窗口中,图表占用额外高度.

```lua
gui:graph('fps', 'dbg.stats', 'FPS', 90, 0, 240)

function onUpdate(elapsed)
    gui:push('fps', 1 / elapsed)
end
```

### gui:push(tag, value)
*自 v0.7.0*

参数：
- `tag`(String)——图表标签
- `value`(Number)——新样本

返回：Bool

向图表添加一个值；最旧的掉出.

```lua
gui:push('fps', 1 / elapsed)
```

### gui:range(tag, ?min, ?max)
*自 v0.7.0*

参数：
- `tag`(String)——图表标签
- `min`(Number?)
- `max`(Number?)

返回：Bool

更改图表范围；省略一侧以适合数据.

```lua
gui:range('fps', 0, 144)
```

### gui:curve(tag, parent, label, ?ease, ?height)
*自 v0.7.0*

参数：
- `tag`(String)——新控件标签
- `parent`(String)——窗口或 window.tab
- `label`(String)——标签列文本
- `ease`(String?)——任何补间缓动名称(`quadOut`和`backOut`和`elasticOut`……)[默认 linear]
- `height`(Number?)[默认 160]

返回：Bool

缓动编辑器.它将缓动绘制为曲线(时间从左到右,值从下到上,包括过冲),让你用自己的点塑造它：点击曲线区域添加点,拖动点移动它们,右键或双击点移除它.两点之间选中的缓动再次运行,所以一个点将 `backOut` 变成两个凸起.端点可以上下移动.

它角落的播放按钮(或 `gui:play`)沿曲线运行标记,并沿右侧预览条运行一个点,显示对象会如何移动.在任何补间中使用结果,缓动名称为 `'gui:tag'`：补间实时读取曲线,所以编辑适用于下一帧.

```lua
gui:curve('motion', 'dbg.ease', 'Motion', 'backOut', 180)

tw:x('move', 'square', 1180, 1, 'gui:motion')
```

### gui:ease(tag, name)
*自 v0.7.0*

参数：
- `tag`(String)——曲线标签
- `name`(String)——缓动名称

返回：Bool

更改曲线的基础缓动并保持其点.`gui:set(tag, 'quadOut')` 做同样的事.

```lua
gui:on('easeName', 'change', function(name) gui:ease('motion', name) end)
```

### gui:points(tag, ?values)
*自 v0.7.0*

参数：
- `tag`(String)——曲线标签
- `values`(Table?)——平面列表 `{x1, y1, x2, y2, ...}`,x 在 0..1；如果缺失,端点在 x 0 和 1 添加

返回：Dynamic

有 `values` 时替换曲线的点；没有时将它们作为平面列表返回,所以你可以保存曲线并加载回来.

```lua
local saved = gui:points('motion')
gui:points('motion', {0, 0, 0.35, 0.55, 1, 1})
```

### gui:eval(tag, t)
*自 v0.7.0*

参数：
- `tag`(String)——曲线标签
- `t`(Number)——时间 0..1

返回：Number

在 `t` 处读取曲线——当你手动驱动某些东西而不是用补间时很方便.

```lua
game:set('square.y', 560 - gui:eval('motion', t) * 200)
```

### gui:play(tag, ?seconds, ?loop)
*自 v0.7.0*

参数：
- `tag`(String)——曲线标签
- `seconds`(Number?)——一次运行的长度 [默认 1]
- `loop`(Bool?)[默认 true]

返回：Bool

播放曲线预览(每次运行 `seconds` 秒)或时间线(从播放头；`seconds` 被忽略).

```lua
gui:play('motion', 1.5)
```

### gui:stop(tag)
*自 v0.7.0*

参数：
- `tag`(String)——曲线标签

返回：Bool

停止用 `gui:play` 启动的预览.曲线或时间线停在原地.

```lua
gui:stop('motion')
```

### 关键帧时间线

### gui:timeline(tag, parent, ?length)
*自 v0.7.0*

参数：
- `tag`(String)——新控件标签
- `parent`(String)——窗口或 window.tab
- `length`(Number?)——长度(秒)[默认 5]

返回：Bool

像视频编辑器中的关键帧时间线：带播放头的时间标尺,播放 / 暂停和循环按钮,以及带菱形关键帧的轨道.

鼠标：在标尺中拖动以擦洗,拖动轨道的空白部分以平移,滚轮滚动,Ctrl + 滚轮围绕鼠标缩放.双击轨道在那里添加关键帧(它取轨道的当前值),拖动关键帧在时间中移动它(吸附到 `gui:snap`),右键或双击关键帧删除它.Ctrl+Z / Ctrl+Y(或 Ctrl+Shift+Z)在鼠标悬停在时间线上时撤销和重做——游戏不接收那些键.

每个关键帧有一个值和到下一个关键帧的路上使用的缓动(任何补间缓动,或来自曲线编辑器的 `'gui:curve'`).每帧用 `gui:value` 读取轨道以驱动任何东西；`gui:get(tag)` 是播放头时间.

滚动方式：时间线是对提前以 1024 px 块生成的内容(网格和时间标签和关键帧)的裁剪视图.滚动只移动块,所以网格与关键帧一起滑动,每帧不重建任何东西；仅当其中的关键帧变化或缩放变化时才重新生成块.播放或跟随歌曲时,播放头跑到中间,视图在它下面平滑滚动；手动平移后它停止跟随,直到播放头离开视图.

```lua
gui:timeline('tl', 'dbg.anim', 4)
gui:track('tl', 'x', 'Square X')
gui:key('tl', 'x', 0, 700, 'quadInOut')
gui:key('tl', 'x', 2, 1180, 'backOut')
gui:key('tl', 'x', 4, 700)
gui:play('tl')

function onUpdate(elapsed)
    game:set('square.x', gui:value('tl', 'x'))
end
```

### gui:track(tag, id, ?name, ?color)
*自 v0.7.0*

参数：
- `tag`(String)——时间线标签
- `id`(String)——轨道 id
- `name`(String?)——左列中的名称 [默认 id]
- `color`(String?)——轨道及其关键帧的十六进制颜色；省略时选择调色板颜色

返回：Bool

添加轨道(或重命名 / 重新着色现有轨道).控件增长一行.

```lua
gui:track('tl', 'alpha', 'Alpha', '00B894')
```

### gui:untrack(tag, id)
*自 v0.7.0*

参数：
- `tag`(String)——时间线标签
- `id`(String)——轨道 id

返回：Bool

移除轨道及其关键帧.

```lua
gui:untrack('tl', 'alpha')
```

### gui:key(tag, track, time, ?value, ?ease)
*自 v0.7.0*

参数：
- `tag`(String)——时间线标签
- `track`(String)——轨道 id
- `time`(Number)——秒(吸附)
- `value`(Number?)[默认 0]
- `ease`(String?)——到下一个关键帧的缓动 [默认 linear]

返回：Bool

添加关键帧,或更新该时间已存在的关键帧.

```lua
gui:key('tl', 'alpha', 1.5, 0.2, 'sineInOut')
```

### gui:unkey(tag, track, time)
*自 v0.7.0*

参数：
- `tag`(String)——时间线标签
- `track`(String)——轨道 id
- `time`(Number)——秒

返回：Bool

移除该时间的关键帧.

```lua
gui:unkey('tl', 'alpha', 1.5)
```

### gui:keys(tag, track)
*自 v0.7.0*

参数：
- `tag`(String)——时间线标签
- `track`(String)——轨道 id

返回：Table

将轨道的关键帧作为平面列表 `{time, value, ease, time, value, ease, ...}` 返回——保存它并用 `gui:key` 重建轨道.

```lua
local k = gui:keys('tl', 'x')
for i = 1, #k, 3 do print(k[i], k[i + 1], k[i + 2]) end
```

### gui:value(tag, track, ?time)
*自 v0.7.0*

参数：
- `tag`(String)——时间线标签
- `track`(String)——轨道 id
- `time`(Number?)——秒；省略为播放头时间

返回：Number

时间处轨道的值,在其关键帧之间缓动.在第一个关键帧之前保持第一个值,在最后一个之后保持最后一个值.

```lua
game:set('square.alpha', gui:value('tl', 'alpha'))
```

### gui:keyInfo(tag, track, time, field)
*自 v0.7.0*

参数：
- `tag`(String)——时间线标签
- `track`(String)——轨道 id
- `time`(Number)——关键帧的秒数
- `field`(String)——`time`和`value`和`ease`和`label`和`length` 或关键帧数据的字段：`v1`和`v2`和`name` 用于事件,`d`和`p`和`l`和`nt` 用于音符

返回：Dynamic

从关键帧读取数据.选中的关键帧也可以用 `gui:get('tag.selectedTrack')`和`selectedTime`和`selectedValue`和`selectedV1`和`selectedV2`和`selectedLength` 或任何 `selected` + 数据字段读取.

```lua
print(gui:keyInfo('events', 'fight', 12.5, 'v1'))
print(gui:get('events.selectedV1'))
```

### gui:event(tag, track, time, ?label)
*自 v0.7.0*

参数：
- `tag`(String)——时间线标签
- `track`(String)——轨道 id；首次使用时创建
- `time`(Number)——秒,不吸附
- `label`(String?)——鼠标悬停在关键帧上时显示

返回：Bool

添加标记关键帧——显示事情何时发生的简单方式.如果时间超过其结束,时间线增长.

```lua
gui:event('tl', 'Camera', 12.5, 'zoom 1.2')
```

### gui:time(tag, ?seconds)
*自 v0.7.0*

参数：
- `tag`(String)——时间线标签
- `seconds`(Number?)——将播放头移到那里

返回：Number

读取(并可选择设置)播放头时间.

```lua
gui:time('tl', 0)
```

### gui:length(tag, seconds)
*自 v0.7.0*

参数：
- `tag`(String)——时间线标签
- `seconds`(Number)——新长度

返回：Bool

更改时间线的长度.

```lua
gui:length('tl', 8)
```

### gui:snap(tag, seconds)
*自 v0.7.0*

参数：
- `tag`(String)——时间线标签
- `seconds`(Number)——新和拖动关键帧的网格；`0` 关闭吸附

返回：Bool

设置关键帧吸附步长.

```lua
gui:snap('tl', 1 / 30)
```

### gui:zoom(tag, seconds)
*自 v0.7.0*

参数：
- `tag`(String)——时间线标签
- `seconds`(Number)——可见多少秒(最小 0.25)

返回：Bool

缩放时间线.鼠标滚轮滚动,Ctrl + 滚轮缩放.

```lua
gui:zoom('tl', 10)
```

### gui:follow(tag, ?enabled)
*自 v0.7.0*

参数：
- `tag`(String)——时间线标签
- `enabled`(Bool?)[默认 true]

返回：Bool

使播放头跟随播放的歌曲(其长度也跟随歌曲)并将擦洗变为松开时的歌曲跳转.歌曲经过关键帧时关键帧仍然触发 `onTimelineKey`.

```lua
gui:follow('tl')
```

### gui:pause(tag)
*自 v0.7.0*

参数：
- `tag`(String)——时间线标签

返回：Bool

在它所在的位置暂停时间线.`gui:play` 继续(默认循环),`gui:stop` 也倒回 0.两者也用于曲线.

```lua
gui:pause('tl')
```

### gui:sync(tag, ?music)
*自 v0.7.0*

参数：
- `tag`(String)——谱面网格或时间线
- `music`(String?)——来自 `music:play` 的音乐标签；省略以取消链接

返回：Bool

将谱面网格或时间线链接到播放的音乐轨道：红线跟随轨道(播放或暂停),长度跟随轨道,擦洗(标尺条和小地图和鼠标滚轮和拖动时间线的播放头)移动轨道.这就是编辑器在你制谱时播放 Inst 的方式.

```lua
music:play('inst', 'your-song/Inst', 1, false)
music:pause('inst')
gui:sync('grid', 'inst')
```

### 谱面工具

### gui:chartEvents(tag, parent, ?song, ?zoom)
*自 v0.7.0*

参数：
- `tag`(String)——时间线标签(缺失时创建,存在时重建)
- `parent`(String)——窗口或 window.tab
- `song`(String?)——按名称加载谱面；省略(或 `nil`)为正在播放的歌曲
- `zoom`(Number?)——一次可见秒数；`0` 显示全部 [默认 20]

返回：Bool

一键的谱面事件查看器和编辑器：用谱面事件填充时间线(每个事件名称一个轨道,悬停关键帧查看其值).

没有 `song` 时它使用正在播放的歌曲的谱面：时间线与歌曲一样长,播放头跟随音乐,拖动播放头然后松开跳转歌曲.

有 `song` 时它在任何场景中按名称加载该谱面(谱面编辑器和菜单),时间线有自己的播放和循环按钮.如果该歌曲是正在播放的,它的行为像第一种情况.

编辑：双击轨道添加事件,拖动移动,右键删除.更改进入加载的谱面,所以播放的歌曲触发它们(磁盘上的谱面文件不变).`onKeySelected(tag, track, time, value, v1, v2)` 报告点击的事件；用 `gui:setChartEvent` 更改值,用 `gui:addChartEvent` 添加新的事件类型.窗口在状态变化中存活——为下一个谱面再次调用它.

```lua
if not gui:exists('eventsWin') then
    gui:window('eventsWin', 'Chart events', 20, 440, 760)
    gui:hotkey('eventsWin', 'F3')
end
gui:chartEvents('events', 'eventsWin')             -- 正在播放的歌曲
gui:chartEvents('editor', 'editWin', 'your-song') -- 任何谱面,任何场景
```

### gui:addChartEvent(tag, name, ?time, ?v1, ?v2)
*自 v0.7.0*

参数：
- `tag`(String)——谱面事件时间线
- `name`(String)——事件名称；为新名称添加轨道
- `time`(Number?)——秒；省略为播放头
- `v1`(String?)——值 1
- `v2`(String?)——值 2

返回：Bool

向时间线的谱面添加事件.

```lua
gui:addChartEvent('events', 'fight', gui:time('events'))
```

### gui:setChartEvent(tag, name, time, ?v1, ?v2)
*自 v0.7.0*

参数：
- `tag`(String)——谱面事件时间线
- `name`(String)——事件名称(其轨道)
- `time`(Number)——事件的秒数
- `v1`(String?)——新值 1
- `v2`(String?)——新值 2

返回：Bool

更改谱面事件的值(及其工具提示).

```lua
function onKeySelected(tag, track, time, value, v1, v2)
    selTrack, selTime = track, time
end

gui:setChartEvent('events', selTrack, selTime, 'dad', '1.2')
```

### gui:chartNotes(tag, parent, ?song, ?zoom)
*自 v0.7.0*

参数：
- `tag`(String)——时间线标签(缺失时创建,存在时重建)
- `parent`(String)——窗口或 window.tab
- `song`(String?)——按名称加载谱面；省略为正在播放的歌曲
- `zoom`(Number?)——一次可见秒数 [默认 8]

返回：Bool

谱面的音符车道视图：8 条车道——对手的左 / 下 / 上 / 右,一个小间隙,然后是玩家的——音符用通常的箭头颜色,长按音符绘制为尾部.悬停音符查看其侧和方向和时间和长按长度和音符类型.

对于按名称加载的谱面,你可以像关键帧一样编辑音符(双击车道添加和拖动和右键删除和撤销 / 重做)；正在播放的歌曲的音符是只读的,所以玩家下面没有任何变化.同一歌曲的事件和音符时间线共享一个谱面,所以任一上的 `gui:saveChart` 保存两者.

```lua
gui:tab('chartWin', 'notes', 'Notes')
gui:chartNotes('notes', 'chartWin.notes', 'your-song', 8)
```

### gui:chartGrid(tag, parent, ?song, ?height, ?cell)
*自 v0.7.0*

参数：
- `tag`(String)——控件标签(如果存在,用新谱面重建)
- `parent`(String)——窗口或 window.tab
- `song`(String?)——按名称加载谱面；省略为正在播放的歌曲
- `height`(Number?)——高度(像素)(可调整大小的窗口拉伸它)[默认 420]
- `cell`(Number?)——列宽(像素)[默认 24]

返回：Bool

像 FNF / Psych / Funkin 的谱面编辑器网格：带节拍刻度和段落编号的标尺条,8 个音符列(对手左 / 下 / 上 / 右,一个间隙,然后玩家的),上方有名称标题,右侧有事件列.行是 16 分步,带棋盘格单元格和节拍 / 段落线,跟随谱面的 BPM 变化.左侧一个小地图显示整首歌曲的音符；点击或拖动它(或标尺条)以擦洗.

网格在裁剪视图内以垂直 1024 px 块预生成,所以滚动只移动它们.红线标记当前时间；歌曲播放时(或网格用其按钮自行播放)它保持在三分之一高度,音符在它下面滚动.

编辑(按名称加载的谱面)：点击空单元格放置音符,按住向下拖动使其成为长按音符,拖动音符在列和时间之间移动它,右键或双击删除,Ctrl+Z / Ctrl+Y 撤销 / 重做.放置吸附到 `gui:snap(tag, 4 / 8 / 12 / 16 / 24 / 32 ...)`(默认 16 = 十六分音符).滚轮滚动,Ctrl + 滚轮缩放行,中键拖动视图.用 `gui:saveChart` 保存.正在播放的歌曲的音符是只读的.

`gui:time`和`gui:play`和`gui:pause`和`gui:stop`和`gui:undo` 和 `gui:redo` 在它上工作；`gui:get('tag.selectedTime')`和`selectedLane`和`selectedLength`和`selectedD`和`selectedP` 读取选中的音符,`onKeySelected(tag, lane, time, length)` 报告点击.

属性(`gui:get/set('grid.x')`)：`time`和`length`和`beat`和`step`和`section`和`bpm`和`snap`和`notes`和`events`(读)和`leftName`和`rightName`和`light`(Funkin 风格浅色单元格)和`controls`(小的播放 / 时间行——当你的传输栏做那件事时关掉它)和`editable`.事件列：点击事件触发 `onChartEventClicked(tag, name, time, v1, v2)`,点击空位触发 `onEventCellClicked(tag, time)`.用 `gui:sync` 时鼠标滚轮按一拍移动歌曲,像 Funkin.

```lua
gui:window('editor', 'Chart editor', 820, 10, 420)
gui:resizable('editor', true)
gui:chartGrid('grid', 'editor', 'your-song', 560, 26)
gui:snap('grid', 16)
```

### gui:grid(tag, parent, cols, rows, ?cell, ?label)
*自 v0.7.0*

参数：
- `tag`(String)——新控件标签
- `parent`(String)——窗口或 window.tab
- `cols`(Int)——列数
- `rows`(Int)——行数
- `cell`(Number?)——单元格大小(像素)[默认 20]
- `label`(String?)——标签列文本

返回：Bool

用于任何基于单元格的东西的普通棋盘格网格——瓦片地图和图案和步进音序器.单元格为空或持有颜色.点击单元格(并拖过更多单元格)触发 `cell` → `onGridCell(tag, col, row, button)`,带 1 基 `col` / `row` 和 `button` `'left'` 或 `'right'`；你的脚本决定点击做什么.

```lua
gui:grid('pix', 'paint', 16, 16, 18)

function onGridCell(tag, col, row, button)
    if button == 'left' then gui:cell(tag, col, row, 'FF5A6E') else gui:cell(tag, col, row) end
end
```

### gui:cell(tag, col, row, ?color)
*自 v0.7.0*

参数：
- `tag`(String)——网格标签
- `col`(Int)——1 基列
- `row`(Int)——1 基行
- `color`(String?)——十六进制颜色；省略以清除单元格

返回：Bool

为网格的一个单元格着色或清除.

```lua
gui:cell('pix', 2, 3, '6C5CE7')
```

### gui:getCell(tag, col, row)
*自 v0.7.0*

参数：
- `tag`(String)——网格标签
- `col`(Int)——1 基列
- `row`(Int)——1 基行

返回：String

单元格的颜色作为 `'RRGGBB'`,空时为 `nil`.

```lua
if gui:getCell('pix', 1, 1) then print('filled') end
```

### gui:clearGrid(tag)
*自 v0.7.0*

参数：
- `tag`(String)——网格标签

返回：Bool

清除网格的每个单元格.

```lua
gui:clearGrid('pix')
```

### gui:saveChart(tag, ?path, ?format)
*自 v0.7.0*

参数：
- `tag`(String)——一个 chartEvents / chartNotes 时间线
- `path`(String?)——要写入的文件；省略以打开原生另存为对话框
- `format`(String?)——`freak`(引擎自己的格式)和`psych`(Psych Engine 谱面)或 `events`(仅事件)[默认 freak]

返回：Bool

将时间线的谱面保存为 JSON.

freak——与 `song:play` 读取的相同格式：`{song, bpm, speed, timeChanges, notes:[{t, d, p, l, nt}], events:[{t, name, v1, v2}]}`,时间以毫秒为单位.
psych——一个 Psych Engine 歌曲文件：16 分步段落跟随 BPM 变化(`changeBPM`),`mustHitSection` 设置为该段落中哪一侧音符更多(所以 Psych 的相机跟随正确的角色),车道按 Psych 方式映射,事件分组为 `[time, [[name, v1, v2], ...]]`.
events——与 `gui:saveChartEvents` 相同.

```lua
gui:saveChart('events')                              -- 另存为对话框,引擎格式
gui:saveChart('events', 'charts-edited/song.json')
gui:saveChart('events', nil, 'psych')                -- Psych Engine 谱面
```

### gui:saveChartEvents(tag, ?path)
*自 v0.7.0*

参数：
- `tag`(String)——一个谱面时间线
- `path`(String?)——要写入的文件；省略为另存为对话框

返回：Bool

仅保存事件：`{"format": "freak-engine", "song": ..., "events": [{t, name, v1, v2}]}`.

```lua
gui:saveChartEvents('events', 'events/your-song.json')
```

### gui:loadChartEvents(tag, path)
*自 v0.7.0*

参数：
- `tag`(String)——一个 chartEvents 时间线
- `path`(String)——JSON 文件：事件文件或纯事件列表

返回：Bool

用文件中的事件替换谱面的事件并重建时间线.

```lua
gui:loadChartEvents('events', 'events/your-song.json')
```

### gui:undo(tag)
*自 v0.7.0*

参数：
- `tag`(String)——时间线标签

返回：Bool

撤销时间线的最后一次编辑(添加和移动和删除和值改变).与在其上的 Ctrl+Z 相同.没有可撤销的内容时返回 `false`.

```lua
gui:undo('events')
```

### gui:redo(tag)
*自 v0.7.0*

参数：
- `tag`(String)——时间线标签

返回：Bool

重做最后一次撤销的编辑.与在时间线上的 Ctrl+Y / Ctrl+Shift+Z 相同.

```lua
gui:redo('events')
```

### 菜单栏

### gui:bar(tag, ?dock)
*自 v0.7.0*

参数：
- `tag`(String)——新栏标签
- `dock`(String?)——`top` 或 `bottom` [默认 top]

返回：Bool

横跨整个屏幕的菜单 / 工具栏,停靠在顶部或底部(多个栏堆叠).窗口永远不会到栏下面.用下拉菜单(`gui:barMenu`)和按钮(`gui:barButton`)和文本(`gui:barLabel`)填充它,每个左和中或右对齐——顶部桌面风格菜单栏,底部传输栏.

```lua
gui:bar('menu', 'top')
gui:barMenu('menu', 'mFile', 'File')
gui:menuItem('menu', 'mFile', 'fSave', 'Save chart', 'Ctrl+S')
gui:menuSeparator('menu', 'mFile')
gui:menuItem('menu', 'mFile', 'fExit', 'Exit')

gui:on('fSave', 'click', function() gui:saveChart('grid') end)

function onMenuItem(bar, item, checked)
    if item == 'fExit' then state:change('menu') end
end
```

### gui:barMenu(tag, id, caption, ?align)
*自 v0.7.0*

参数：
- `tag`(String)——栏标签
- `id`(String)——菜单 id(唯一 gui 标签)
- `caption`(String)——栏上的文本
- `align`(String?)——`left`和`center` 或 `right` [默认 left]

返回：Bool

添加下拉菜单.点击它打开列表；菜单打开时,移到另一个菜单切换到它.点击外面关闭它.

```lua
gui:barMenu('menu', 'mEdit', 'Edit')
```

### gui:menuItem(tag, menu, id, caption, ?shortcut)
*自 v0.7.0*

参数：
- `tag`(String)——栏标签
- `menu`(String)——菜单 id
- `id`(String)——项目 id(唯一 gui 标签)
- `caption`(String)——项目文本
- `shortcut`(String?)——右侧显示的提示,像 `Ctrl+Z`(仅显示)

返回：Bool

向菜单添加项目.点击它触发项目自己的 `click`(`gui:on(id, 'click', fn)`)和 `onMenuItem(bar, item, ?checked)`.

```lua
gui:menuItem('menu', 'mEdit', 'eUndo', 'Undo', 'Ctrl+Z')
```

### gui:menuGroup(tag, menu, id, caption)
*自 v0.7.1*

参数：
- `tag`(String)——栏标签
- `menu`(String)——菜单 id,或另一个组的 id 以嵌套它
- `id`(String)——新组的 id
- `caption`(String)——菜单中显示的文本

返回：Bool

添加组：一个菜单行,带箭头,指向时向侧面打开自己的列表.用 `gui:menuItem` 和 `gui:menuSeparator` 填充它,使用组的 id 作为 `menu`.组可以持有其他组.组内项目的点击以与普通项目相同的方式到达(`onMenuItem`).用组保持长菜单短.

```lua
gui:bar('top')
gui:barMenu('top', 'edit', 'Edit')
gui:menuItem('top', 'edit', 'undo', 'Undo', 'Ctrl+Z')
gui:menuGroup('top', 'edit', 'selectGroup', 'Select')
gui:menuItem('top', 'selectGroup', 'selAll', 'Select all', 'Ctrl+A')
gui:menuItem('top', 'selectGroup', 'selNone', 'Deselect', 'Ctrl+D')
```

### gui:menuSeparator(tag, menu)
*自 v0.7.0*

参数：
- `tag`(String)——栏标签
- `menu`(String)——菜单 id

返回：Bool

向菜单添加分隔线.

```lua
gui:menuSeparator('menu', 'mFile')
```

### gui:menuCheck(id, ?checked)
*自 v0.7.0*

参数：
- `id`(String)——项目 id
- `checked`(Bool?)[默认 true]

返回：Bool

将项目变成检查项目：它显示复选标记并在每次点击时翻转它；新状态在 `onMenuItem` 中作为 `checked` 到达.`gui:get(id)` 读取它.

```lua
gui:menuItem('menu', 'mView', 'vLight', 'Light grid')
gui:menuCheck('vLight', true)
```

### gui:barButton(tag, id, caption, ?align)
*自 v0.7.0*

参数：
- `tag`(String)——栏标签
- `id`(String)——按钮 id(唯一 gui 标签)
- `caption`(String)——按钮文本
- `align`(String?)——`left`和`center` 或 `right` [默认 left]

返回：Bool

栏上的按钮；触发 `click` / `onWidgetClicked(id)`.`gui:set(id, text)` 更改其标题(播放按钮变成暂停).

```lua
gui:barButton('transport', 'tPlay', '>', 'center')
```

### gui:barLabel(tag, id, text, ?align)
*自 v0.7.0*

参数：
- `tag`(String)——栏标签
- `id`(String)——标签 id(唯一 gui 标签)
- `text`(String)——文本
- `align`(String?)——`left`和`center` 或 `right` [默认 left]

返回：Bool

栏上的文本；用 `gui:set(id, text)` 每帧更新它——时间和拍和BPM.`gui:enable(id, false)` 灰化任何栏项目或菜单项目,`gui:show(bar, false)` 隐藏整个栏.

```lua
gui:barLabel('transport', 'tTime', '0:00.00')
gui:set('tTime', string.format('%.2f', gui:get('grid.time')))
```

### 值和事件和可见性

### gui:get(tag)
*自 v0.7.0*

参数：
- `tag`(String)——控件或窗口标签

返回：Dynamic

读取控件的值(数字和文本和`true`/`false`和路径或十六进制).对于窗口它返回选中的标签页.

```lua
local vol = gui:get('volume')
```

### gui:set(tag, value)
*自 v0.7.0*

参数：
- `tag`(String)——控件或窗口标签
- `value`(Dynamic)——新值；对于窗口,要选择的标签页

返回：Bool

更改控件的值而不触发 `change`.对于列表它选择路径,打开其文件夹并滚动到它.

```lua
gui:set('load', 0.5)
gui:set('dbg', 'color')
```

### gui:on(tag, event, fn)
*自 v0.7.0*

参数：
- `tag`(String)——控件或窗口标签
- `event`(String)——`change`和`click`和`submit`和`open`和`toggle`和`tab` 或 `close`
- `fn`(Function)——处理程序；得到没有标签的事件参数

返回：Bool

为一个控件添加处理程序.多个处理程序可以监听同一事件.

```lua
gui:on('volume', 'change', function(v) sound:masterVolume(v / 100) end)
```

### gui:off(tag, ?event)
*自 v0.7.0*

参数：
- `tag`(String)——控件或窗口标签
- `event`(String?)——仅此事件；省略以丢弃标签的每个处理程序

返回：Bool

移除用 `gui:on` 添加的处理程序.

```lua
gui:off('volume')
```

### gui:show(tag, ?visible)
*自 v0.7.0*

参数：
- `tag`(String)——控件或窗口标签
- `visible`(Bool?)[默认 true]

返回：Bool

显示或隐藏窗口或单个控件(窗口关闭间隙).

```lua
gui:show('dbg')
```

### gui:hide(tag)
*自 v0.7.0*

参数：
- `tag`(String)——控件或窗口标签

返回：Bool

与 `gui:show(tag, false)` 相同.

```lua
gui:hide('dbg')
```

### gui:enable(tag, ?enabled)
*自 v0.7.0*

参数：
- `tag`(String)——控件标签
- `enabled`(Bool?)[默认 true]

返回：Bool

灰化控件并在禁用时忽略其上的鼠标.

```lua
gui:enable('apply', false)
```

### gui:tooltip(tag, text)
*自 v0.7.0*

参数：
- `tag`(String)——控件标签
- `text`(String)——工具提示；`nil` 移除它

返回：Bool

鼠标停在控件上后显示一个小样式化工具提示.

```lua
gui:tooltip('speed', 'Note scroll speed multiplier')
```

### gui:exists(tag)
*自 v0.7.0*

参数：
- `tag`(String)——控件或窗口标签

返回：Bool

标签是否在使用中.

```lua
if not gui:exists('dbg') then makeDebugWindow() end
```

### gui:remove(tag)
*自 v0.7.0*

参数：
- `tag`(String)——控件或窗口标签

返回：Bool

移除控件,或带所有控件的窗口.

```lua
gui:remove('dbg')
```

### gui:clear()
*自 v0.7.0*

返回：Bool

关闭并移除脚本制作的每个 gui 窗口,及其内部的一切.

```lua
gui:clear()
```

### gui:typing()
*自 v0.7.0*

返回：Bool

文本输入有焦点期间为 `true`——便于跳过你自己的热键.

```lua
if not gui:typing() and input:keyJustPressed('R') then restart() end
```

### 主题和文本和通知

### gui:theme(?name)
*自 v0.7.1*

参数：
- `name`(String?)——来自 assets/ui/themes 的主题名称或文件名.省略,或传递 "default",为默认外观 [默认 nil]

返回：Bool

用主题的 `ui` 块为每个 gui 窗口和栏和菜单着色(与谱面编辑器使用的相同 JSON 主题).已存在的窗口也重新着色.在脚本调用这个之前什么都不改变：谱面编辑器自己的主题永远不会触及你的 gui.当主题缺失或没有 `ui` 块时返回 `false` 并报告错误.

```lua
gui:theme('Midnight')
-- 之后
gui:theme()
```

### 主题颜色

`assets/ui/themes` 中主题的 `ui` 块接受这些键.颜色是 `"#RRGGBB"` 或 `"#AARRGGBB"`.省略的键保持默认；标记为"跟随"的键在主题不设置它们时从另一个键取颜色,所以旧主题保持外观.

| 键 | 颜色 |
|---|---|
| `window` | 窗口背景 |
| `border` | 窗口和字段边框 |
| `accent` | 高亮和活动标签页和滑块 |
| `text` | 主文本 |
| `textDim` | 标签 |
| `textMuted` | 提示和禁用文本 |
| `field` | 输入和列表背景 |
| `fieldBorder` | 输入边框 |
| `fieldFocus` | 输入时输入边框(跟随 `accent`)v0.7.2 |
| `divider` | 分隔线 |
| `hover` | 悬停行(跟随 `accent`) |
| `rowAlt` | 每隔一个列表行 |
| `panel` | 面板 |
| `panelHead` | 窗口标题栏 |
| `popup` | 下拉菜单 |
| `list` | 列表 |
| `barTop` | 顶部菜单栏 |
| `barBottom` | 底部栏 |
| `button` | 按钮 |
| `buttonHover` | 悬停按钮 |
| `buttonDown` | 按下按钮 |
| `tooltip` | 工具提示背景(跟随 `window`)v0.7.2 |
| `scrollHover` | 悬停滚动条滑块(跟随 `accent`)v0.7.2 |
| `link` | 通知中的脚本链接(跟随 `accent`)v0.7.2 |
| `success` | 成功通知 v0.7.2 |
| `warning` | 警告通知 v0.7.2 |
| `error` | 错误通知 v0.7.2 |
| `ink` | 在彩色图标上绘制的标记 v0.7.2 |
| `shadow` | 窗口阴影 v0.7.2 |

谱面编辑器还读取 `colors` 块中的 `CPU label` 条目作为 CPU 车道上方的名称 v0.7.2.在其设置中,悬停列表中的主题立即预览它；关闭列表而不选择会恢复旧主题 v0.7.2.

### gui:fontSize(?size)
*自 v0.7.0*

参数：
- `size`(Int?)——基础文本大小,8..32 [默认 11]

返回：Bool

设置每个 gui 窗口的文本大小,包括已存在的窗口.行和标签页和标签列随之增长.

```lua
gui:fontSize(13)
```

### gui:textSpacing(tag, ?letters, ?lines)
*自 v0.7.2*

参数：
- `tag`(String)——一个控件,或一个窗口以更改其中的每个文本
- `letters`(Number?)——字母之间的额外空间(像素),可以为负 [默认 0]
- `lines`(Int?)——行之间的额外空间(像素)[默认 0]

返回：Bool

间隔控件或整个窗口的文本.文本之后更改时设置保持.

```lua
gui:label('title', 'dbg', 'SCORE')
gui:textSpacing('title', 2)
gui:textSpacing('dbg', 0, 3)
```

### gui:scale(?value)
*自 v0.7.0*

参数：
- `value`(Number?)——UI 缩放,最小 0.25 [默认 1]

返回：Bool

缩放每个窗口,用于大屏幕.

```lua
gui:scale(1.5)
```

### gui:notify(text, ?kind, ?seconds)
*自 v0.7.1*

参数：
- `text`(String)——要显示的消息
- `kind`(String?)——info和success和warn 或 error [默认 "info"]
- `seconds`(Float?)——它停留多久；指向它暂停计时器 [默认 3.2]

返回：Bool

在右下角显示通知,与谱面编辑器使用的相同：类型图标和带剩余时间的条和悬停时的关闭按钮.再次显示相同文本增加计数器而不是堆叠.

```lua
gui:notify('Replay saved', 'success')
gui:notify('No save file yet', 'warn', 5)
```

---

## 颜色函数

`color` 命名空间暴露 OpenFL 的 `sprite.colorTransform`——逐通道乘数(`0`–`1`)和加法偏移(`-255`–`255`).乘数先应用,然后偏移.当 `tw:color`(动画基本色调)不够时使用它——例如加法增亮和通道偏移和幽灵化但不淡出的效果.

### 你可以着色什么

`tag` 参数在有精灵时是精灵标签,否则是 game:get 行走能到达的任何目标——所以 `color:*` 现在在不是标记精灵的东西上工作：音符和接收器和字母和角色和整个音符线.

- 一个活动音符——`color:set('spawnedNotes.0.0', {...})`(strum 0 = 玩家,然后音符索引)

- 一侧的所有音符——`color:tint('spawnedNotes.0', 'FF4466')`(数组目标扇出到每个音符)

- 一个接收器——`color:set('playerStrums.members.2', {...})`(2 = 上)

- 一个字母——`color:tint('title.letters.1', '00CCFF')`

- 一个角色 / 音符线——`color:mul('boyfriend', 1.4,1.4,1.4)`和`color:reset('playerStrums')`(组扇出到其成员)

数组和组扇出到每个可着色成员；没有活动 `colorTransform` 的任何东西(已销毁的精灵)被跳过而不是崩溃.

### color:set(tag, opts)

参数：
- `tag`(String)——精灵标签
- `opts`(Table)——部分变换——`rm, gm, bm, am`(乘数)和 `ro, go, bo, ao`(偏移)的任何子集.缺失的键保持不变.

返回：Bool

传递像 `'4A6FA5'` 这样的颜色字符串以简单地重新着色对象(文本得到该文本颜色).用表提供的任何字段修补精灵的 `colorTransform`.当你想微调一个通道而不重新声明其他通道时使用这个.

```lua
color:set('logo', { rm = 0.5, bm = 1.2, ro = 30 })
```

### color:fill(tag, color, amount)
*自 v0.7.5*

参数：
- `tag`(String)——精灵标签
- `color`(String)——填充颜色；其 alpha(像 `'1E88E5 52%'`)是强度
- `amount`(Number?)——强度 0..1,覆盖颜色的 alpha

返回：Bool

像 Figma 中的半透明填充层一样在图片上铺一层颜色：`'1E88E5 52%'` 将图像向该颜色混合 52%,所以亮的部分保持明亮.`color:set` 改为将图像乘以颜色,这只会使它变暗.用 `color:reset` 撤销.在平铺背景上不可用.

```lua
sprite:add('cover', 'menu/shop/cover')
color:fill('cover', '1E88E5 52%')   -- 像 Figma 中的 52% 蓝色填充
color:reset('cover')
```

### color:mul(tag, r, g, b, a)

参数：
- `tag`(String)——精灵标签
- `r`(Float)——红色乘数(`0`–`1`)
- `g`(Float)——绿色乘数
- `b`(Float)——蓝色乘数
- `a`(Float)——Alpha 乘数 [默认 1]

返回：Bool

一次设置所有四个乘数.相当于带 `{rm, gm, bm, am}` 的 `color:set` 但更紧凑.也在背景上工作——RGB 乘数通过精灵的 `color` 路由,所以平铺渲染器尊重它们(背景上高于 `1` 的值被钳制,并带控制台说明).

```lua
color:mul('ghost', 1, 1, 1, 0.35)  -- 35% alpha 而不触碰 sprite.alpha
color:mul('night', 0.4, 0.4, 0.7)  -- 冷色调
```

### color:offset(tag, r, g, b, a)

参数：
- `tag`(String)——精灵标签
- `r`(Float)——红色偏移(`-255`–`255`)
- `g`(Float)——绿色偏移
- `b`(Float)——蓝色偏移
- `a`(Float)——Alpha 偏移 [默认 0]

返回：Bool

设置所有四个加法偏移.正值增亮通道,负值使它变暗.来自 `color:mul` 的乘数仍然适用.

```lua
color:offset('flash', 80, 80, 80)   -- 加法高光脉冲
color:offset('reddened', 60, -30, -30)
```

### color:tint(tag, color, strength)

参数：
- `tag`(String)——精灵标签
- `color`(String)——十六进制颜色——接受 `RRGGBB`和`0xRRGGBB` 或 `#RRGGBB`
- `strength`(Float)——混合量(`0`–`1`,钳制)[默认 1.0]

返回：Bool

在精灵的原始颜色(强度 `0`)和目标十六进制(强度 `1`)之间混合的乘法色调.只触及 RGB——alpha 保留.也在背景上工作(它现在驱动精灵的 `color`,所以平铺背景渲染器尊重它).

```lua
color:tint('logo', 'FF8800', 0.8)   -- 大部分橙色
color:tint('logo', '4488FF', 0.3)   -- 微妙冷色调
```

### color:reset(tag)

参数：
- `tag`(String)——精灵标签

返回：Bool

恢复恒等变换——所有乘数到 `1`,所有偏移到 `0`.相当于从未触碰过精灵.

```lua
color:reset('logo')
```

### color:get(tag)

参数：
- `tag`(String)——精灵标签

返回：Table

返回精灵或文本的颜色：`color`(十六进制像 `"FF8800"`)和`r`和`g`和`b`(0..255)和 `alpha`,加上变换键 `rm, gm, bm, am, ro, go, bo, ao`.如果标签未知则返回 `nil`.

```lua
local c = color:get('logo')
print(c.color, c.alpha)
if c.r > 200 then color:set('logo', 'FFFFFF') end
```

---

## 混合函数

`blend` 命名空间控制精灵如何合成到它背后的场景上.它根据你选择的模式自动路由到两种机制之一——快速原生 GPU 混合,或读取完成帧的着色器,用于 GPU 无法单独完成的模式.

### 两种混合

原生模式(`add`和`multiply`和`screen`和`subtract` 和普通 OpenFL 模式)直接设置在精灵上——它们是免费的,由 GPU 在正常通道中绘制,精灵保持原位.

读取目标的模式(`overlay`和`hardlight`和`softlight`和`difference`和`exclusion`和`colordodge`和`colorburn`)不能表示为 GPU 混合因子——它们需要读取精灵背后的像素.在 C++ 目标上,OpenFL 静默地将这些渲染为 `normal`,所以 `blend` 用着色器处理它们.

### 原生模式

通过精灵的 OpenFL `BlendMode` 直接设置在精灵上.免费且定位.名称不区分大小写.

| 名称 | 效果 |
|---|---|
| `normal` | 默认 alpha 合成. |
| `add` | 相加通道值——增亮.适合辉光 / 光晕. |
| `multiply` | 相乘通道——变暗.阴影通道. |
| `screen` | 反向乘法——增亮,比 `add` 柔和. |
| `subtract` | 从背景减去精灵的通道. |
| `invert` | 在精灵覆盖处反转背景. |
| `alpha` | 将精灵视为背景的 alpha 遮罩. |
| `darken` | 每通道 min(精灵, 背景). |
| `lighten` | 每通道 max(精灵, 背景). |
| `layer` | 在混合前强制精灵进入自己的表面. |
| `erase` | 在精灵覆盖处从背景中切孔. |
| `shader` | 使用精灵分配的着色器进行混合. |

### 硬件模式

在具有 `KHR_blend_equation_advanced` OpenGL 扩展的显卡上(最近几年的大多数桌面 GPU),GPU 自己混合这些模式.`blend:set` 总是为精灵使用这些 GPU 模式：没有相机滤镜,不读取完成帧,任何大小和位置都正确,与 `add` 或 `multiply` 一样便宜.没有扩展时它们绘制为正常；游戏日志在第一次 `blend:set` 时一次说明 GPU 是否有它们.

| 名称 | 效果 |
|---|---|
| `overlay`和`hardlight`和`softlight` | 对比混合,见下表. |
| `difference`和`exclusion` | 通道差. |
| `colordodge`和`colorburn` | 增亮或变暗背景. |
| `darken` | 保留较暗的颜色,带正确的透明度. |
| `hue` | 背景亮度和饱和度,精灵的色相.仅硬件. |
| `saturation` | 背景色相和亮度,精灵的饱和度.仅硬件. |
| `color` | 背景亮度,精灵的色相和饱和度：着色同时保留阴影.仅硬件. |
| `luminosity` | 背景颜色,精灵的亮度.仅硬件. |

下面的读取目标着色器仅在你传递 `backdrop` 相机或 `layered = true` 时使用.在 GPU 混合上,`blend:intensity` 设置精灵的 alpha.用 `blend:hardware()` 检查.

带效果的相机.有着色器或滤镜的相机(`shader:vignette`和`filter:blur` 等)首先将其精灵绘制到自己的缓冲区中,所以该相机上的混合只与该相机混合,不与下面的相机混合.当混合精灵需要到达下面时,将它们放在没有效果的相机上.

### 读取目标的模式

默认情况下,它读取精灵自己的纹理并作为滤镜混合到整个相机上,使用屏幕空间坐标——对于旨在覆盖帧的纹理(颜色分级和暗角和颗粒叠加)是正确的,但它不会就地合成一个小型和定位的元素；纹理只是在视口中被采样,不管精灵实际坐在哪里.为此,传递 `layered = true`——它在精灵本身上渲染混合,在精灵的实际屏幕位置采样真实背景像素,所以对任何大小和位置都正确.精灵的 `alpha`(和任何 alpha 补间)仍然驱动效果的强度,`blend:intensity` 淡出整个东西.

| 名称 | 效果 |
|---|---|
| `overlay` | 根据背景亮度乘法 / 屏幕.经典对比分级. |
| `hardlight` | 像 overlay 但由叠加图像的亮度驱动. |
| `softlight` | 更柔和的 overlay——柔道奇 / 燃烧. |
| `difference` | 绝对通道差. |
| `exclusion` | 像 difference 但对比度更低. |
| `colordodge` / `dodge` | 根据叠加增亮背景. |
| `colorburn` / `burn` | 根据叠加变暗背景. |

### blend:set(tag, mode, backdrop, layered)
*自 v0.2.5*

参数：
- `tag`(String)——精灵标签,或 text:letters 组
- `mode`(String)——混合模式名称(不区分大小写).见上表
- `backdrop`(String?)——仅读取目标模式：应用混合的相机标签.默认为精灵自己的相机
- `layered`(Bool?)——仅读取目标模式：在精灵上就地渲染混合(真实屏幕位置)而不是拉伸到整个相机.默认 false [可选]

返回：Bool

应用命名混合.原生模式直接设置在精灵上(对于 `text:letters` 标签,每个字母).读取目标模式要么隐藏精灵并将其图像作为滤镜混合到整个相机上(默认),要么在 `layered = true` 时在精灵本身上以其真实位置渲染它——见上面的说明了解使用哪个.未知的原生名称静默解析为 `normal`.

`text:letters` 组没有自己的单一图像,所以其上的读取目标模式总是逐字母就地渲染(相当于 `layered = true`)而不是失败.

如果该组已经有 text:gradientShader 运行,混合共享每个字母的同一着色器实例而不是替换它,所以渐变(动画或非动画)和混合都保持活动.为此,先设置渐变,然后设置混合.

```lua
-- 原生加法辉光,在精灵处绘制
sprite:add('glow', 'fx/glow'); blend:set('glow', 'add')

-- 舞台上的全屏颜色分级
sprite:add('grade', 'fx/color'); scroll:lock('grade')
blend:set('grade', 'overlay')

-- 在一个定位精灵上的就地叠加
sprite:add('badge', 'ui/badge', 40, 40)
blend:set('badge', 'overlay', nil, true)

-- 字母就地混合,无需 layered 标志
text:letters('label', 'HELLO', 0, 0, 32)
blend:set('label', 'overlay')
```

### blend:intensity(tag, value)
*自 v0.5.4*

参数：
- `tag`(String)——有读取目标混合的精灵标签
- `value`(Number)——强度 `0..1`

返回：Bool

淡入或淡出读取目标混合.它与精灵自己的 `alpha` 相乘,所以你可以在这里驱动粗略强度,并单独动画 `alpha`.如果精灵没有设置读取目标混合则失败.

```lua
blend:set('grade', 'softlight')
blend:intensity('grade', 0.5)     -- 半强度
tween:alpha('gradeIn', 'grade', 1, 1.5)   -- 并通过 alpha 淡入
```

### blend:clear(tag)

参数：
- `tag`(String)——精灵标签

返回：Bool

移除混合.对于原生模式,这将精灵重置为 `normal`；对于读取目标模式,它移除相机滤镜并使精灵再次可见.

```lua
blend:clear('grade')
```

### blend:debugBackdrop(tag, on?)

参数：
- `tag`(String)——精灵标签
- `on`(Bool)——`false` 回到正常混合 [默认 true]

返回：Bool

就地(分层)混合读取精灵背后屏幕的调试视图.开启时,精灵显示它正在读取的背景而不是混合结果,所以你可以检查它抓取正确的区域.如果精灵没有这种混合则失败.

```lua
blend:set('glow', 'overlay', nil, true)
blend:debugBackdrop('glow')        -- 查看它读取什么
blend:debugBackdrop('glow', false)
```

### blend:get(tag)

参数：
- `tag`(String)——精灵标签

返回：String

返回当前混合模式名称(小写)或 `nil` 如果标签未知.

```lua
print(blend:get('grade'))  -- "overlay"
```

### blend:hardware()
*自 v0.7.4*

返回：Bool

此 GPU 是否自己混合高级模式(`KHR_blend_equation_advanced`).当它为 `false` 时,`overlay` 和其他对比模式走着色器路径,`hue` / `saturation` / `color` / `luminosity` 绘制为正常.

```lua
if blend:hardware() then
    blend:set('tint', 'color')
else
    sprite:color('tint', 'FF4080', 0.5)
end
```

### 在相机上混合纯色

`blend:set` 总是从精灵的图像工作.如果你只想将纯色混合到整个相机上(色调和hardlight 洗),使用 `camera:overlay(camTag, color, alpha, mode)` 代替——相同的混合模式数学,不需要精灵.

---

## 着色器函数

按标签应用于任何渲染目标的 GPU 着色器效果——精灵和背景(底层是精灵)或整个相机.在精灵/背景上,效果使用其着色器槽；在相机上,它是覆盖该相机绘制的所有内容的全屏后处理滤镜.`shader:clear` 从任何这些中移除它.对于轮廓描边着色器,见 sprite:outline.这里的每个函数也接受标签表(`{'game', 'hud'}`)或 `'all'` 表示每个相机,并对每个应用自身.

### 透视

### shader:perspective(tag, x, y, vanishX, vanishY, overscan)

参数：
- `tag`(String)——精灵和背景或相机标签
- `x`(Number)——水平透视强度,`-0.95`…`0.95`.正使右边缘后退；负使左边缘.`0` = 平坦 [默认 0]
- `y`(Number)——垂直透视强度,`-0.95`…`0.95`.正使底部后退；负使顶部.`0` = 平坦 [默认 0]
- `vanishX`(Number)——水平移动消失点(透视汇聚处)[默认 0]
- `vanishY`(Number)——垂直移动消失点 [默认 0]
- `overscan`(Number)——仅相机.在屏幕周围渲染的额外视图分数,以便倾斜显示真实屏幕外内容(例如更多地图)而不是拉伸边缘像素.`0` 保持旧的边缘填充外观；更高显示更多.相机渲染得更清晰以弥补它,所以更大的 overscan 不再模糊图片 v0.7.7 [默认 0.2]

返回：Bool

应用透视(投影)扭曲——以真正的透视缩短在 3D 中倾斜目标(远边缘变窄并压缩),不是平面剪切.在图集帧上工作；再次调用它就地更新现有着色器,所以从 `onUpdate` 每帧驱动动画倾斜很便宜.传递全零以移除它.

在精灵/背景上,扭曲保持在对象的矩形内,后退区域透明.在相机上它是全屏滤镜,`overscan` 用真实屏幕外内容填充暴露的边缘而不是拉伸像素(见下面的参数).

在相机上,倾斜的图片可以渲染得更清晰,所以细线和动画精灵在扭曲下保持清晰：用 `shader:perspectiveQuality` 打开它.

不确定倾斜从哪里开始？`shader:perspectiveDebug` 描边倾斜的命中框并标记其四个角.

```lua
sprite:add('card', 'ui/card')
shader:perspective('card', 0.4, 0)        -- 使右边缘后退
shader:perspective('card', 0, -0.5)        -- 使顶部朝向相机

backdrop:add('floor', 'tiles/floor')
shader:perspective('floor', 0, 0.6)        -- 瓦片后退

-- 整个相机：overscan 在倾斜时显示真实屏幕外内容
camera:add('world')
shader:perspective('world', 0, 0.25, 0, 0, 0.3)

-- 动画倾斜
function onUpdate(dt)
    t = (t or 0) + dt
    shader:perspective('card', math.sin(t) * 0.7, 0)
end

shader:perspective('card', 0, 0)           -- 移除
```

### shader:perspectiveDebug(tag, show)
*自 v0.7.7*

参数：
- `tag`(String)——已有 `shader:perspective` 的精灵和背景或相机标签
- `show`(Bool?)——`false` 再次隐藏引导线 [默认 true]

返回：Bool

在倾斜后围绕命中框绘制轮廓,以便你在调整时准确看到对象最终落在哪里：
- 黄色轮廓——应用透视后精灵和文本或相机图片的边缘.
- 四个白点——角落：左上和右上和左下和右下.
在有 `text:marquee` 的文本上,轮廓跟随跑马灯窗口,文本在它下面滚动时倾斜保持固定.

```lua
function onCreate()
    camera:add('pause')
    shader:perspective('pause', 0.6, 0, 0.1, 0)
    shader:perspectiveDebug('pause')
end
```

### shader:perspectiveScroll(tag, scrollFactorX, scrollFactorY, vanishX, vanishY, cameraTag)

参数：
- `tag`(String)——精灵和背景或相机标签
- `scrollFactorX`(Number)——每屏幕水平相机滚动的倾斜——每帧的 X 倾斜是 `(camera.scroll.x / screenWidth) * scrollFactorX`,钳制到 `±0.95`.与 `scroll:*` 因子相同的直觉：`0.5` 在滚动一个完整屏幕宽度后达到半倾斜 [默认 0.5]
- `scrollFactorY`(Number)——每屏幕垂直相机滚动的倾斜(`(camera.scroll.y / screenHeight) * scrollFactorY`)[默认 0.5]
- `vanishX`(Number)——静态消失点 X 偏移 [默认 0]
- `vanishY`(Number)——静态消失点 Y 偏移 [默认 0]
- `cameraTag`(String?)——哪个相机的滚动驱动它.省略以使用精灵自己的相机(或,对于相机目标,其自身滚动)[可选]

返回：Bool

将目标的透视倾斜绑定到相机滚动,每帧重新计算,所以目标在世界上滚动时以 3D 倾斜,场景读起来有深度 / 视差.传递 `0, 0` 以解绑并扁平化.自动停止跟踪已销毁的目标并在 `state:change` 时清除.

在精灵/背景上,扭曲应用于对象自己的四边形——在平铺背景上意味着每个瓦片.对于经典的单平面 3D 地板,改为以相机为目标：将地板放在自己的相机上,并将该相机的倾斜绑定到主相机的滚动——整个视图(包括平铺)通过相机滤镜作为一个平面扭曲,overscan 用真实内容填充暴露的边缘.

```lua
-- 每对象倾斜
backdrop:add('bg', 'pattern')
shader:perspectiveScroll('bg', 0.5, 0.5)      -- 随其相机倾斜
shader:perspectiveScroll('bg', 0, 0)          -- 解绑 / 扁平化

-- 单平面 3D 地板：自己的相机,由主相机的滚动驱动
camera:bind('main')
camera:add('floorCam')
backdrop:add('floor', 'pattern', 'x')
sprite:camera('floor', 'floorCam')
shader:perspectiveScroll('floorCam', 0.4, 0.6, 0, 0, 'main')
```

### shader:perspectiveQuality(quality)
*自 v0.7.7*

参数：
- `quality`(Float)——`1` 如常渲染相机.`2`…`4` 将相机渲染得那么清晰并平滑边缘 [默认 2]

返回：Bool

为每个有 `shader:perspective` 的相机提供更清晰的渲染.在调用值高于 `1` 之前它是关闭的.它使用明显更多的显存,特别是在 1080p,大小上限为 4096 像素,所以在大型窗口上质量会自行降低.`shader:perspectiveQuality(1)` 再次关闭它.

```lua
function onCreate()
    camera:add('pause')
    shader:perspective('pause', 0.6, 0, 0.1, 0)
    shader:perspectiveQuality(3)
end
```

### shader:clear(tag)

参数：
- `tag`(String)——精灵和背景或相机标签

返回：Bool

从对象移除任何着色器,恢复正常渲染.未设置时调用是安全的.

```lua
shader:clear('card')
```

### shader:has(tag)

参数：
- `tag`(String)——精灵和背景或相机标签

返回：Bool

如果对象当前分配了着色器(来自 `shader:perspective`和`sprite:outline` 等)则返回 `true`.

```lua
if not shader:has('card') then shader:perspective('card', 0.3, 0) end
```

### 效果着色器

五个移植的效果着色器,每个都适用于精灵标签或相机标签.在相机上,它们作为屏幕滤镜附着,并与透视/颜色分级滤镜以及彼此堆叠；在精灵上,它们使用精灵的单个着色器槽(如果另一个效果在那里,会触发控制台警告).时间驱动的效果(heat和rain)自动动画.再次调用相同函数以实时调整参数；传递 `0` 强度/强度(或使用 `shader:clearFx`)以移除.

### shader:heat(tag, strength, speed, scale, coverage)

参数：
- `tag`(String)——精灵或相机标签
- `strength`(Number?)——扭曲量(UV 单位,约 0.005–0.03).`0` 移除 [默认 0.01]
- `speed`(Number?)——动画速度乘数 [默认 1]
- `scale`(Number?)——噪声缩放——更高 = 更细的涟漪 [默认 8]
- `coverage`(Number?)——`1` = 整个目标,`0` = 集中向底部 [默认 1]

返回：Bool

动画热浪扭曲(fbm 噪声波),像沥青上的空气或火焰.

```lua
shader:heat('game', 0.012, 1.2)      -- 全屏闪烁
shader:heat('campfire', 0.02, 2, 10, 0)
```

### shader:flow(tag, strength, speed, scale, amount)
*自 v0.7.5*

参数：
- `tag`(String)——精灵或相机标签
- `strength`(Number?)——图片流动多远(其大小的分数,约 0.05–0.4).`0` 移除 [默认 0.15]
- `speed`(Number?)——流动速度乘数 [默认 1]
- `scale`(Number?)——漩涡的大小——更高 = 更小和更繁忙的漩涡 [默认 2.5]
- `amount`(Number?)——与静止图片的混合,`0`–`1` [默认 1]

返回：Bool

使图片像液体一样实时流动,而其轮廓保持确切位置：颜色在里面旋转,但透明度总是从原始图像读取,所以形状永远不会摆动或增长.在动画精灵上工作(每一帧保持自己的轮廓)和整个相机上.随 `game:freeze` 暂停.

```lua
sprite:add('marble', 'stages/marble', 0, 0)
shader:flow('marble')                   -- 温和的液体漩涡
shader:flow('marble', 0.3, 0.5, 1.5)    -- 更大和更慢的波
shader:flow('marble', 0)                -- 回到静止
```

### shader:outline(tag, layers, size, position)
*自 v0.7.5*

参数：
- `tag`(String)——精灵和文本或相机标签
- `layers`(String | Table?)——一种颜色像 `'FFFFFF'`,或最多 3 层 `{ {color='2B2D42', size=3}, {color='FFFFFF', size=8} }`(每层也可以带 `alpha`).省略以移除描边
- `size`(Number?)——当 `layers` 是单色时的厚度 [默认 4]
- `position`(String?)——描边坐在哪里,像 Figma 的描边位置：`'outside'`和`'inside'`(绘制在形状边缘上)或 `'center'`(一半内一半外)[默认 'outside']

返回：Bool

GPU 围绕整个形状绘制的描边——字母连同它们的 `text:border`和精灵的可见像素或相机上的所有东西.因为它跟随完成的形状,一个文本的行和一个相机上的对象共享一个在它们接触处合并的单一描边.厚度从形状边缘以游戏像素测量,边缘平滑,大小和颜色立即变化,所以补间它们没有成本.文本自行获得周围空间；精灵需要其图片周围有透明空间,否则描边在帧处被切断.精灵有一个着色器槽,所以这替换同一精灵上的另一个 `shader:*` 效果——将这样的精灵放在自己的相机上并描边相机代替.最外层也是文本字段：`game:set(tag..'.outlineSize', 6)`和`game:set(tag..'.outlineColor', 'FF00FF')`和`game:set(tag..'.outlineAlpha', 0.5)`,用 `game:get` 读取并用 `tw:any` 补间.描边颜色也接受 Figma 的不透明度：`shader:outline('card', '4A6FA5 59%', 3, 'inside')`.传递组名(来自 `group:add`)以在组中的每个精灵上单独描边；稍后添加到组的精灵获得相同描边,`group:remove` 移除它.对于围绕整个组的一个共享描边,将精灵放在自己的相机上并描边相机.

```lua
text:add('title', 'LEVEL\nCOMPLETE', 0, 72, 0, 48)
text:border('title', 'outline', '2B2D42', 3)   -- 深色内描边
shader:outline('title', 'FFFFFF', 5)               -- 围绕一切的白描边

shader:outline('logo', { {color='2B2D42', size=3}, {color='FFFFFF', size=8} })
shader:outline('popup', '000000', 2)   -- 一个相机：其所有精灵一个描边
shader:outline('title')                -- 移除
```

### shader:rain(tag, intensity, timescale)

参数：
- `tag`(String)——精灵或相机标签(推荐相机)
- `intensity`(Number?)——雨密度 `0`..`1`.`0` 移除 [默认 0.5]
- `timescale`(Number?)——下落速度乘数 [默认 1]

返回：Bool

FNF Weekend-1 风格的雨：四层视差条纹,带微妙的屏幕扭曲和冷蓝色洗.

```lua
shader:rain('game', 0.6)
shader:rain('game', 0)               -- 停止雨
```

### shader:radialBlur(tag, strength, cx, cy)

参数：
- `tag`(String)——精灵或相机标签
- `strength`(Number?)——模糊宽度(约 0.1–0.3 强).`0` 移除 [默认 0.1]
- `cx`(Number?)——模糊中心 x,`0`..`1` [默认 0.5]
- `cy`(Number?)——模糊中心 y,`0`..`1` [默认 0.5]

返回：Bool

30 样本径向模糊从中心点向外条纹——速度冲刺和命中冲击和翘曲进入.

```lua
shader:radialBlur('game', 0.15)
shader:radialBlur('game', 0.25, 0.5, 0.3)   -- 中心更高
```

### shader:zoomBlur(tag, strength)

参数：
- `tag`(String)——精灵或相机标签
- `strength`(Number?)——缩放条纹量 `0`..`1`.`0` 移除 [默认 0.5]

返回：Bool

25 样本缩放模糊汇聚在中心——比 radialBlur 更柔和和更梦幻.补间强度以获得眩晕脉冲.

```lua
shader:zoomBlur('game', 0.4)
```

### shader:blur(tag, strength, quality)
*自 v0.5.9*

参数：
- `tag`(String)——精灵或相机标签
- `strength`(Number?)——模糊量,0..1.0 移除 [默认 0.5]
- `quality`(Number?)——仅相机.模糊通道数,1..5——更高看起来更平滑,成本略高 [默认 2]

返回：Bool

均匀柔化目标,没有方向或中心(与 `radialBlur`/`zoomBlur` 不同).适合暂停/菜单背景或使相机失焦而不是淡出到黑色.对于实际的景深效果——一个东西清晰,其他都模糊——使用 `shader:focus` 代替,它自动管理每个精灵.

在相机上它是真正的 GPU 模糊(OpenFL 自己的 `BlurFilter`),自 v0.6.3 起任何强度都平滑.在精灵上——它不能承载原生显示滤镜——它是从同一内核改编的单遍可分离高斯着色器 v0.6.5.

```lua
shader:blur('game', 0.4)
shader:blur('game', 0.7, 4)   -- 相机上更高质量
shader:blur('game', 0)        -- 再次清晰
```

### shader:focus(tags, ?strength, ?time, ?partial)
*自 v0.6.7*

参数：
- `tags`(String | Array<String>)——保持清晰的精灵：一个标签或标签表.正是这些最终在焦点上——之前聚焦且未列出的任何东西被释放.`{}`(或 `nil`)释放一切.以 `@` 开头的名称是整层：`'@mid'`和`'@front'`和`'@back'` 或 `'@2'` v0.6.9
- `strength`(Number?)——相机其余部分的模糊,与相机形式的 `shader:blur` 相同的 0..1 单位(`0.5` ≈ 20 px)[默认 0.5]
- `time`(Number?)——将模糊缓动到其新值(以及释放时淡出)的秒数.`0` = 立即 [默认 0]
- `partial`(Table?)——半聚焦精灵的每精灵模糊：`{tag = level}`,其中 `level` 是 `strength` 的份额——`0` 清晰,`0.5` 半模糊,`1` 与其余一样模糊(与不列出它相同).这里的标签不需要在 `tags` 中；如果它们在,这个级别获胜 v0.6.9

返回：Bool

一键的景深风格焦点.持有列出精灵的每个相机获得真正的 `openfl.filters.BlurFilter`,列出的精灵在它上面清晰绘制.该相机上的其他一切都被模糊——其他角色和舞台和背景和组和有着色器的精灵.

每次调用描述整个焦点状态,所以将焦点从一个角色移到另一个和添加第二个或清除它都是同一个函数.最终没有聚焦的相机将其模糊缓出并恢复正常.

工作原理 v0.6.8：聚焦时,精灵被移动到一个不可见的双相机上,放在它自己的相机正上方.双相机每帧复制相机的位置和大小和滚动和缩放和旋转和宽屏偏移和抖动,所以精灵保持确切位置并保留其着色器和alpha和补间和动画.

旧形式 `shader:focus(tag, on, strength, time)`(`true`/`false` 第二个参数)仍然工作,并添加或移除那一个精灵而不触及其他人.

部分焦点 v0.6.9：`partial` 中的精灵进入它们自己的双相机,带更轻的模糊(级别以 0.05 步长分组,每个不同级别一个额外双相机).它们的模糊跟随 `strength` 缓入和缓出.

层 v0.6.9：`'@mid'` 保持该 `sprite:priority` 层的每个精灵清晰,包括稍后添加的精灵(命中粒子和投射物),只要焦点持续.只有已经在聚焦相机上的精灵被拾取,所以列出至少一个普通标签以选择相机.层在 `partial` 中也工作(`{['@front'] = 0.5}`),`partial` 中设置为 `1` 的标签即使其层被聚焦也保持模糊.轨迹和丝带跟随其精灵.

```lua
shader:focus('boyfriend')                        -- 只有 bf 清晰
shader:focus({'boyfriend', 'girlfriend'}, 0.4)   -- 两者,更柔和的模糊
shader:focus('dad', 0.4, 0.5)                    -- 在 0.5s 内将焦点移到 dad
shader:focus({'opponent', 'singer'}, 0.6, 0.4, {fighter = 0.5}) -- fighter 半模糊
shader:focus({'fighter', '@mid'}, 0.45, 1.6, {fog = 1}) -- 整个 mid 层 + 新粒子
shader:focus({}, 0, 0.5)                         -- 释放一切
```

### shader:motionBlur(tag, ?amount, ?maxBlur)
*自 v0.6.7*

参数：
- `tag`(String)——精灵标签
- `amount`(Number?)——精灵自身帧间运动使自身涂抹的乘数.0 移除效果.[默认 1.0]
- `maxBlur`(Number?)——限制涂抹,使大的单帧跳跃(传送和状态改变)不会模糊成条纹.[默认 0.05]

返回：Bool

自动跟随精灵的方向运动模糊——无需手动补间或每帧调用,不像 `shader:radialBlur`/`shader:zoomBlur` 你手动驱动.每帧测量精灵自上一帧移动多远并沿该方向按速度缩放涂抹纹理；站着不动它又清晰了.

```lua
sprite:add('bullet', 'fx/bullet', 0, 0)
shader:motionBlur('bullet', 1.5, 0.08)

-- 用补间或每帧位置设置移动它 - 模糊自行反应
tw:x('shoot', 'bullet', 1200, 0.4, 'linear')
```

### shader:lightRays(tag, opts)
*自 v0.6.7*

参数：
- `tag`(String)——相机或精灵标签.在相机上,光线是全屏后效果,总是在该相机上的所有内容之上——没有深度控制.在精灵上(一个普通的 `sprite:rec`/`sprite:gradient` 四边形作为载体工作良好),光线成为普通绘制顺序公民：使用 `sprite:priority`/`order:set` 将该精灵放在一些东西后面和一些东西前面,与任何其他精灵相同.载体可以完全透明(0 alpha),光线仍然渲染,因为光线亮度贡献自己的 alpha 而不是仅仅继承载体的.
- `opts`(Table?)——下面任何字段.
  - `x` / `y`(Number?)——光线原点,归一化 0..1 屏幕位置.[默认 0.5 / 0.2]
  - `angle`(Number?)——锥体中心方向(度).0 = 右,90 = 下.[默认 45]
  - `spread`(Number?)——锥体半角(度).像 180 这样的大值移除方向锥体,光线向每一侧射出.[默认 34]
  - `width`(Number?)——将光源从单点加宽为垂直于光线方向的短线段,所以扇形的底部有宽口而不是每条光线汇聚到一个像素——匹配灯面板的实际宽度而不是针孔.[默认 0]
  - `intensity`(Number?)——整体亮度乘数.[默认 1]
  - `decay`(Number?)——每条光线沿途的每步衰减,0..1.[默认 0.9]
  - `density`(Number?)——样本链向原点延伸多远.[默认 0.6]
  - `weight`(Number?)——每样本亮度贡献.[默认 0.25]
  - `chroma`(Number?)——沿每条光线的红→金→蓝色调强度,0..1.0 保持纯 `color`,无彩虹边缘.[默认 0.6]
  - `floor`(Number?)——每个样本被视为具有的最低亮度,0..1.在暗/绘制的 2D 场景中提高这个,原点没有真正明亮的像素,否则光线几乎不显示.向 0 降低它以获得仅照亮场景已经明亮处的物理基础外观.[默认 0.35]
  - `streaks`(Number?)——向有明显间隙的独特光束混合而不是一个平滑均匀的扇形,0..1.0 是干净的实心锥体(例如投影仪光束).[默认 0.5]
  - `streakFreq`(Number?)——锥体宽度上有多少光束.更高是更细/更多的条纹.[默认 18]
  - `drift`(Number?)——缓慢每帧闪烁的强度,随时间移动条纹图案,0..1.设置为 0 以获得完全静态和非动画的外观,同时保持 `streaks`.[默认 1]
  - `alpha`(Number?)——整个效果的干净整体不透明度乘数,0..1,用于用补间淡入/淡出.与 `intensity` 不同,后者改变亮度/颜色平衡而不是只是淡出.[默认 1]
  - `color`(String?)——十六进制整体色调.[默认 FFEBCC]

返回：Bool

便宜的体积感光束(神光)从一个点扇形展开,以灯或窗户光的温暖到冷色棱镜边缘风格.为在手机上保持轻量而构建：每个像素一个小固定数量样本链(Android 构建自动更少样本)从每个屏幕像素向光线原点行走,在场景已经照亮的地方增亮(用 `floor` 最小值,所以它在没有实际明亮光源像素可键控的场景上仍然显示)——没有额外渲染通道,没有用于颜色边缘的每通道纹理重新采样(那部分是现有样本上的免费颜色斜坡).`streaks` 将扇形分解为有间隙的单独光束(一个便宜的解析波,不是噪声样本)并随时间轻轻漂移它们,而不是一个静态均匀的光楔.锥体外或条纹间隙之间的像素在纹理工作之前完全退出样本循环.结果是正常场景上的加法,所以不像 `shader:blur`/`shader:radialBlur`,图像的其余部分保持清晰——只有光束本身是柔和的.用 `shader:clear(tag)` 移除.

```lua
-- 从屏幕顶部附近的灯向右下扫过的光线
shader:lightRays('game', { x = 0.18, y = 0.15, angle = 115, spread = 40 })

-- 独特光束而不是平滑扇形,冻结(无闪烁)
shader:lightRays('game', { streaks = 0.8, streakFreq = 24, drift = 0 })

-- 宽灯面板而不是针孔源
shader:lightRays('game', { width = 0.04 })

-- 在 2s 内淡入整个效果
shader:lightRays('game', { alpha = 0 })
tw:num('raysFadeIn', 0, 1, 2, function(v) shader:set('game', 'uAlpha', v, 'lightRays') end)

-- 在精灵上而不是相机上：光线进入正常绘制顺序
sprite:rec('rayLayer', 0, 0, 1280, 720, '000000')
shader:lightRays('rayLayer', { x = 0.3, y = 0.1, angle = 100 })
sprite:priority('rayLayer', 'middle')  -- 在 'front' 精灵后面,在 'back' 精灵前面

-- 关闭它
shader:clear('game')
```

### shader:light(tag, opts)

参数：
- `tag`(String)——精灵或相机标签
- `opts`(Table?)——任何：`hue`(度)和`saturation`/`brightness`/`contrast`(-100..100)和`angle`(固定光方向,度)和`x`/`y`(光源位置,屏幕 px——自动瞄准)和`distance`(px)和`strength`和`threshold`(0..1)和`color`(十六进制)和`opacity`(0..1)和`additive`(0..1)和`off`(无光绘制的动画,见 `shader:offDuring`)

返回：Bool

光照调整着色器：HSBC 颜色校正(色相旋转和饱和度和亮度和对比度)加边缘光——面向光的明亮像素获得彩色边缘辉光,像目标背后的光源.

两种瞄准模式.固定的 `angle` 给出恒定方向；通过 `x`/`y`(或 `shader:lightPos`)的屏幕位置每帧重新瞄准每个受光精灵的边缘向该点,所以移动光会移动每个角色的高光.设置 `strength = 0` 获得纯颜色校正.位置瞄准仅在精灵标签上工作——边缘需要精灵的边缘.

边缘混合.默认情况下边缘向 `color` 替换边缘(一种不会比该颜色更亮的色调)；设置 `additive = 1` 改为在顶部添加光——一个可以爆到明亮的真实辉光,之间的值混合两者.边缘的形状来自精灵自己的 alpha,所以即使着色也保持正确.

```lua
-- 固定方向
shader:light('boyfriend', {angle = 45, distance = 8, strength = 1, threshold = 0.4, color = 'FFEEAA'})

-- 屏幕 (900, 60) 处的定位光源——bf 的边缘瞄准它
shader:light('boyfriend', {x = 900, y = 60, distance = 10, strength = 1.4, color = 'FFE9A0'})

-- 加法辉光边缘(爆到明亮而不是着色)
shader:light('boyfriend', {angle = 45, strength = 1.2, color = 'FFF3C0', additive = 1})

-- 相机上的纯颜色分级
shader:light('game', {hue = 30, saturation = 15, contrast = 10, strength = 0})
```

### shader:lightPos(tag, x, y)

参数：
- `tag`(String)——已有光的精灵标签
- `x`(Number)——光源 X(屏幕 px)
- `y`(Number)——光源 Y(屏幕 px)

返回：Bool

实时移动光源位置——精灵的边缘每帧重新瞄准它.从 `onUpdate` 驱动它(例如跟随鼠标或移动对象)以获得横扫场景的光.

```lua
function onUpdate(dt)
  shader:lightPos('boyfriend', input:get('mouseScreenX'), input:get('mouseScreenY'))
end
```

### shader:offDuring(tag, anims)
*自 v0.7.9*

参数：
- `tag`(String)——有着色器的精灵或角色标签
- `anims`(Table|String)——无着色器绘制的动画名称,作为表或逗号列表.空或 `nil` 为每个动画重新打开它

返回：Bool

在这些动画之一播放时无着色器绘制精灵,并在另一个开始时立即放回着色器.与每个精灵着色器一起工作：light和outline和heat 或自定义.着色器保持其设置并继续更新,所以它回来时没有跳跃.

当一个姿势有自己的光照(带闪光的 `hey`)或边缘光在一个动画上看起来不对时有用.`shader:light` 接受相同的列表作为 `off`,舞台文件将其保存在 `"light": {"off": [...]}` 中.`shader:clear` 忘记列表.

```lua
shader:light('boyfriend', {angle = 45, strength = 1, threshold = 0.1, color = 'FFB066'})
shader:offDuring('boyfriend', {'hey', 'scared'})

-- 一次调用中相同
shader:light('dad', {strength = 1, off = {'laugh'}})

-- 每个动画上的光再次
shader:offDuring('boyfriend')
```

### shader:lightDebug(on, color)

参数：
- `on`(Bool?)——显示 / 隐藏调试叠加层 [默认 true]
- `color`(String?)——光束颜色十六进制 [默认 FF33CC]

返回：Bool

为每个定位光绘制实时调试叠加层：源处的环和到每个受光精灵的光束.全局切换；对编辑足够便宜,发布时关闭.

```lua
shader:lightDebug(true, 'FF33CC')
shader:lightDebug(false)
```

### shader:bloom(tag, ?threshold, ?intensity, ?radius)
*自 v0.6.7*

参数：
- `tag`(String)——精灵标签
- `threshold`(Number?)——像素发光前所需的亮度截止(0..1).[默认 0.7]
- `intensity`(Number?)——添加回顶部的辉光强度乘数.[默认 1.0]
- `radius`(Number?)——辉光传播多远,与 `shader:blur` 的 `strength` 相同的 0..1 左右单位.[默认 0.75]

返回：Bool

便宜的单遍泛光：在每个纹素周围采样一圈像素,比 `threshold` 更亮的像素添加按 `intensity` 缩放的加法辉光.不是真正的多遍高斯泛光——对于精灵大小的辉光足够好,不适用于巨大的模糊半径.

与 `shader:light` 组合.在已有光的精灵上调用 `shader:bloom`,或在已有泛光的精灵上调用 `shader:light`,它们融合为一个着色器而不是一个覆盖另一个——通常的单着色器槽限制(见 Engine Reliability Notes)不适用于这个特定配对.所有其他着色器组合仍然覆盖,最后应用的获胜.一旦融合,重新调用 `shader:light` 就地更新融合着色器的光属性,除了 `x`/`y` 瞄准一个点——在泛光融合精灵上使用 `angle` 代替.

```lua
sprite:add('orb', 'fx/orb', 400, 200)
shader:bloom('orb', 0.6, 1.4, 1.0)

-- 与现有/稍后的光融合为一个着色器
shader:light('orb', {angle = 45, strength = 1, color = 'FFEEAA'})
```

### shader:getLight(tag, field)

参数：
- `tag`(String)——有光的精灵或相机标签
- `field`(String)——`angle`和`distance`和`strength`和`threshold`和`opacity`和`x`和`y` 或 `positioned`

返回：Any

读回光参数——便于光编辑器 HUD 或相对于当前值微调一个值.`x`/`y` 返回源位置(如果光使用固定角度则为 `nil`)；`positioned` 是布尔值.

```lua
local a = shader:getLight('boyfriend', 'angle')
if shader:getLight('boyfriend', 'positioned') then ... end
```

### 着色器参数

`getLight` 为光着色器使用友好名称；对于任何着色器——包效果和透视和自定义——有一个按参数原始 uniform 名称(`uAmount`和`iStrength`和`str`和`ang`和……)的通用反射访问器.不确定名称？`shader:list` 追踪每个参数及其类型和当前值.

在相机上,当多个堆叠时传递效果名称(`'heat'`和`'chromatic'`和……)作为最后一个参数；只有一个效果时它会自动选择.

### shader:list(tag, fx)

参数：
- `tag`(String)——有着色器的精灵或相机标签
- `fx`(String?)——仅相机：检查哪个堆叠效果

返回：Int

将着色器的每个参数追踪到控制台——`shader "tag" name - TYPE = value`——并返回计数.用它来发现 `shader:get` / `shader:set` 的原始 uniform 名称.

```lua
shader:list('boyfriend')
-- shader "boyfriend" str - FLOAT = [1.4]
-- shader "boyfriend" ang - FLOAT = [0.78]
-- shader "boyfriend" dropColor - FLOAT3 = [1,0.9,0.6] ...
shader:list('game', 'chromatic')   -- 特定的相机效果
```

### shader:camFilterCount(tag)
*自 v0.6.7*

参数：
- `tag`(String)——相机标签

返回：Int

返回相机上现在实际堆叠了多少滤镜(其真实 OpenFL `filters` 数组长度),并将计数以及其上任何跟踪的 `shader:*` 效果名称追踪到控制台.当相机目标效果看起来不对时有用,你想排除(或确认)其他东西——另一个 `shader:*` 调用和前一场景的残留效果——也堆叠在那里并干扰.

```lua
shader:rain('game', 0.3)
shader:vignette('game', 0.4)
shader:camFilterCount('game')
-- shader:camFilterCount("game") = 2 total, named fx: [rain, vignette]
```

### shader:get(tag, param, fx)

参数：
- `tag`(String)——精灵或相机标签
- `param`(String)——uniform 名称(见 `shader:list`)
- `fx`(String?)——仅相机：当多个堆叠时哪个效果 [可选]

返回：Any

读取着色器值：有一个分量时为数字,否则为表.在标签上的每个着色器上工作：light和效果包和透视和你自己的.

```lua
local strength = shader:get('boyfriend', 'str')
```

### shader:set(tag, param, value, fx)

参数：
- `tag`(String)——精灵或相机标签
- `param`(String)——uniform 名称(见 `shader:list`)
- `value`(Number|Table)——一个数字,或用于向量的表
- `fx`(String?)——仅相机：当多个堆叠时哪个效果 [可选]

返回：Bool

直接写着色器值.

```lua
shader:set('boyfriend', 'str', 2.0)
shader:set('boyfriend', 'dropColor', {1, 0, 0.5})   -- vec3
shader:set('game', 'iStrength', 0.03, 'heat')       -- 相机效果
```

### shader:tween(tag, param, to, duration, ease, fx)
*自 v0.5.3*

参数：
- `tag`(String)——精灵或相机标签
- `param`(String)——原始 uniform 名称(单分量浮点；见 `shader:list`)
- `to`(Number)——目标值
- `duration`(Number?)——秒 [默认 1]
- `ease`(String?)——FlxEase 名称(例如 `'quadOut'`).省略为线性
- `fx`(String?)——仅相机：哪个堆叠效果

返回：Bool

用缓动将单浮点着色器 uniform 从其当前值动画到 `to`——淡入或淡出效果和脉冲参数和随段落渐变强度.重新补间同一参数取消之前的补间.`duration` 为 `0` 时立即设置.

```lua
shader:vignette('game', 0)                    -- 开始清晰
shader:tween('game', 'uAmount', 0.7, 1.5, 'quadOut')   -- 淡入暗角
shader:tween('boyfriend', 'str', 0, 0.8)               -- 缓出一个扭曲
shader:tween('game', 'iStrength', 0.05, 0.5, nil, 'heat')  -- 堆叠的相机效果
```

### shader:vignetteFade(tag, to, duration, ease, radius, color)
*自 v0.5.3*

参数：
- `tag`(String)——精灵或相机标签
- `to`(Number)——目标强度.`0` 淡出并移除着色器
- `duration`(Number?)——秒 [默认 1]
- `ease`(String?)——FlxEase 名称.省略为线性
- `radius`(Number?)——暗角半径 [默认 0.5]
- `color`(String?)——十六进制边缘颜色(例如 `'1A0033'`)

返回：Bool

如果暗角不在那里就创建它,然后将其强度缓动到 `to`.淡出到 `0` 时着陆后自动移除着色器,所以淡出后不留下任何东西——非常适合过渡或闪入黑暗然后让它升起的事件.

```lua
shader:vignetteFade('game', 0.75, 1.2, 'quadInOut')          -- 淡入
shader:vignetteFade('game', 0, 0.8)                          -- 淡出 + 自动移除
shader:vignetteFade('game', 0.6, 1, 'quadOut', 0.4, '1A0033') -- 蓝色边缘
```

### shader:dread(tag, amount, duration, ease, opts)
*自 v0.7.4*

参数：
- `tag`(String)——精灵或相机标签
- `amount`(Number?)——分级强度,0..1 [默认 1]
- `duration`(Number?)——淡到 `amount` 的秒数.`0` 是立即 [默认 0]
- `ease`(String?)——FlxEase 名称.省略为线性
- `opts`(Table?)——分级：`mono`(0.85,1 = 黑白)和`contrast`(1.2)和`shadows`(0.05)和`highlights`(0.03)和`curve`(0.5,额外 S 曲线对比,0 到 1)和`gamma`(1)和`grain`(0.02).额外：`vignette`(0)和`radius`(0.5)和`color`('000000')和`chromatic`(0).值在调用之间记住

返回：Bool

一遍替换一堆相机着色器：去饱和和对比和压碎阴影和高光和胶片颗粒,加上可选暗角和色差.分级随 `amount` 淡出；暗角和色差偏移保持在你给的强度,所以它们像 `shader:vignette` 和 `shader:chromatic` 一样工作,成本三分之一.一旦 `amount` 为 `0` 且两个额外都为 `0`,着色器自行移除.用 `shader:tween(tag, 'uChroma', to, time, ease, 'dread')` 单独补间色差偏移.

```lua
shader:dread('game', 0.3, 0, nil, {
    mono = 0.35, contrast = 1.25, grain = 0.03,
    vignette = 0.55, radius = 0.5, color = '000000',
    chromatic = 0.0012
})

shader:dread('game', 1, 2, 'sineInOut')

shader:set('game', 'uChroma', 0.007, 'dread')
shader:tween('game', 'uChroma', 0.0012, 0.5, 'cubeOut', 'dread')
```

### 后效果

一组轻量后效果用于外观和汁水.全部是单遍,低或没有额外纹理采样,所以它们在弱 GPU 上安全——这里没有循环数十个抽头.每个接受精灵或相机标签,在相机上堆叠,并遵循与上面效果着色器相同的规则：再次调用实时调整,传递 `0`(第一个量)或使用 `shader:clearFx` 移除.动画的(`grain`和`wave`和`glitch`和`vhs`)自行驱动.

### shader:invert(tag, amount)

参数：
- `tag`(String)——精灵或相机标签
- `amount`(Number?)——混合 0..1.`0` 移除 [默认 1]

返回：Bool

反转颜色(负片).非常适合快速命中/闪光或诡异的节拍.

v0.6.8 现在写入目标的滤镜颜色上下文而不是取自己的着色器,所以它与 `filter:*` 和其他颜色效果堆叠(例如 `invert` + `sepia` + `filter:saturation` 一起,一次渲染).与 `filter:invert` 相同.`shader:get/set/tween(tag, 'uAmount', ..., 'invert')` 继续工作.

```lua
shader:invert('game')        -- 全负片
shader:invert('game', 0.5)   -- 一半
```

### shader:sepia(tag, amount)

参数：
- `tag`(String)——精灵或相机标签
- `amount`(Number?)——混合 0..1.`0` 移除 [默认 1]

返回：Bool

温暖棕褐色调——老照片 / 闪回外观.

v0.6.8 现在写入目标的滤镜颜色上下文而不是取自己的着色器,所以它与 `filter:*` 和其他颜色效果堆叠(例如 `invert` + `sepia` + `filter:saturation` 一起,一次渲染).与 `filter:sepia` 相同.`shader:get/set/tween(tag, 'uAmount', ..., 'sepia')` 继续工作.

```lua
shader:sepia('game', 0.8)
```

### shader:duotone(tag, dark, light, amount)

参数：
- `tag`(String)——精灵或相机标签
- `dark`(String?)——阴影的十六进制(例如 `'1A0B3D'`)
- `light`(String?)——高光的十六进制(例如 `'FFD98C'`)
- `amount`(Number?)——混合 0..1.`0` 移除 [默认 1]

返回：Bool

将亮度映射到双色渐变(双色调 / 渐变映射).适合菜单和舞台的风格.

v0.6.8 现在写入目标的滤镜颜色上下文而不是取自己的着色器,所以它与 `filter:*` 和其他颜色效果堆叠(例如 `invert` + `sepia` + `filter:saturation` 一起,一次渲染).与 `filter:duotone` 相同.`shader:get/set/tween(tag, 'uAmount', ..., 'duotone')` 继续工作.

```lua
shader:duotone('game', '15082E', 'FF7BD5')
```

### shader:vignette(tag, amount, radius, color, cover, blend)

参数：
- `tag`(String)——精灵或相机标签
- `amount`(Number?)——边缘色调强度 0..1.`0` 移除 [默认 0.6]
- `radius`(Number?)——淡出从哪里开始(0 中心 .. 1 边缘)[默认 0.5]
- `color`(String?)——边缘色调颜色十六进制.默认黑色(经典变暗)；尝试深蓝色或蓝色以获得情绪 [默认 000000]
- `cover`(Bool?)——在相机上：将暗角绘制在此相机下方绘制的所有内容上,而不仅是其自己的像素 [默认 false]
- `blend`(String?)——边缘颜色如何混入：`normal`和`multiply`和`add`和`screen`和`overlay`和`subtract`和`darken` 或 `lighten` [默认 normal]

返回：Bool

将屏幕边缘向 `color` 着色——黑色变暗(经典电影感),或使用自定义颜色在边缘获得彩色辉光/雾.通常它只重新着色它所在的精灵或相机的像素,所以在大部分透明的叠加相机上它几乎不可见；传递 `cover = true` 将其铺在下面所有内容上,包括较低相机的效果.

```lua
shader:vignette('game', 0.5, 0.45)              -- 经典暗
shader:vignette('game', 0.6, 0.4, '1A0033')     -- 蓝色边缘
shader:vignette('overlay', 0.8, 0.4, '000000', true)   -- 也覆盖下面模糊的菜单
shader:vignette('game', 0.7, 0.5, 'FF6A00', false, 'add')   -- 增亮的暖辉光
```

### shader:addVignette(tag, amount, radius, color, cover, blend)
*自 v0.7.6*

参数：
- `tag`(String)——精灵或相机标签
- `amount`(Number?)——此层的强度 [默认 0.6]
- `radius`(Number?)——此层从哪里开始(0 中心 .. 1 边缘)[默认 0.5]
- `color`(String?)——此层的颜色 [默认 000000]
- `cover`(Bool?)——与 `shader:vignette` 中相同 [默认 false]
- `blend`(String?)——与 `shader:vignette` 中相同的列表 [默认 normal]

返回：Int

在已经存在的暗角之上再放一个暗角,所以你可以混合暗边缘和彩色辉光.每个精灵或相机最多 4 个,全部一次绘制.返回层号.`shader:vignette` 以单层重新开始堆叠,`shader:vignette(tag, 0)` 移除所有.

```lua
shader:vignette('game', 0.5, 0.45)
shader:addVignette('game', 0.4, 0.7, 'FF2040', false, 'screen')
```

### shader:scanlines(tag, intensity, count)

参数：
- `tag`(String)——精灵或相机标签
- `intensity`(Number?)——线暗度 0..1.`0` 移除 [默认 0.35]
- `count`(Number?)——屏幕上向下多少线 [默认 240]

返回：Bool

CRT 风格水平扫描线.

```lua
shader:scanlines('game', 0.3)
```

### shader:fisheye(tag, amount, inverted)
*自 v0.7.7*

参数：
- `tag`(String)——精灵或相机标签
- `amount`(Number?)——强度从 `0` 到 `1`.`0` 移除它 [默认 0.5]
- `inverted`(Bool?)——`true` 改为捏中间并拉伸边缘 [默认 false]

返回：Bool

像鱼眼镜头一样弯曲图片：中间增长,边缘弯开.反转版本做相反的事,中间缩小,像通过反向的窥孔看.角落保持在原位,所以正常模式下屏幕边缘没有任何东西被切掉.像任何其他着色器值一样用 `shader:tween(tag, 'uAmount', ...)` 补间它.

```lua
shader:fisheye('game', 0.4)          -- 镜头
shader:fisheye('game', 0.6, true)    -- 反转
shader:fisheye('game', 0)            -- 关闭
```

### shader:pixelate(tag, pixels)

参数：
- `tag`(String)——精灵或相机标签,标签表,或 `'all'` 表示每个相机
- `pixels`(Number?)——网格分辨率(横向单元格).更低 = 更粗.任何宽高比下单元格保持方形.`0` 移除 [默认 160]

返回：Bool

将图像吸附到粗网格(马赛克 / 复古).一次采样——实际上免费.

传递 `'all'` 作为标签以像素化整个屏幕,或表像 `{'game', 'hud'}` 用于几个相机.在过渡的每一帧调用它,新场景的相机也会拾取它.`shader:pixelate('all', 0)` 从每个相机移除它.

```lua
shader:pixelate('game', 96)   -- 粗厚

-- 溶解：在一秒内从清晰到块状
tw:num('px', 320, 16, 1, function(v) shader:pixelate('game', v) end, 'quadIn')

-- 整个屏幕,例如在自定义过渡内
tw:num('pxAll', 640, 48, 0.3, function(v) shader:pixelate('all', v) end, 'cubeInOut')
```

### shader:posterize(tag, levels, amount)
*自 v0.6.3*

参数：
- `tag`(String)——精灵或相机标签
- `levels`(Number?)——每通道色带数.更低 = 更扁平/海报样 [默认 6]
- `amount`(Number?)——混合 0..1.`0` 移除 [默认 1]

返回：Bool

将颜色深度扁平化为硬色带(后化 / 海报印刷外观).一次采样——实际上免费.

```lua
shader:posterize('game', 5)
shader:posterize('game', 3, 0.7)   -- 部分混合
```

### shader:chromatic(tag, amount)

参数：
- `tag`(String)——精灵或相机标签
- `amount`(Number?)——RGB 分裂距离(UV 单位).`0` 移除 [默认 0.006]

返回：Bool

色差——从中心向外分裂 RGB 通道.在命中时有力；静止时微妙.

```lua
shader:chromatic('game', 0.004)
```

### shader:wave(tag, amount, speed, scale)

参数：
- `tag`(String)——精灵或相机标签
- `amount`(Number?)——位移(UV 单位).`0` 移除 [默认 0.01]
- `speed`(Number?)——动画速度 [默认 2]
- `scale`(Number?)——涟漪频率 [默认 12]

返回：Bool

动画正弦波——水下 / 眩晕 / 梦幻.自动动画,一次采样.

```lua
shader:wave('game', 0.008, 1.5)
```

### shader:grain(tag, amount)

参数：
- `tag`(String)——精灵或相机标签
- `amount`(Number?)——噪声强度.`0` 移除 [默认 0.12]

返回：Bool

动画胶片颗粒.在平坦渐变上的便宜纹理；与暗角 + 棕褐色搭配良好.

```lua
shader:grain('game', 0.08)
```

### shader:glitch(tag, amount, blocks)

参数：
- `tag`(String)——精灵或相机标签
- `amount`(Number?)——撕裂的频率/强度 0..1.`0` 移除 [默认 0.5]
- `blocks`(Number?)——水平带数 [默认 24]

返回：Bool

动画数字故障——块撕裂 + RGB 分裂.为损坏刺针在一拍上闪烁它.

```lua
shader:glitch('game', 0.7)
timer:start('g', 0.2, function() shader:glitch('game', 0) end)
```

### shader:deform(tag, amount, speed, quality)
*自 v0.7.7*

参数：
- `tag`(String)——精灵或相机标签
- `amount`(Number?)——与原始图片的混合 0..1.`0` 移除 [默认 1]
- `speed`(Number?)——隧道飞行的速度.`0` 冻结它 [默认 1]
- `quality`(Number?)——运动模糊样本 1..20.更低在弱计算机上更便宜 [默认 8]

返回：Bool

将图片变成从其自身纹理构建的无尽扭曲隧道,带柔和运动模糊.适合梦或传送门时刻.

```lua
shader:deform('bg', 1, 0.6)
-- 弱计算机的便宜版本
shader:deform('bg', 1, 0.6, 3)
```

### shader:water(tag, amplitude, frequency, speed, horizontal, clip)
*自 v0.7.7*

参数：
- `tag`(String)——精灵或相机标签
- `amplitude`(Number?)——图片移动多远,以像素为单位.`0` 移除 [默认 50]
- `frequency`(Number?)——容纳多少波：更高更紧 [默认 0.01]
- `speed`(Number?)——波移动多快 [默认 1]
- `horizontal`(Bool?)——`true` 左右摆动而不是上下 [默认 false]
- `clip`(Bool?)——`true` 让边缘为空而不是拉伸边框 [默认 false]

返回：Bool

像水中的倒影或旗帜一样波动图片.

```lua
shader:water('reflection', 6, 0.04, 2)
shader:water('flag', 10, 0.03, 3, true, true)
```

### shader:waterFill(tag, level, color, amplitude, frequency, speed)
*自 v0.7.7*

参数：
- `tag`(String)——精灵标签
- `level`(Number?)——形状多满,0 空到 1 满 [默认 0.5]
- `color`(String?)——液体颜色 [默认 6666FF]
- `amplitude`(Number?)——波高(像素)[默认 4]
- `frequency`(Number?)——容纳多少波 [默认 0.15]
- `speed`(Number?)——波移动多快 [默认 2]

返回：Bool

用液体填充精灵的形状到一定水平,带移动的波浪表面.只使用精灵的轮廓,所以任何图片都变成瓶子和生命值计或洪水房间.

```lua
sprite:add('flask', 'ui/flask', 100, 100)
shader:waterFill('flask', 0.3, '44DDFF')
tw:num('fill', 0.3, 0.9, 2, function(v) shader:waterLevel('flask', v) end, 'quadOut')
```

### shader:waterLevel(tag, level, tilt, boost)
*自 v0.7.7*

参数：
- `tag`(String)——有 waterFill 的精灵标签
- `level`(Number)——新水平 0..1
- `tilt`(Number?)——倾斜表面,像液体向一侧晃动.-1..1 [默认 0]
- `boost`(Number?)——乘以波高以获得飞溅 [默认 1]

返回：Bool

更改填充精灵的水平.从补间每帧调用它以动画液体.

```lua
shader:waterLevel('flask', 0.6, 0.2, 2)
```

### shader:waterLook(tag, opacity, showSprite, foam)
*自 v0.7.7*

参数：
- `tag`(String)——有 waterFill 的精灵标签
- `opacity`(Number?)——液体覆盖精灵多少 0..1 [默认 1]
- `showSprite`(Bool?)——`true` 保持精灵在液体上方和下方可见 [默认 false]
- `foam`(Number?)——表面亮线的亮度.`0` 无 [默认 0]

返回：Bool

更改液体外观：图片上的透视水和表面上的图片和表面上的明亮泡沫线.

```lua
shader:waterFill('glass', 0.5, '3399FF')
shader:waterLook('glass', 0.6, true, 0.4)
```

### shader:vhs(tag, amount)

参数：
- `tag`(String)——精灵或相机标签
- `amount`(Number?)——整体强度.`0` 移除 [默认 1]

返回：Bool

一遍动画 VHS 外观：线摆动和跟踪带和色差边缘和扫描线 + 噪声.

```lua
shader:vhs('game', 0.8)
```

### shader:crt(tag, curve, scanline, vignette)

参数：
- `tag`(String)——精灵或相机标签
- `curve`(Number?)——屏幕凸起(桶形).负移除 [默认 0.15]
- `scanline`(Number?)——扫描线暗度 0..1 [默认 0.25]
- `vignette`(Number?)——边缘变暗 0..1 [默认 0.4]

返回：Bool

老 CRT 电视：单遍桶形曲率和扫描线和角落暗角.最适合相机.

```lua
shader:crt('game')
shader:crt('game', -1)   -- 移除
```

### shader:clearFx(tag, name)

参数：
- `tag`(String)——精灵或相机标签
- `name`(String?)——要移除哪个效果(`heat`/`rain`/`radialBlur`/`zoomBlur`/`blur`/`light`/`invert`/`sepia`/`duotone`/`vignette`/`scanlines`/`pixelate`/`posterize`/`chromatic`/`wave`/`grain`/`glitch`/`vhs`/`crt`).省略为全部

返回：Bool

移除一个命名效果(相机)或当前效果着色器(精灵).没有 `name` 时,从目标剥离每个效果.

```lua
shader:clearFx('game', 'rain')
shader:clearFx('game')          -- 一切关闭
```

### shader:preload(names)

参数：
- `names`(Table?)——要预热的着色器名称数组.省略 / 空 = 预热每个已知着色器

返回：Int

提前编译着色器,所以第一次使用不会卡顿.着色器通常在第一次使用时构建,这可能在中途歌曲时丢帧.在加载屏幕或 `onCreate` 中调用它.返回准备了多少.

```lua
shader:preload()                                  -- 一切
shader:preload({ 'heat', 'chromatic', 'vignette' })  -- 仅此歌曲使用的
```

### shader:preloaded()

返回：Bool

一旦完整的 `shader:preload()` 过程运行过就为 `true`.它只真正工作一次.

```lua
function onCreate()
    if not shader:preloaded() then shader:preload() end
end
```

### 编写帧感知着色器

动画精灵从更大的精灵表中切出一帧绘制,所以 `openfl_TextureCoordv` 横跨整个表,而不是精灵上的 0 到 1.每个以 `#pragma header` 开头的着色器现在获得正在绘制的帧的边界,每个精灵,无需额外设置：

| 函数 | 返回 |
|---|---|
| `flixel_frameUV(coord)` | 当前帧内的位置,两个轴 0 到 1.用于遮罩和渐变和噪声和任何应粘在精灵上的东西. |
| `flixel_atlasUV(frameUV)` | 相反：将 0 到 1 的帧位置转回表坐标. |
| `flixel_texture2DFrame(bitmap, frameUV)` | 在 0 到 1 位置采样帧,从不读取相邻帧的像素. |
| `flixel_clampToFrame(coord)` | 将表坐标保持当前帧内. |
| `flixel_frameSize()` | 帧大小以表单位.将偏移乘以它以移动精灵的固定部分. |
| `flixel_frameBounds()` | 原始边界 `(left, top, right, bottom)`. |

在相机上,或任何没有帧的东西上,边界是整个纹理,所以相同的着色器在精灵和相机上都工作.几个精灵可以在桌面上共享一个着色器对象；在 Android 上为每个精灵给它自己的着色器对象.

---

## 过渡函数

`transition` 命名空间对状态变化进行排序：它播放 out 动画,切换状态,然后在新状态中播放 in 动画.引擎在两种情况下拥有计时——你永远不用写 `timer:start` 来猜测动画何时完成,也永远不用自己调用 `state:change`.使用内置预设,或完全接管视觉并让引擎继续驱动序列.

### 工作原理

`transition:to(state)` 按顺序运行三个步骤：

- Out——覆盖层覆盖屏幕(或你的 `onTransitionOut` 运行).

- Switch——一旦 out 半部分实际完成,引擎切换状态.

- In——覆盖层在新状态中揭开(或你的 `onTransitionIn` 运行).

覆盖层住在自己的相机上,在进入状态构建后创建,所以重置相机列表的状态无法在过渡中擦除它.无需按状态重新创建任何东西,设置持续——在启动时设置一次.

### 用过渡切换

### transition:set(kind, duration?, color?, ease?)
*自 v0.5.5*

参数：
- `kind`(String)——`'fade'`和`'slide'`和`'bars'` 或 `'custom'`
- `duration`(Float)——每半部分(out 和 in)的秒数 [默认 0.5]
- `color`(String)——覆盖层颜色.被 `'custom'` 忽略 [可选]
- `ease`(String)——缓动名称——见 Easings [可选]

返回：Bool

选择每个后续 `transition:to` 使用的过渡样式.未知 `kind` 时失败.

`fade`——纯色淡入,然后淡出.

`slide`——纯色面板滑过屏幕.

`bars`——水平条从交替两侧滑入；用 transition:colors 和 `transition:bars` 设置样式.

`custom`——引擎什么都不绘制,调用你的 `onTransitionOut` / `onTransitionIn` 代替,每个等待 `duration`.见下面的自定义过渡.

```lua
transition:set('fade', 0.5, '000000')
transition:set('slide', 0.35, '1B1B2F', 'circInOut')
transition:set('bars', 0.4, '1B1B2F', 'circIn')
```

### transition:to(state, arg?, name?)
*自 v0.5.5*

参数：
- `state`(String)——目标状态——与 state:change 接受的相同名称(`'play'`和`'loading'` 或脚本 id)
- `arg`(String)——传递给状态的可选参数(例如 `'play'` 的歌曲名)[可选]
- `name`(String)——仅此一次使用的命名过渡 [可选]

返回：Bool

播放 out 半部分,完成后切换到 `state`,然后播放 in 半部分.如果过渡已在运行则返回 `false`(带错误),所以猛按按钮不能启动两个重叠的切换.

```lua
function onCreate()
    transition:set('bars', 0.4, '000000', 'circIn')
end

function onUpdate()
    if input:keyJustPressed('ENTER') then
        transition:to('play', 'your-song')
    end

    if input:keyJustPressed('ESCAPE') then
        transition:to('menu/title')
    end
end
```

### transition:enter(state, arg?, name?)
*自 v0.7.1*

参数：
- `state`(String)——要打开的状态,与 `state:change` 相同名称
- `arg`(String)——状态的可选参数,像歌曲名 [可选]
- `name`(String)——仅此一次使用的命名过渡 [可选]

返回：Bool

立即切换到状态并仅播放过渡的打开半部分(In 部分).当游戏启动时使用它,所以第一个屏幕带着过渡出现而不是突然弹出,无需先等待覆盖动画.使用 `custom` 过渡时仅 `onTransitionIn` 运行,所以它必须在 `onTransitionOut` 之前没有运行的情况下也能工作.如果过渡已在运行则失败.

```lua
function onCreate()
    transition:set('custom', 1)
    transition:auto(true)
    transition:enter('menu/title')   -- 菜单从黑色淡入
end
```

### transition:auto(on?)
*自 v0.7.1*

参数：
- `on`(Bool)——`false` 再次关闭它 [默认 true]

返回：Bool

使过渡永久：开启期间,每个 `state:change` 先播放当前过渡,所以你不必自己调用 `transition:to` 或在每个状态中运行过渡.设置一次,例如在 `boot.lua` 中,并用 `transition:enter` 打开第一个菜单.使用 `custom` 过渡时,将 `onTransitionOut` 和 `onTransitionIn` 放在每个状态都加载的脚本中,如 `boot.lua`.

```lua
function onCreate()
    transition:set('custom', 1)
    transition:auto(true)
    transition:enter('menu/title')
end

function onTransitionOut(duration)
    -- 覆盖屏幕
end

function onTransitionIn(duration)
    -- 在新状态中揭开它
end
```

### transition:route(state, name?)
*自 v0.7.1*

参数：
- `state`(String)——过渡去向的状态：像 `'menu/main'` 的脚本状态,`'chart'` 为谱面编辑器,`'play'` 为歌曲或谱面测试
- `name`(String)——在那里使用的过渡.省略以移除路由 [可选]

返回：Bool

按目的地选择过渡：每次游戏去该状态时,此过渡代替默认播放.它适用于 `state:change`和`transition:to`和`transition:enter` 和谱面编辑器自己的切换(打开测试和从测试回来).`'charteditor'` 和 `'editor'` 与 `'chart'` 相同.

```lua
transition:route('chart', 'editor')      -- 进入谱面编辑器
transition:route('play', 'quick')        -- 开始谱面测试
transition:route('menu/settings', 'quick')

function onTransitionOut(duration, name)
    if name == 'editor' then
        -- 你的谱面编辑器过渡
    else
        -- 通常的那个
    end
end
```

### transition:current()
*自 v0.7.1*

返回：String

现在正在播放的过渡名称,`'default'` 为普通设置,或没有过渡运行时为 `nil`.

```lua
if transition:current() == 'editor' then print('opening the editor') end
```

### transition:active()
*自 v0.5.5*

返回：Bool

从 `transition:to` 开始的那一刻到 in 半部分在新状态中完成时为 `true`.用它门控输入,使菜单在已经离开时无法对按键做出反应.

```lua
function onUpdate()
    if transition:active() then return end

    if input:keyJustPressed('ENTER') then
        transition:to('play', 'your-song')
    end
end
```

### 自定义过渡

`transition:set('custom', duration)` 保留引擎的排序但将视觉交给你.引擎调用 `onTransitionOut(duration)`,等待 `duration` 秒,切换状态,然后调用 `onTransitionIn(duration)` 并再次等待,然后清除 `transition:active()`.

两个回调都广播到每个脚本,所以共享叠加脚本可以为整个游戏拥有外观.你仍然得到手工编写很尴尬的部分：切换只在 out 半部分真正完成时发生,in 半部分在新状态中运行而无需你重新创建任何东西.

### transition:add(name, options)
*自 v0.7.1*

参数：
- `name`(String)——你对此过渡的名称
- `options`(Table)——`kind`(fade / slide / bars / custom)和`duration`和`color`和`ease`和`colors`(条颜色)和`bars`(条数)

返回：Bool

保存一个稍后可以使用的命名过渡,所以一个游戏可以有多个：一个用于菜单,另一个用于谱面编辑器,另一个用于歌曲.你省略的选项取当前设置.`custom` 过渡用其名称作为第二个参数调用你的 `onTransitionOut(duration, name)` 和 `onTransitionIn(duration, name)`,所以一个脚本可以绘制几个不同的自定义过渡.

```lua
transition:add('menus', {kind = 'custom', duration = 1})
transition:add('editor', {kind = 'custom', duration = 0.6})
transition:add('quick', {kind = 'fade', duration = 0.3, color = '000000'})
transition:add('stripes', {kind = 'bars', duration = 1, colors = {'1B1B2F', '42435E', '636798'}})
```

### transition:use(name)
*自 v0.7.1*

参数：
- `name`(String)——用 `transition:add` 制作的过渡名称

返回：Bool

使命名过渡成为默认的,在没有路由或显式名称选择另一个时使用.未知名称时失败.

```lua
transition:use('menus')
```

### transition:area()
*自 v0.7.1*

返回：Table

你的过渡精灵使用的坐标中的整个可见屏幕,作为 `{x, y, width, height}`(整数).在 16:9 窗口上是 `0, 0, 1280, 720`；在更宽或更高的窗口上 `x` / `y` 为负,尺寸增长,所以过渡仍然覆盖黑条和宽屏边缘.在 `onTransitionOut` / `onTransitionIn` 中使用它而不是硬编码 1280x720.

```lua
function onTransitionOut(duration)
    local a = transition:area()
    sprite:rec('_fade', a.x, a.y, a.width, a.height)
    game:set('_fade.color', 0x000000)
    game:set('_fade.alpha', 0)
    tw:alpha('_fadeA', '_fade', 1, duration, 'linear')
end
```

### transition:colors(list)
*自 v0.5.5*

参数：
- `list`(Table)——颜色字符串数组,每个条一个.传递空表以清除回单一 `set` 颜色

返回：Bool

`'bars'` 预设的颜色,从上到下应用,如果条多于颜色则重复.传递列表还将条数设置为匹配其长度,所以这通常是你唯一需要的调用.

```lua
transition:set('bars', 0.4, '1B1B2F', 'circIn')
transition:colors({'1B1B2F', '42435E', '636798', '1B1B2F'})
```

### transition:bars(count)
*自 v0.5.5*

参数：
- `count`(Int)——条数(≥ 1)

返回：Bool

设置 `'bars'` 预设使用多少条,当你想要不匹配颜色列表的计数时.在 `transition:colors` 之后调用它,因为那也设置计数.

```lua
transition:colors({'1B1B2F', '636798'})
transition:bars(8)   -- 8 条,交替 2 种颜色
```

### transition:duration(seconds?)
*自 v0.5.5*

参数：
- `seconds`(Float)——每半部分的秒数 [默认 0.5]

返回：Bool

仅更改计时,保留样式和颜色.

```lua
transition:duration(0.25)   -- 更灵敏,相同外观
```

---

## 补间函数

每个补间由字符串 `t`(补间标签)键控.用现有标签开始新补间会自动取消前一个.所有补间函数都接受可选的 `ease` 字符串——见缓动名称.

### 常用补间

### tw:alpha(t, obj, a, time, ease)

参数：
- `t`(String)——补间标签
- `obj`(String)——目标精灵标签
- `a`(Float)——目标 alpha(`0`–`1`)
- `time`(Float)——持续时间(秒)
- `ease`(String)——缓动名称 [默认 'linear']

返回：Bool

在 `time` 秒内将对象的透明度淡到 `a`(`0` 不可见,`1` 完全可见).补间名称让你稍后取消或检查它.

```lua
tw:alpha('boxFade', 'box', 0.25, 1.5, 'quadOut')
```

### tw:x(t, obj, x, time, ease)

参数：
- `t`(String)——补间标签
- `obj`(String)——目标精灵标签
- `x`(Float)——目标 X 坐标
- `time`(Float)——持续时间(秒)
- `ease`(String)——缓动名称 [默认 'linear']

返回：Bool

补间水平位置.

```lua
tw:x('logoSlide', 'logo', 800, 2.0, 'cubeInOut')
```

### tw:y(t, obj, y, time, ease)

参数：
- `t`(String)——补间标签
- `obj`(String)——目标精灵标签
- `y`(Float)——目标 Y 坐标
- `time`(Float)——持续时间(秒)
- `ease`(String)——缓动名称 [默认 'linear']

返回：Bool

补间垂直位置.

```lua
tw:y('boxDrop', 'box', 600, 1.0, 'bounceOut')
```

### tw:angle(t, obj, ang, time, ease)

参数：
- `t`(String)——补间标签
- `obj`(String)——目标精灵标签
- `ang`(Float)——目标旋转(度)
- `time`(Float)——持续时间(秒)
- `ease`(String)——缓动名称 [默认 'linear']

返回：Bool

补间旋转(度).

```lua
tw:angle('boxSpin', 'box', 90, 0.4, 'quadOut')
```

### tw:scale(t, obj, scale, time, ease)

参数：
- `t`(String)——补间标签
- `obj`(String)——目标精灵标签
- `scale`(Table)——目标缩放 `{x, y}`
- `time`(Float)——持续时间(秒)
- `ease`(String)——缓动名称 [默认 'linear']

返回：Bool

一起补间 `scale.x` 和 `scale.y`.

```lua
tw:scale('logoGrow', 'logo', {3.0, 3.0}, 1.0, 'backOut')
```

### tw:color(t, obj, color, time, ease)

参数：
- `t`(String)——补间标签
- `obj`(String)——目标精灵标签
- `color`(String)——目标颜色十六进制
- `time`(Float)——持续时间(秒)
- `ease`(String)——缓动名称 [默认 'linear']

返回：Bool

在精灵当前颜色和目标之间补间精灵的色调.

```lua
tw:color('boxRecolor', 'box', '00FFAA', 2.5, 'sineInOut')
```

### 其他一切

每个 `tw` 函数接受一个目标.有精灵标签时它是精灵标签；否则它通过与 game:get 相同的点分行走解析——所以你可以补间引擎能寻址的任何东西,不仅是标记精灵：

- 标记精灵 / 文本 / 背景 / 条——`'hero'`和`'hpBar'`

- 引擎对象——`'boyfriend'`和`'dad'`和`'girlfriend'`和`'camGame'`和`'camHud'`

- 字母组的字母——`'title.letters.2'`

- 音符线和接收器——`'playerStrums'`和`'playerStrums.members.2'`(或更友好的 `tw:strum`)

- 嵌套对象——`'hero.scale'`和`'hero.offset'`

嵌套属性也工作,键中有圆点：`tw:any('t', 'hero', { ['scale.x'] = 2, ['offset.y'] = 8 }, 0.5)`.

### tw:any(t, obj, v, time, ease, options)

参数：
- `t`(String)——补间标签
- `obj`(String)——目标——精灵标签,或 game:get 能到达的任何路径(见下面"你可以补间什么")
- `v`(Table)——属性→目标对,例如 `{ angle = 360, alpha = 0.5 }`.嵌套属性通过点工作：`{ ['scale.x'] = 2 }`.也接受 `color` 色调作为十六进制字符串(`color = '0xFF0000'` 或 `'FF0000'`)和颜色变换通道——`redOffset`和`greenOffset`和`blueOffset`和`alphaOffset`和`redMultiplier`和`greenMultiplier`和`blueMultiplier`和`alphaMultiplier`(见下文)
- `time`(Float)——持续时间(秒)
- `ease`(String)——缓动名称 [默认 'linear']
- `options`(Table)——可选配置——见下文 [可选]

返回：Bool

通用补间——相当于 Psych Engine 的 `startTween`.一次调用动画任意数量的属性；`options` 暴露底层 `FlxTween` 设置：

- `type`(Int)——FlxTween 类型常量：`PERSIST=1`和`LOOPING=2`和`PINGPONG=4`和`ONESHOT=8`和`BACKWARD=16`

- `ease`(String)——覆盖位置 `ease`

- `startDelay`(Float)——补间开始前的秒数

- `loopDelay`(Float)——循环迭代之间的秒数

- `onUpdate`和`onStart`和`onComplete`(Function)——回调

颜色变换通道.除了常规精灵字段,`v` 可以包含每通道颜色值——偏移 `redOffset` / `greenOffset` / `blueOffset` / `alphaOffset`(每个大致 `-255..255`,添加到通道)和乘数 `redMultiplier` / `greenMultiplier` / `blueMultiplier` / `alphaMultiplier`(每个 `0..1+`,缩放通道).这些动画精灵的 `colorTransform`——与 color:* 设置的相同表面——并通过 `setColorTransform` 每帧应用,所以它们可靠渲染(不像戳原始变换).你未列出的通道保持当前值.还有一个 `color` 键——十六进制字符串(`'0xFF0000'` 或 `'FF0000'`)从当前颜色淡到目标(与 `tw:color` 相同).在一次调用中混合任何这些——色调和颜色通道和像 `x`/`angle` 这样的普通字段(例如在移动时将精灵闪红)；它们都在一个补间标签下运行.

`options` 中的 `onComplete`和`onUpdate` 和 `onStart` 用补间标签调用.在 v0.7.3 之前,放在选项表中的函数被静默忽略,所以 `onComplete` 从不运行.

文本描边也补间：`text:border` 的 `borderSize` 和 `borderColor`(十六进制字符串,平滑混合),以及 `shader:outline`(其最外层)的 `outlineSize`和`outlineColor`和`outlineAlpha`.`outline*` 键在 GPU 上绘制,每帧无成本；`borderSize` 每帧重新渲染文本,所以对于长或循环补间优先使用 outline 键.

```lua
-- 色调淡出(颜色键,十六进制字符串带或不带 0x)
tw:any('toRed', 'player', { color = '0xFF0000' }, 0.5)
tw:any('toRed', 'player', { color = 'FF0000' }, 0.5)

-- 通过颜色变换偏移的命中闪烁
tw:any('hurt', 'player',
    { redOffset = 200, greenOffset = -120, blueOffset = -120 },
    0.12, 'quadOut')

-- 在一个补间标签中混合色调 + 运动
tw:any('flourish', 'player',
    { angle = 360, alpha = 0.5, color = '00CCFF' },
    2.0, 'elasticOut',
    { startDelay = 0.5, type = 4 })
```

### tw:num(t, from, to, time, callback, ease, onComplete)

参数：
- `t`(String)——补间标签
- `from`(Float)——起始值
- `to`(Float)——结束值
- `time`(Float)——持续时间(秒)
- `callback`(Function)——每帧用当前插值 `(v)` 调用
- `ease`(String)——缓动名称 [默认 'linear']
- `onComplete`(Function?)——补间完成时调用一次 v0.7.3

返回：Bool

补间一个裸数字——不涉及精灵.每帧用插值调用 `callback(v)`,所以你可以直接驱动着色器 uniform和相机值或计数器.传递 `onComplete` 在结束时运行某些东西,或轮询 `tw:completed(t)` / `tw:progress(t)`.重用活动标签取消前一个补间.

```lua
-- 通过 game:set 每帧淡入一个值
tw:num('bannerFade', 0, 1, 0.6, function(v)
    game:set('banner.alpha', v)
end, 'quadInOut', function()
    print('banner shown')
end)

-- 动画一个普通脚本变量(例如音频脉冲量)
tw:num('calm', 0.2, 0.03, 0.5, function(v) pulseAmt = v end, 'quadOut')

-- 为分数读数向上计数
tw:num('score', 0, 5000, 0.4, function(v)
    text:set('scoreText', 'SCORE: ' .. math.floor(v))
end)
```

### tw:strum(t, side, v, time, ease, options)

参数：
- `t`(String)——补间标签
- `side`(String|Int)——`'player'`/`1` 或 `'opponent'`/`0`
- `v`(Table)——字段→目标对,例如 `{ x = 600, alpha = 0.4 }`——任何 strum 字段(`x`和`y`和`alpha`和`angle`和`noteScale`……)
- `time`(Float)——持续时间(秒)
- `ease`(String)——缓动名称 [默认 'linear']
- `options`(Table)——与 `tw:any` 相同的选项表(type和startDelay和loopDelay和回调)[可选]

返回：Bool

补间整个音符线——一次所有四个音符.`tw:any('t', 'playerStrums', …)` 的便利：你传递侧,它通过 `game:set` 驱动 `playerStrums.*` / `opponentStrums.*` 字段,所以下落音符和长条尾部跟随.多个字段在一个标签下一起运行.

```lua
-- 玩家车道滑入并一起淡入
tw:strum('strumIn', 'player', { x = 800, alpha = 1.0 }, 0.8, 'expoOut')

-- 用循环缩小对手音符
tw:strum('shrink', 'opponent', { noteScale = 0.6 }, 1.0, 'sineInOut', { type = 4 })
```

### tw:strumNote(t, side, dir, v, time, ease, options)

参数：
- `t`(String)——补间标签
- `side`(String|Int)——`'player'`/`1` 或 `'opponent'`/`0`
- `dir`(Int)——接收器方向：`0` L和`1` D和`2` U和`3` R
- `v`(Table)——该接收器的字段→目标对——`x`和`y`和`alpha`和`angle`和`scale.x`和`scale.y`
- `time`(Float)——持续时间(秒)
- `ease`(String)——缓动名称 [默认 'linear']
- `options`(Table)——与 `tw:any` 相同的选项表 [可选]

返回：Bool

补间单个接收器(`dir` 处的箭头)；其下落音符跟随.`tw:any('t', 'playerStrums.members.2', …)` 的便利.注意：这里的 `alpha` 淡出接收器——要淡出该车道的下落音符使用 `strum:alpha`.

```lua
-- 将 UP 接收器放入位置；其音符跟随
tw:strumNote('upDrop', 'player', 2, { y = 120, angle = 15 }, 0.6, 'backOut')

-- 弹出一个接收器的缩放
tw:strumNote('pop', 'opponent', 0, { ['scale.x'] = 1.3, ['scale.y'] = 1.3 }, 0.3, 'elasticOut')
```

### 控制

### tw:cancel(t)

参数：
- `t`(String)——要取消的补间标签

返回：Bool

按标签取消活动补间.没有该标签的补间运行时返回 `false` 而不报错,所以在重启补间之前调用是安全的.

```lua
tw:cancel('boxSpin')
```

### tw:progress(t)

参数：
- `t`(String)——补间标签

返回：Float

返回补间的进度作为 `0`–`1` 分数.补间活动时读取实时 `FlxTween.percent`,自然完成后返回 `1.0`,从未启动或已取消的标签返回 `0.0`.

```lua
tw:y('boxDrop', 'box', 600, 1.0, 'bounceOut')

function onUpdate(elapsed)
    color:mul('box', 1, 1, 1, 1 - tw:progress('boxDrop'))
end
```

### tw:completed(t)

参数：
- `t`(String)——补间标签

返回：Bool

仅在补间自然到达其结束时返回 `true`.取消的补间和从未启动的标签和仍在飞行中的补间都返回 `false`.用另一个 `tw:*` 调用重用标签会将标志重置回 `false`.

```lua
tw:alpha('intro', 'logo', 0, 1.5)

function onUpdate(elapsed)
    if tw:completed('intro') then
        sprite:remove('logo')
    end
end
```

---

## 计时器函数

命名 `FlxTimer` 包装器——每个计时器由字符串 `t`(计时器标签)键控.用现有标签启动新计时器会自动取消前一个,镜像 `tw:*` 约定.回调是裸 Lua 函数(无参数).

### 启动计时器

### timer:start(t, seconds, cb, loops)

参数：
- `t`(String)——计时器标签
- `seconds`(Float)——触发之间的间隔,秒
- `cb`(Function)——每个间隔后触发的回调
- `loops`(Int)——触发多少次——`0` 表示无限 [默认 1]

返回：Bool

启动命名计时器.回调在 `seconds` 后触发,然后重复 `loops` 次总计.`loops = 0` 永远运行直到取消.重用标签先取消前一个计时器.

对于一次性或无限重复,优先 `timer:wait` / `timer:loop`——相同的调用,输入更短.

```lua
timer:start('countdown', 2.0, function()
    text:set('label', 'go!')
end)

timer:start('rapid', 0.25, function() print('tick') end, 8)
```

### timer:wait(t, seconds, cb)

参数：
- `t`(String)——计时器标签
- `seconds`(Float)——延迟,秒
- `cb`(Function)——延迟后触发一次的回调

返回：Bool

一次性计时器(`loops = 1`)的简写.在 `seconds` 后触发回调一次并从注册表移除自身.

```lua
timer:wait('hello', 2.0, function()
    print('two seconds later')
end)
```

### timer:loop(t, seconds, cb, count)

参数：
- `t`(String)——计时器标签
- `seconds`(Float)——间隔,秒
- `cb`(Function)——每个间隔触发的回调
- `count`(Int)——总触发次数——`0` 表示无限 [默认 0]

返回：Bool

重复计时器的简写.默认为 `count = 0`(无限)；传递正整数进行有限循环.当你不再需要时用 `timer:cancel(t)` 取消——无限计时器不会自动移除.

```lua
timer:loop('pulse', 0.5, function()
    color:mul('hud', 1, 1, 1, math.random(40, 100) / 100)
end)
```

### timer:cooldown(tag, seconds)
*自 v0.7.6*

参数：
- `tag`(String)——冷却名称
- `seconds`(Number)——再次可用前等待多久

返回：Bool

如果冷却空闲则返回 `true` 并开始等待,仍在运行时返回 `false`.适合攻击和冲刺和玩家不应滥用的任何东西.底层是普通计时器,所以 `timer:remaining`和`timer:cancel` 和 `timer:pause` 也在它上工作.

```lua
function onUpdate(dt)
    if input:mouseJustPressed() and timer:cooldown('attack', 0.3) then
        sprite:play('player', 'attack', true)
    end
end
```

### timer:ready(tag)
*自 v0.7.6*

参数：
- `tag`(String)——冷却或计时器名称

返回：Bool

此名称没有东西运行时为 `true`.用它在其冷却进行时灰化按钮.

```lua
game:set('dashIcon.alpha', timer:ready('dash') and 1 or 0.4)
```

### 控制

### timer:cancel(t)

参数：
- `t`(String)——计时器标签

返回：Bool

取消并移除命名计时器.如果没有这样的计时器活动则返回 `false`.

```lua
timer:cancel('pulse')
```

### timer:cancelAll()

返回：Bool

取消并移除每个活动计时器.如果你的脚本创建了计时器,始终从 `onDestroy` 调用这个——子状态不会自动清理它们.

```lua
function onDestroy()
    timer:cancelAll()
end
```

### timer:pause(t)

参数：
- `t`(String)——计时器标签

返回：Bool

暂停计时器而不丢失已流逝进度.用 `timer:resume(t)` 恢复.

```lua
if input:keyJustPressed('P') then timer:pause('pulse') end
```

### timer:resume(t)

参数：
- `t`(String)——计时器标签

返回：Bool

恢复暂停的计时器.暂停前流逝的时间保留.

```lua
if input:keyJustPressed('R') then timer:resume('pulse') end
```

### 状态

### timer:isActive(t)

参数：
- `t`(String)——计时器标签

返回：Bool

如果计时器当前正在运行(未暂停和未完成和未取消)则返回 `true`.

```lua
if not timer:isActive('pulse') then timer:resume('pulse') end
```

### timer:remaining(t)

参数：
- `t`(String)——计时器标签

返回：Float

距离下次触发还剩多少秒.如果标签未知则返回 `0`.

```lua
text:set('countdown', string.format('%.1fs', timer:remaining('intro')))
```

### timer:elapsed(t)

参数：
- `t`(String)——计时器标签

返回：Float

当前循环迭代开始以来的秒数.如果标签未知则返回 `0`.

```lua
print(timer:elapsed('pulse'))
```

### timer:progress(t)

参数：
- `t`(String)——计时器标签

返回：Float

当前循环进度作为 `0`–`1` 分数.计时器活动时读取实时 `FlxTimer.progress`,一次性计时器触发后(或有限重复器的最后循环后)返回 `1.0`,从未启动或已取消的标签返回 `0.0`.

```lua
tw:cancel('pulseScale')
color:mul('hud', 1, 1, 1, 0.4 + 0.6 * timer:progress('pulse'))
```

### timer:completed(t)

参数：
- `t`(String)——计时器标签

返回：Bool

仅在计时器自然完成所有循环后返回 `true`.取消的计时器和从未启动的标签和仍在滴答的计时器都返回 `false`.对于无限循环器(`count = 0`)这永远不会变为 `true`——在那里使用 `timer:isActive` 代替.重用标签将标志重置回 `false`.

```lua
timer:wait('intro', 3.0, function()
    text:set('hud', 'go!')
end)

function onUpdate(elapsed)
    if timer:completed('intro') then
        state:change('play')
    end
end
```

---

## 数学 / 工具函数

`util` 命名空间是一组小型和纯数学助手——Lua 的 `math` 库没有提供的东西：插值和钳制和缓动趋向和距离和角度.全部接受并返回普通数字.

### 插值和平滑

### util:lerp(a, b, t)

参数：
- `a`(Float)——起始值(`t = 0` 时)
- `b`(Float)——结束值(`t = 1` 时)
- `t`(Float)——插值因子——通常 `0..1`,但函数不钳制

返回：Float

`a` 和 `b` 之间的线性插值.返回 `a + (b - a) * t`.`0..1` 之外的值外推.

```lua
-- 在一拍内将 alpha 从 0.2 淡到 1.0
local p = (curBeat % 1)
game:set('hud.alpha', util:lerp(0.2, 1.0, p))
```

### util:approach(current, target, step)

参数：
- `current`(Float)——当前值
- `target`(Float)——你想它最终到达的地方
- `step`(Float)——此调用最多移动多少——通常乘以 `elapsed`

返回：Float

将 `current` 向 `target` 移动最多 `step` 单位,永不越过——不像 `lerp`,它永不超调并且总是到达目标.将 `step` 乘以 `game:get('elapsed')` 使速度是单位每秒而不是单位每帧.

```lua
function onUpdate(elapsed)
    -- 以 200/秒 接近目标 HP
    hp = util:approach(hp, targetHp, 200 * elapsed)
end
```

### util:damp(current, target, lambda, dt)

参数：
- `current`(Float)——当前值
- `target`(Float)——要缓动趋向的值
- `lambda`(Float)——平滑率——更高更快(尝试 `8..16`)
- `dt`(Float)——帧增量,即 `elapsed`

返回：Float

帧率无关的指数平滑.与原始 `lerp(current, target, k)`(在 30 和 120 FPS 下行为不同)不同,`damp` 在真实时间内到达同一地方,无论帧率.非常适合相机跟随和弹性 UI.

```lua
function onUpdate(elapsed)
    camX = util:damp(camX, targetX, 10, elapsed)
end
```

### util:smoothstep(edge0, edge1, x)

参数：
- `edge0`(Float)——下边缘(输出 0)
- `edge1`(Float)——上边缘(输出 1)
- `x`(Float)——采样位置

返回：Float

两个边缘之间的平滑 Hermite 插值,钳制到 `0..1`,带缓入/缓出端.用于线性因子看起来太机械的柔和淡入和斜坡.

```lua
-- 在前 0.5s 内柔和淡入
local a = util:smoothstep(0, 0.5, t)
game:set('title.alpha', a)
```

### util:lerpAngle(a, b, t)

参数：
- `a`(Float)——起始角,度
- `b`(Float)——结束角,度
- `t`(Float)——插值因子 0..1

返回：Float

在圆周围以短路径在两个角之间插值,内部使用 `angleDiff`.避免在 `0/360` 接缝附近普通 `lerp` 产生的长路径自旋伪影.

```lua
facing = util:lerpAngle(facing, aimAngle, 0.2)
```

### util:pingpong(v, length)

参数：
- `v`(Float)——输入值(通常是上升时间)
- `length`(Float)——三角波的峰值

返回：Float

当 `v` 增加时在 `[0, length]` 中来回弹跳 `v`——一个三角波.给它一个上升计时器以获得循环来回运动,而无需自己跟踪方向.

```lua
function onUpdate(elapsed)
    t = t + elapsed
    sprite:position('orb', util:pingpong(t * 100, 300), 200)
end
```

### util:flicker(t, ?speed, ?min, ?max, ?seed)
*自 v0.6.7*

参数：
- `t`(Float)——上升时间值,通常是累积的 elapsed 计时器
- `speed`(Float?)——它摆动的速度 [默认 2]
- `min`(Float?)——它降到的 lowest 值 [默认 0]
- `max`(Float?)——它达到的最高值 [默认 1]
- `seed`(Float?)——相位偏移,使多个闪烁的东西不会彼此同步移动 [默认 0]

返回：Float

返回在 `min` 和 `max` 之间摆动的值——三个不相关频率的正弦波叠加,所以它读起来像有机闪烁(蜡烛和霓虹灯和故障路灯)而不是干净和明显周期性的脉冲.`t` 的纯函数(无内部状态),所以它完全确定且从任何地方调用都安全.`sprite:flicker` 是一个现成的精灵 alpha 版本,如果你不想自己驱动它.

```lua
function onUpdate(elapsed)
    lampT = lampT + elapsed
    shader:lightRays('rays', { alpha = util:flicker(lampT, 3, 0.6, 1.0) })
end
```

### 钳制和映射和舍入

### util:clamp(v, min, max)

参数：
- `v`(Float)——要约束的值
- `min`(Float)——下界(包含)
- `max`(Float)——上界(包含)

返回：Float

将 `v` 约束到包含范围 `[min, max]`.用于防止 HP/分数值漂移出界.

```lua
hp = util:clamp(hp - damage, 0, 100)
local volume = util:clamp(slider, 0.0, 1.0)
```

### util:clamp01(v)

参数：
- `v`(Float)——要约束的值

返回：Float

`clamp(v, 0, 1)` 的简写——alpha和因子和归一化输入最常见的范围.

```lua
game:set('hud.alpha', util:clamp01(fade))
```

### util:wrap(v, min, max)

参数：
- `v`(Float)——要环绕的值
- `min`(Float)——下界(包含)
- `max`(Float)——上界(不包含)

返回：Float

将 `v` 环绕到半开范围 `[min, max)`——与 `clamp` 不同,超出范围的值滚动而不是堆积在边缘.用于角度(保持在 `0..360`)或循环列表索引.

```lua
-- 将旋转保持在 0..360
ang = util:wrap(ang + 5, 0, 360)

-- 循环菜单光标
cursor = util:wrap(cursor + dir, 0, #menuItems)
```

### util:map(v, inMin, inMax, outMin, outMax)

参数：
- `v`(Float)——输入值
- `inMin`(Float)——输入范围开始
- `inMax`(Float)——输入范围结束
- `outMin`(Float)——输出范围开始
- `outMax`(Float)——输出范围结束

返回：Float

将 `v` 从一个范围线性重映射到另一个范围.不钳制,所以 `[inMin, inMax]` 之外的输入外推.如果 `inMin == inMax` 它返回 `outMin`.

```lua
-- 将歌曲位置(0..length)映射到条宽度 0..400
local w = util:map(songTime, 0, songLength, 0, 400)
```

### util:percent(v, min, max)

参数：
- `v`(Float)——要测量的值
- `min`(Float)——给出 0 的值
- `max`(Float)——给出 1 的值

返回：Float

`lerp` 的逆：返回 `v` 落在 `[min, max]` 中的位置作为 `0..1` 因子,钳制.`percent(75, 0, 100)` 是 `0.75`.

```lua
local t = util:percent(hp, 0, maxHp)
sprite:scale('healthbar', t, 1)
```

### util:snap(v, step)

参数：
- `v`(Float)——要量化的值
- `step`(Float)——网格大小(如果 ≤ 0 则返回 `v` 不变)

返回：Float

将 `v` 舍入到 `step` 的最近倍数——瓦片放置和音符量化或步进滑块的网格吸附.

```lua
-- 将拖动的精灵吸附到 32px 网格
sprite:position('block', util:snap(mx, 32), util:snap(my, 32))
```

### util:round(v, decimals)

参数：
- `v`(Float)——要舍入的值
- `decimals`(Int)——保留的小数位 [默认 0]

返回：Float

半远离零舍入.`decimals = 0` 时得到整数；`decimals = 2` 时保留分/百分比精度.但它仍然返回 `Float`,浮点数无法精确表示大多数小数——将结果直接连接到字符串(`util:round(v, 2) .. '%'`)对于某些输入仍可能显示像 `74.9899999999999997` 这样的尾随噪声,因为舍入值本身不精确可表示.对于任何显示为文本的东西,使用 `util:fixed` 代替,它手工构建字符串且永远没有这个问题.

```lua
-- 对于你继续作为数字使用的数学没问题
local snapped = util:round(rawValue, 2)
```

### util:fixed(v, ?decimals)
*自 v0.6.7*

参数：
- `v`(Float)——要格式化的值
- `decimals`(Int?)——显示的小数位 [默认 0]

返回：String

将数字格式化为干净显示字符串,恰好 `decimals` 位——永远,永远没有尾随浮点噪声,因为它从舍入整数逐位构建,而不是依赖 Lua 默认的浮点到字符串转换(这正是导致文本像 `74.9999998` 或 `1.0000002` 出现在 HUD 标签上的原因).这是任何数字变为可见文本时应该使用的函数；保留 `util:round` 用于你仍在做数学的数字.

```lua
util:fixed(274.8700000001, 2)   -- '274.87'
util:fixed(1.0000002, 0)        -- '1'
util:fixed(5, 2)                -- '5.00'

text:set('acc', util:fixed(accuracy * 100, 2) .. '%')
```

### util:sign(v)

参数：
- `v`(Float)——要检查的值

返回：Int

负数返回 `-1`,零返回 `0`,正数返回 `1`.用于翻转精灵面向旅行方向.

```lua
local vx = game:get('player.velocity.x')
if vx ~= 0 then
    sprite:scale('player', util:sign(vx), 1)   -- 面向移动方向
end
```

### 数学

### util:floor(v)

参数：
- `v`(Float)——值

返回：Int

不大于 `v` 的最大整数.

```lua
local frame = util:floor(t * fps)
```

### util:ceil(v)

参数：
- `v`(Float)——值

返回：Int

不小于 `v` 的最小整数.

```lua
local pages = util:ceil(#items / perPage)
```

### util:abs(v)

参数：
- `v`(Float)——值

返回：Float

不带符号的值：`-5` 变成 `5`.便于距离和速度.

```lua
if util:abs(vx) < 0.01 then vx = 0 end
```

### util:min(a, b)

参数：
- `a`(Float)——第一个值
- `b`(Float)——第二个值

返回：Float

两个值中较小的.

```lua
local v = util:min(charge, maxCharge)
```

### util:max(a, b)

参数：
- `a`(Float)——第一个值
- `b`(Float)——第二个值

返回：Float

两个值中较大的.

```lua
local v = util:max(hp, 0)
```

### util:mod(a, b)

参数：
- `a`(Float)——被除数
- `b`(Float)——除数(如果 `b == 0` 返回 0)

返回：Float

真正的数学模——结果总是与 `b` 同号,不像 Lua 的 `%` 可能变负.`mod(-1, 360)` 是 `359`,不是 `-1`.用于环绕角度和索引.

```lua
ang = util:mod(ang - 10, 360)
```

### util:fract(v)

参数：
- `v`(Float)——值

返回：Float

`v` 的小数部分(`v - floor(v)`),总是在 `[0, 1)` 中.

```lua
local beatPhase = util:fract(curBeat)  -- 拍内的 0..1
```

### util:sqrt(v)

参数：
- `v`(Float)——值(负数和零返回 0)

返回：Float

平方根,防止负输入,所以它永不返回 NaN.

```lua
local mag = util:sqrt(vx*vx + vy*vy)
```

### util:pow(base, exp)

参数：
- `base`(Float)——底
- `exp`(Float)——指数

返回：Float

`base` 的 `exp` 次幂,所以 `util:pow(2, 3)` 是 `8`.与 Lua 中的 `base ^ exp` 相同.

```lua
local ease = util:pow(t, 3)  -- 三次缓入
```

### util:hypot(x, y)

参数：
- `x`(Float)——X 分量
- `y`(Float)——Y 分量

返回：Float

向量 `(x, y)` 的长度——`sqrt(x*x + y*y)`.与到原点的 `distance` 相同.

```lua
local speed = util:hypot(vx, vy)
```

### util:exp(v)

参数：
- `v`(Float)——指数

返回：Float

`e`(约 2.718)的 `v` 次幂.用于平滑衰减,例如 `util:exp(-dt * 8)` 作为帧率无关的淡出因子.

```lua
local decay = util:exp(-rate * elapsed)
```

### util:log(v, base)

参数：
- `v`(Float)——值(≤ 0 返回 0)
- `base`(Float)——对数底——省略或 ≤ 0 为自然对数 [默认 0]

返回：Float

`v` 的对数.没有底时是自然对数；传递 `2` 或 `10` 获得那些底.

```lua
local octaves = util:log(freq / base, 2)
```

### util:pi()

返回：Float

返回常数 `π`(≈ 3.14159).

```lua
local fullTurn = util:pi() * 2
```

### 角度和距离

### util:distance(x1, y1, x2, y2)

参数：
- `x1`(Float)——第一点 X
- `y1`(Float)——第一点 Y
- `x2`(Float)——第二点 X
- `y2`(Float)——第二点 Y

返回：Float

两点之间的欧几里得距离.对于纯半径检查,改为比较 `dx*dx + dy*dy` 与平方半径以跳过 sqrt.

```lua
local d = util:distance(px, py, ex, ey)
if d < 80 then
    print('enemy is close')
end
```

### util:angle(x1, y1, x2, y2)

参数：
- `x1`(Float)——从 X
- `y1`(Float)——从 Y
- `x2`(Float)——到 X
- `y2`(Float)——到 Y

返回：Float

从点 1 到点 2 的角度,度.`0°` 指向右,`90°` 指向下(Flixel 屏幕空间约定).与 `lengthdirX` / `lengthdirY` 配对以将其转回移动向量.

```lua
-- 将箭头瞄准鼠标
local sx = game:get('arrow.x') + game:get('arrow.width') / 2
local sy = game:get('arrow.y') + game:get('arrow.height') / 2
game:set('arrow.angle', util:angle(sx, sy, input:mouseX(), input:mouseY()))
```

### util:lengthdirX(len, deg)

参数：
- `len`(Float)——向量长度
- `deg`(Float)——角度(度)

返回：Float

长度为 `len` 角度为 `deg` 的向量的 X 分量.相当于 `len * cos(deg)`.当你想要以角度移动时始终与 `lengthdirY` 配对.

```lua
local dx = util:lengthdirX(speed, ang)
local dy = util:lengthdirY(speed, ang)
sprite:velocity('bullet', dx, dy)
```

### util:lengthdirY(len, deg)

参数：
- `len`(Float)——向量长度
- `deg`(Float)——角度(度)

返回：Float

长度为 `len` 角度为 `deg` 的向量的 Y 分量.相当于 `len * sin(deg)`.与 `lengthdirX` 配对.

```lua
-- 从命中角度击退
local kx = util:lengthdirX(300, hitAngle)
local ky = util:lengthdirY(300, hitAngle)
sprite:velocity('player', kx, ky)
```

### util:sin(rad)

参数：
- `rad`(Float)——弧度角

返回：Float

弧度角的正弦.先使用 `deg2rad` 转换度,或者如果你在度中工作使用 `lengthdirY`.

```lua
sprite:position('orb', 200, 300 + util:sin(t * 4) * 50)
```

### util:cos(rad)

参数：
- `rad`(Float)——弧度角

返回：Float

弧度角的余弦.

```lua
local x = cx + util:cos(t) * radius
```

### util:tan(rad)

参数：
- `rad`(Float)——弧度角

返回：Float

弧度角的正切.

```lua
local slope = util:tan(angleRad)
```

### util:atan2(y, x)

参数：
- `y`(Float)——Y 分量
- `x`(Float)——X 分量

返回：Float

向量 `(x, y)` 的角度,弧度,范围 `-π..π`.对于基于度和点对点的版本使用 `util:angle`.

```lua
local rad = util:atan2(dy, dx)
local deg = util:rad2deg(rad)
```

### util:deg2rad(deg)

参数：
- `deg`(Float)——角度(度)

返回：Float

将度转换为弧度(用于喂给 `sin`/`cos`/`tan`).

```lua
local y = util:sin(util:deg2rad(90))  -- 1.0
```

### util:rad(deg)

参数：
- `deg`(Float)——角度(度)

返回：Float

度 → 弧度.与 Lua 的 `math.rad` 匹配的短别名——与 `util:deg2rad` 相同,保留肌肉记忆.与 `util:sin`/`util:cos` 配对,它们期望弧度.

```lua
local r = util:rad(45)
sprite:position('p', cx + util:cos(r) * 80, cy + util:sin(r) * 80)
```

### util:rad2deg(rad)

参数：
- `rad`(Float)——角度(弧度)

返回：Float

将弧度转换为度(用于从 `atan2` 结果喂给 `sprite:angle`).

```lua
game:set('arrow.angle', util:rad2deg(util:atan2(dy, dx)))
```

### util:angleDiff(a, b)

参数：
- `a`(Float)——从角度,度
- `b`(Float)——到角度,度

返回：Float

两个角之间的最短有符号差(度),总是在 `-180..180` 中.处理环绕,所以从 `350°` 转到 `10°` 读作 `+20`,不是 `-340`.

```lua
local turn = util:angleDiff(facing, targetAngle)
facing = facing + turn * 0.1
```

### 资产检查

### util:checkSprite(path)

参数：
- `path`(String)——`assets/images/` 下的图像路径,带或不带 `.png` 扩展名

返回：Bool

图像资产是否存在(已加载/跟踪,或存在于磁盘/包中).用它保护 `sprite:add` 免受缺失文件的影响,或仅在其艺术已发布时选择皮肤/变体.

```lua
local img = util:checkSprite('chars/her/icon') and 'chars/her/icon' or 'chars/default/icon'
sprite:add('icon', img)
```

---

## 网格函数

`mesh` 命名空间从图像制作可变形网格网格——一个你可以移动以扭曲和波动和倾斜或挤压纹理的顶点格.它基于 flixel 的 `FlxStrip`,所以它像任何精灵一样尊重 `scrollFactor`和相机和缩放,并通过与丝带和透视着色器相同的 `drawTriangles` 路径渲染.

### 工作原理

`mesh:add(tag, image, cols, rows)` 在图像上构建 `(cols+1) × (rows+1)` 顶点网格,UV 映射使每个单元格显示其纹理切片.然后你用 `mesh:vertex` 移动任何顶点来扭曲它——从 `onUpdate` 驱动它用于旗帜和水和果冻和热浪和横幅和屏幕扭曲过渡等.

网格是标记精灵(底层 `FlxStrip`),所以在精灵标签上工作的一切都在它上工作：定位它和淡出它和着色它和放到相机上和补间它,都通过你给 `mesh:add` 的标签——例如 `game:set('flag.alpha', 0.5)`和`game:set('flag.color', 'FF5500')`和`sprite:camera('flag', 'hud')`和`scroll:set('flag', 0.4, 0.4)`.仅对顶点网格本身使用 `mesh:*` 调用.

### mesh:add(tag, image, cols, rows, x, y, smooth)

参数：
- `tag`(String)——新网格标签(逐出此标签处的任何精灵/网格)
- `image`(String)——`assets/images/` 下的图像键(例如 `'ui/flag'` → `assets/images/ui/flag.png`)
- `cols`(Int?)——网格列(横向单元格).默认 `4` [默认 4]
- `rows`(Int?)——网格行(纵向单元格).默认 `4` [默认 4]
- `x`(Number?)——网格左上角的世界 x [默认 0]
- `y`(Number?)——世界 y [默认 0]
- `smooth`(Bool?)——抗锯齿.网格默认平滑(无论全局标志如何),因为变形重新采样纹理；传递 `false` 用于像素艺术 [默认 true]

返回：Bool

在图像的原生大小创建网格网格.如果找不到图像则返回 `false`(带控制台错误命名预期路径).更高的 `cols`/`rows` 意味着更平滑的变形但更多三角形.默认抗锯齿,因为变形会扭曲纹理,未平滑采样看起来有锯齿；通过 `smooth` 或 `sprite:antialiasing(tag, false)` 禁用.

```lua
mesh:add('flag', 'ui/flag', 12, 6, 200, 100)   -- (200,100) 处 12x6 网格

game:set('flag.color', 'FFCC00')                -- 着色整个网格
game:set('flag.alpha', 0.9)
```

### mesh:vertex(tag, col, row, x, y, absolute)

参数：
- `tag`(String)——网格标签
- `col`(Int)——网格列,`0..cols`
- `row`(Int)——网格行,`0..rows`
- `x`(Number)——从顶点静止位置的 X 偏移(或如果 `absolute` 则为绝对局部 x)
- `y`(Number)——Y 偏移(或绝对局部 y)
- `absolute`(Bool?)——当 `true` 时,`x`/`y` 是顶点的局部位置而不是偏移.默认 `false` [默认 false]

返回：Bool

移动一个网格顶点.默认情况下 `x`/`y` 是平面网格的偏移,所以 `(0, 0)` 是静止位置——非常适合动画位移.超出范围的索引被忽略.

```lua
-- 波动旗帜：每列在正弦上推动中间行
function onUpdate(dt)
    t = (t or 0) + dt
    for c = 0, 12 do
        local amp = (c / 12) * 18            -- 向自由边缘更多摇摆
        mesh:vertex('flag', c, 2, 0, math.sin(t*4 + c*0.6) * amp)
        mesh:vertex('flag', c, 4, 0, math.sin(t*4 + c*0.6) * amp)
    end
end
```

### mesh:vertexX(tag, col, row)

参数：
- `tag`(String)——网格标签
- `col`(Int)——网格列
- `row`(Int)——网格行

返回：Float

顶点在网格自身空间中的当前 X.未知网格或点返回 `0`.

```lua
local x = mesh:vertexX('flag', 12, 0)
```

### mesh:vertexY(tag, col, row)

参数：
- `tag`(String)——网格标签
- `col`(Int)——网格列
- `row`(Int)——网格行

返回：Float

顶点在网格自身空间中的当前 Y.未知网格或点返回 `0`.

```lua
local y = mesh:vertexY('flag', 12, 0)
mesh:vertex('flag', 12, 0, mesh:vertexX('flag', 12, 0), y + 4)
```

### mesh:reset(tag)

参数：
- `tag`(String)——网格标签

返回：Bool

将每个顶点弹回平坦和未变形的网格.

```lua
mesh:reset('flag')
```

### mesh:remove(tag)

参数：
- `tag`(String)——网格标签

返回：Bool

销毁网格并释放其标签.与网格标签上的 `sprite:remove` 相同.

```lua
mesh:remove('flag')
```

---

## 滤镜函数

`filter` 命名空间按标签向精灵或相机应用颜色分级滤镜——亮度和对比度和饱和度和灰度(黑白)和反转和后化和抖动——加上 `blur`.每个分级通过一个 GPU 着色器(`ColorGradeShader`)运行,所以便宜且堆叠：在同一目标上设置几个属性,它们组合.这里的每个函数也接受标签表(`{'game', 'hud'}`)或 `'all'` 表示每个相机,并对每个应用自身.

### 工作原理

传递任何精灵标签(背景和网格和文本和图像——你标记的任何东西)或相机标签(例如 `'game'`和`'hud'` 或你用 `camera:add` 制作的相机).每个目标有一个颜色上下文：下面所有颜色属性堆叠在其中而不是互相替换.

一个矩阵,一次渲染 v0.6.8.线性属性(灰度 → 饱和度 → 色相 → 对比度 → 亮度 → 棕褐色 → 双色调 → 反转,按此顺序)在其中一个变化时在 CPU 上组合成单个颜色矩阵,GPU 每像素做一次矩阵乘法.后化和抖动在同一着色器中紧随其后运行.所以它们的任何混合成本与一个效果相同——在相机上是一次屏幕渲染而不是每个效果一次.

当每个属性都回到其中性值(例如亮度闪烁补间回 `0`)时,上下文自行分离：精灵拿回其着色器槽,相机丢弃渲染,所以空闲分级没有成本.调用一个属性永远不会重置其他属性.使用 `filter:set` 一次更改几个,或 `filter:clear` 丢弃上下文.

`shader:invert`和`shader:sepia` 和 `shader:duotone` v0.6.8 写入同一上下文,所以它们也与 `filter:*` 堆叠.

### 颜色调整

### filter:brightness(tag, value)

参数：
- `tag`(String)——精灵标签或相机标签
- `value`(Number)——加法亮度.`0` = 无变化,`+` 增亮,`-` 变暗(大约 -1..1)

返回：Bool

向每个通道添加平坦偏移.如果标签不是精灵或相机则返回 `false`(带控制台错误).

```lua
filter:brightness('game', -0.4)   -- 使整个舞台变暗(例如过场动画)
filter:brightness('logo', 0.2)     -- 提升一个精灵
```

### filter:contrast(tag, value)

参数：
- `tag`(String)——精灵或相机标签
- `value`(Number)——围绕中灰的对比度乘数.`1` = 无变化,`>1` 更有冲击力,`<1` 更平坦(钳制 ≥ 0)

返回：Bool

将每个通道从 0.5 向外缩放.与饱和度搭配用于电影感外观.

```lua
filter:contrast('game', 1.5)
```

### filter:saturation(tag, value)

参数：
- `tag`(String)——精灵或相机标签
- `value`(Number)——颜色强度.`1` = 无变化,`0` = 灰色,`>1` = 增强(钳制 ≥ 0)

返回：Bool

在每个像素的亮度和颜色之间混合.`0` 与完全灰度相同；高于 `1` 的值过饱和.

```lua
filter:saturation('game', 0.0)   -- 抽干所有颜色
filter:saturation('game', 2.0)   -- 鲜艳
```

### filter:grayscale(tag, amount)

参数：
- `tag`(String)——精灵或相机标签
- `amount`(Number?)——向黑白混合,`0`..`1`.默认 `1`(完整)[默认 1]

返回：Bool

向亮度(BT.601 权重)淡出目标.部分值给出褪色和去饱和的外观；动画它用于死亡或失败的淡至灰色.

```lua
filter:grayscale('game')         -- 完全黑白
filter:grayscale('game', 0.6)    -- 60% 去饱和
```

### filter:invert(tag, amount)

参数：
- `tag`(String)——精灵或相机标签
- `amount`(Number?)——向反转颜色混合,`0`..`1`.默认 `1` [默认 1]

返回：Bool

否定每个通道.通过将其脉冲到 1 再回来用于故障/受伤闪光.

```lua
filter:invert('game', 1)         -- 全负片
filter:invert('game', 0)         -- 回到正常(或 filter:clear)
```

### filter:hue(tag, degrees)
*自 v0.6.8*

参数：
- `tag`(String)——精灵或相机标签
- `degrees`(Number)——色相旋转(度).`0` = 不变,`180` = 相反色相.亮度保留

返回：Bool

将每个颜色围绕色轮旋转.颜色矩阵的一部分,所以与其他属性堆叠而无额外成本.

```lua
filter:hue('game', 90)
filter:tween('game', 'hue', 360, 4, 'linear')   -- 完整颜色循环
```

### filter:sepia(tag, ?amount)
*自 v0.6.8*

参数：
- `tag`(String)——精灵或相机标签
- `amount`(Number?)——`0`–`1` 向温暖棕褐色调混合 [默认 1]

返回：Bool

老照片棕褐色调.与 `shader:sepia` 相同,它现在也写在这里.

```lua
filter:sepia('game', 0.8)
```

### filter:duotone(tag, ?dark, ?light, ?amount)
*自 v0.6.8*

参数：
- `tag`(String)——精灵或相机标签
- `dark`(String?)——阴影的颜色(十六进制或名称)[默认 '1A0D40']
- `light`(String?)——高光的颜色 [默认 'FFD98C']
- `amount`(Number?)——`0`–`1` 向双色调混合 [默认 1]

返回：Bool

将亮度映射到两色之间的渐变.与 `shader:duotone` 相同,它现在也写在这里.省略的颜色保持之前的值.

```lua
filter:duotone('game', '101030', 'FF77AA')
filter:tween('game', 'duotone', 0, 1, 'quadOut')
```

### 风格化

### filter:posterize(tag, levels)

参数：
- `tag`(String)——精灵或相机标签
- `levels`(Number?)——每通道颜色级别(例如 `4` = 4 步复古带状).`0` 禁用 [默认 0]

返回：Bool

将每个颜色通道量化为 `levels` 步——经典后化 / 减少调色板外观.与其他分级属性堆叠(灰度 + 后化 = 旧 LCD 感觉).也是 `filter:tween`/`flash` 的有效属性.

```lua
filter:posterize('game', 4)     -- 粗厚复古调色板
filter:posterize('game', 0)     -- 关闭
```

### filter:dither(tag, amount, levels)

参数：
- `tag`(String)——精灵或相机标签
- `amount`(Number?)——抖动强度 `0`..`1` [默认 1]
- `levels`(Number?)——搭配的后化级别.默认为当前后化,如果没有则 `4` [默认 0]

返回：Bool

在后化之上分层的有序(Bayer)抖动——色带分解为像素棋盘图案,像老式抖动渐变.在没有活动 `posterize` 时调用它会自动设置 4 级别.

```lua
filter:dither('game', 1, 4)     -- 完整复古：4 级别 + 抖动
filter:dither('game', 0)        -- 抖动关闭(后化保持)
```

### filter:grain(tag, ?amount)
*自 v0.6.8*

参数：
- `tag`(String)——精灵或相机标签
- `amount`(Number?)——胶片颗粒强度.`0` 移除它；约 `0.1` 微妙,`1` 是重静电 [默认 0.12]

返回：Bool

动画胶片颗粒,在颜色矩阵之后应用,与颜色上下文其余部分同一渲染——所以颗粒加任何颜色分级仍然花费一个着色器.游戏暂停时它与其他动画效果一起冻结.像其他属性一样可补间(`filter:tween(tag, 'grain', 0, 1)`)；回到 `0` 时它停止滴答,如果没有其他设置,上下文分离.

```lua
filter:grain('game', 0.15)

-- 淡出的静电爆发
filter:grain('game', 1)
filter:tween('game', 'grain', 0, 1, 'linear')
```

### filter:blur(tag, strength, quality, below)
*自 v0.6.5*

参数：
- `tag`(String)——精灵或相机标签
- `strength`(Number?)——模糊量,`0`..`1`.`0` 移除模糊 [默认 0.5]
- `quality`(Number?)——仅相机.模糊通道,`1`..`5`——更高更平滑,成本略高 [默认 2]
- `below`(Bool?)——仅相机.`true` 模糊此相机下方绘制的每个相机并保持此相机清晰——菜单和弹出窗口的磨砂玻璃层 [默认 false]

返回：Bool

`filter` 命名空间中的高斯模糊,所以 `filter:clear` 也拆除它.在两条路径上都实时——每帧更改便宜.

在相机上它是滤镜堆栈中 OpenFL 的真正多遍 `BlurFilter`,与颜色分级堆叠并尊重 `quality`.在精灵上它是精灵一个着色器槽中的单遍可分离 7 抽头高斯——因为使用那个槽,它与同一精灵上的颜色分级互斥.`strength = 0` 或 `filter:clear(tag)` 移除它.

对于最宽和最干净的模糊,或一次模糊许多精灵,将内容放在自己的相机上并模糊那个.

相机滤镜只模糊该相机上绘制的内容,所以模糊一个位于顶部空相机什么也不变.要模糊菜单背后的所有内容,传递 `below = true`：它下面的每个相机获得模糊,菜单相机保持清晰,稍后添加和移除或重新排序的相机会自行拾取.

```lua
-- 模糊背景精灵；自由补间它
filter:blur('bg', 0)
tw:num('bgBlur', 0, 0.6, 0.3, function(v) filter:blur('bg', v) end, 'quadOut')
filter:blur('bg', 0)   -- 再次清晰

-- 或整个相机(hud 相机保持清晰)
camera:add('bgcam')
sprite:camera('bg', 'bgcam')
filter:blur('bgcam', 0.5, 4)

-- 磨砂菜单：模糊菜单相机下的所有内容
camera:add('menu')
filter:blur('menu', 0.3, 2, true)
filter:blur('menu', 0)   -- 移除
```

### 设置和补间和清除

### filter:set(tag, opts, below)

参数：
- `tag`(String)——精灵或相机标签
- `opts`(Table)——任何：`brightness`和`contrast`和`saturation`和`grayscale`和`invert`.省略的键保持不变.
- `below`(Bool?)——仅相机.`true` 将选项应用于此相机下方绘制的每个相机而不是相机本身——例如灰化弹出窗口背后的整个菜单 [默认 false]

返回：Bool

一次调用设置几个分级属性——应用外观的简洁方式.

v0.6.8 接受每个属性(brightness / contrast / saturation / grayscale / invert / hue / sepia / duotone / posterize / dither / grain),加上双色调颜色的 `dark` / `light`.

```lua
filter:set('game', { contrast = 1.6, saturation = 1.3, brightness = 0.05 })
```

### filter:tween(tag, prop, to, duration, ease)

参数：
- `tag`(String)——精灵或相机标签
- `prop`(String)——要动画的分级：`brightness`和`contrast`和`saturation`和`grayscale` 或 `invert`
- `to`(Number)——目标值
- `duration`(Number)——秒.`0` 立即设置
- `ease`(String?)——FlxEase 名称(例如 `quadOut`和`sineInOut`).默认线性

返回：Bool

将一 个分级属性从其当前值动画到 `to`,持续 `duration`.同一 tag+prop 上的新补间取消之前的.非常适合平滑淡至灰色或缓慢对比度渐变.

v0.6.8 `prop` 可以是任何：brightness / contrast / saturation / grayscale / invert / hue / sepia / duotone / posterize / dither / grain.

```lua
filter:tween('game', 'grayscale', 1, 1.5, 'quadOut')   -- 缓动到黑白
filter:tween('game', 'brightness', -0.5, 0.8)          -- 在 0.8s 内变暗
```

### filter:flash(tag, prop, peak, duration, ease)

参数：
- `tag`(String)——精灵或相机标签
- `prop`(String)——brightness / contrast / saturation / grayscale / invert
- `peak`(Number)——闪光峰值处的值
- `duration`(Number)——总秒数(出和回)
- `ease`(String?)——FlxEase 名称.默认线性

返回：Bool

将属性从其当前值脉冲到 `peak` 并在 `duration` 内返回——一次性命中反应.与 `onNoteMiss` 配对用于受伤闪光.

v0.6.8 `prop` 可以是任何：brightness / contrast / saturation / grayscale / invert / hue / sepia / duotone / posterize / dither / grain.

```lua
function onNoteMiss(strum, dir, id, isLong, noteType)
    if strum == 0 then filter:flash('game', 'invert', 1, 0.18) end
end
```

### filter:clear(tag)

参数：
- `tag`(String)——精灵或相机标签

返回：Bool

完全移除分级——丢弃精灵的着色器或相机滤镜并忘记存储的设置.

```lua
filter:clear('game')
```

---

## 滚动函数

`scroll` 命名空间控制 `sprite.scrollFactor`——精灵随其相机滚动的强度.`1` = 与相机 1 对 1 移动(默认)；`0` = 锁定到屏幕(HUD)；小数值产生视差.每个轴独立.

### scroll:set(tag, x, y)

参数：
- `tag`(String)——精灵标签
- `x`(Float)——水平滚动因子
- `y`(Float)——垂直滚动因子

返回：Bool

设置对象在两个轴上随相机移动多少：`0` 留在屏幕上固定,`1` 随世界移动,中间值制作视差层.

```lua
scroll:set('parallax_far', 0.25, 0.25)
scroll:set('parallax_mid', 0.5, 0.5)
scroll:set('parallax_near', 1.0, 1.0)
```

### scroll:x(tag, x)

参数：
- `tag`(String)——精灵标签
- `x`(Float)——水平滚动因子

返回：Bool

仅设置水平轴.适合水平滚动但垂直锁定的精灵(例如跟随相机左右但从不上下移动的状态栏).

```lua
scroll:x('hud_bar', 0)
scroll:y('hud_bar', 1)
```

### scroll:y(tag, y)

参数：
- `tag`(String)——精灵标签
- `y`(Float)——垂直滚动因子

返回：Bool

仅设置垂直轴.

```lua
scroll:y('cloud', 0.1)   -- 云几乎不垂直漂移
```

### scroll:lock(tag)

参数：
- `tag`(String)——精灵标签

返回：Bool

`scroll:set(tag, 0, 0)` 的简写.将精灵固定到屏幕空间——它完全忽略相机移动.用于 HUD 元素和叠加层和暂停菜单.

```lua
sprite:rec('hud_bg', 0, 0, 1280, 60, '000000')
scroll:lock('hud_bg')
```

### scroll:reset(tag)

参数：
- `tag`(String)——精灵标签

返回：Bool

`scroll:set(tag, 1, 1)` 的简写——恢复默认 1 对 1 跟随.

```lua
scroll:reset('logo')
```

### scroll:get(tag)

参数：
- `tag`(String)——精灵标签

返回：Table

返回当前滚动因子作为 `{x, y}`,如果标签未知则返回 `nil`.

```lua
local s = scroll:get('logo')
print(s.x, s.y)
```

---

## API 信息

`api` 命名空间告诉脚本它运行在哪个引擎上以及存在哪些函数,所以模组可以在调用新东西前检查,而不是撞上警告.

### api:version()

返回：String

引擎版本,例如 `'0.7.3'`.

```lua
print('Freak Engine ' .. api:version())
```

### api:has(name)

参数：
- `name`(String)——`'ns:fn'` 或 `'ns.fn'` 用于函数,或命名空间名称

返回：Bool

如果此构建中函数或命名空间存在则返回 `true`.用它支持旧版引擎.

```lua
if api:has('sprite:onClick') then
    sprite:onClick('play', go)
else
    -- 旧引擎：在 onUpdate 中轮询 input:mouseClicked('play')
end
```

### api:list(ns)

参数：
- `ns`(String?)——要列出的命名空间.省略以列出命名空间

返回：Table

排序的命名空间名称列表,或某个命名空间下注册的函数列表.

```lua
for _, n in ipairs(api:list()) do print(n) end
```

---

## 相机函数

`camera` 命名空间从 Lua 创建和驱动命名相机.相机在标签下注册,可以通过 `sprite:camera(spriteTag, tag)` 定位以通过它渲染特定对象——用于将缩放/抖动的世界相机与固定 HUD 相机分离.

### 相机如何工作

每个状态已经有一个默认相机,绘制你没有重新分配的精灵.要驱动那个世界相机(缩放和跟随和抖动),用 `camera:bind('game')` 给它一个标签.要添加叠加层——通常是固定 HUD——使用 `camera:add('hud')`,它在顶部生成一个额外的透明相机.两者都在精灵使用的同一注册表中注册标签.

要让精灵通过相机渲染,用精灵命名空间分配它：

| 步骤 | 调用 |
|---|---|
| 创建相机 | `camera:add('hud')` |
| 将精灵路由到它 | `sprite:camera('myText', 'hud')` |

相机在状态切换时自动拆除；它们的标签与一切一起释放.重用现有标签失败(使用新名称或先 `camera:remove`).所有颜色参数使用标准十六进制格式——见颜色格式.

### 创建和管理相机

### camera:add(tag, zoom, layer)

参数：
- `tag`(String)——新相机标签(必须未使用)
- `zoom`(Number?)——初始缩放乘数.可跳过：在这里传递层字符串,它会移过去——`camera:add('ui', 'hud')` 等于 `camera:add('ui', 1, 'hud')` [默认 1]
- `layer`(String)——可选混合 / 宽屏层角色：`'ui'`(别名 `'hud'`/`'other'`——保持信箱居中)或 `'world'`(别名 `'game'`——扩展以填充超宽视口).未知值记录警告.仅在具有 `ENABLE_WIDESCREEN` 标志的构建中应用；否则忽略.[可选]

返回：Bool

在堆栈顶部创建一个透明相机并在 `tag` 下注册它；如果标签被占用则失败.`layer` 为宽屏系统(`HybridController`)标记它：`'ui'`/`'hud'` 保持信箱居中,`'world'`/`'game'` 在超宽上扩展.立即应用,所以游戏中创建的相机立即获得正确大小/位置.无法识别的层名称记录警告.仅在 `ENABLE_WIDESCREEN` 构建中有意义.

```lua
camera:add('world', 1, 'world')
camera:add('hud', 'ui')            -- 跳过缩放,默认为 1

sprite:camera('player', 'world')
sprite:camera('hpText', 'hud')
```

### camera:split(tags, vertical, zoom)

参数：
- `tags`(Table)——新相机标签数组,每个视口一个(都必须未使用)
- `vertical`(Bool)——对于 2 个标签：`false` = 上/下(默认),`true` = 左/右 [默认 false]
- `zoom`(Number)——应用于每个视口的缩放乘数 [默认 1]

返回：Bool

为每个标签创建一个透明相机并在它们之间平铺屏幕.2 个标签上/下分割(或 `vertical = true` 时左/右)；3–4 形成 2×2 四路；超过 4 在一行或列中堆叠.之后每个都是普通相机——用 `camera:follow` 跟随它和缩放它和抖动它.每个相机渲染整个世界,所以每个视口是从自己视角的同一场景.少于 2 个标签或标签已在使用时失败(什么都不创建).

自 v0.4.1(2026-06-20).

```lua
camera:split({'top', 'bottom'})   -- 两个堆叠视口
camera:follow('top', 'p1')
camera:follow('bottom', 'p2')

-- 4 玩家四路：
-- camera:split({'tl', 'tr', 'bl', 'br'})
```

### camera:clone(sourceTag, tag, x, y, width, height, layer)

参数：
- `sourceTag`(String)——要复制 zoom / bgColor 的现有相机
- `tag`(String)——新相机标签(必须未使用)
- `x`(Number)——视口 x(px)
- `y`(Number)——视口 y(px)
- `width`(Number)——视口宽度(px)
- `height`(Number)——视口高度(px)
- `layer`(String?)——`'ui'` / `'hud'` 或 `'world'` / `'game'`——标记为的宽屏层(仅宽屏构建)

返回：Bool

在显式视口矩形处创建相机,从 `sourceTag` 复制 `zoom`/`bgColor`,并将其直接插入源上方的渲染顺序中.与 `camera:split`(为你平铺)不同,这在任何地方放置一个相机——小地图和画中画和安全视图——仍然从自己的滚动/缩放渲染整个世界.

```lua
camera:clone('game', 'minimap', 980, 40, 260, 180)
camera:zoom('minimap', 0.25)
camera:follow('minimap', 'boyfriend')
```

### camera:view(source, tag, x, y, width, height)
*自 v0.7.3*

参数：
- `source`(String)——再次显示的相机,例如 `game`
- `tag`(String)——新视图相机的标签
- `x`(Number)——屏幕上的左边缘,以 1280×720 为单位
- `y`(Number)——屏幕上的顶边缘
- `width`(Number)——视图宽度
- `height`(Number)——视图高度

返回：Bool

向同一场景添加第二个窗口.绘制到 `source` 的所有内容也在这里绘制,包括稍后创建的对象,但视图有自己的屏幕位置和滚动和跟随目标和缩放.像任何相机一样移动和调整大小或补间它(`camera:screenPos`和`camera:size`和`camera:follow`和`tw:any(..., 'camera.TAG', ...)`).用于分屏：用 `camera:size` 裁剪源并在旁边放一个视图.移除任一相机都会取消视图链接.

```lua
camera:size('game', 640, 720)
camera:view('game', 'right', 640, 0, 640, 720)

camera:follow('game', 'dad')
camera:follow('right', 'boyfriend')

tw:any('rightIn', 'camera.right', {x = 640}, 0.6, 'expoOut')
```

### camera:unview(tag)
*自 v0.7.3*

参数：
- `tag`(String)——用 `camera:view` 制作的视图相机

返回：Bool

停止视图显示其源.相机保持为空,直到你移除它或自己把对象放上去.如果相机不是视图则返回 `false`.

```lua
camera:unview('right')
camera:remove('right')
```

### camera:copy(tag, types, sourceTag)
*自 v0.7.3*

参数：
- `tag`(String)——复制的相机
- `types`(String|Table?)——复制什么：`shaders`和`zoom`和`angle`和`alpha`和`color`和`scroll`和`shake`和`flash`和`fade` 或 `all`.像 `'zoom, angle'` 或 `{'zoom', 'angle'}` 的列表.省略以复制一切 [默认 all]
- `sourceTag`(String?)——从哪个相机复制.省略以让视图复制其源相机

返回：Bool

每帧保持相机的部分与另一个相机相同.用相同源再次调用添加更多类型.`shaders` 复制整个着色器列表和你设置或补间的值,而每个相机保持自己的分辨率,所以效果适合更小的分屏视图.`shake`和`flash` 和 `fade` 复制源上已运行的效果.复制着色器时,相机自己的着色器被隐藏.

```lua
camera:view('game', 'right', 640, 0, 640, 720)
camera:copy('right', 'shaders, shake, flash')
shader:vignette('game', 0.6)
```

### camera:uncopy(tag, types)
*自 v0.7.3*

参数：
- `tag`(String)——复制的相机
- `types`(String|Table?)——停止复制什么,与 `camera:copy` 相同名称.省略以停止一切 [默认 all]

返回：Bool

停止复制给定类型.当着色器停止被复制时,相机收回自己的着色器.如果相机没有复制任何东西则返回 `false`.

```lua
camera:uncopy('right', 'shake')
camera:uncopy('right')
```

### camera:mirror(sourceTag, targetTags)

参数：
- `sourceTag`(String)——其对象要重新路由的相机
- `targetTags`(Table)——改为在这些相机标签上绘制那些对象的标签数组

返回：Bool

对于当前绘制在 `sourceTag` 上的每个精灵,用 `targetTags` 替换其相机列表——一次移动整个场景而不是按标签调用 `sprite:camera`.在 `camera:clone` / `camera:split` 之后很方便.仅影响调用时存在的对象.

```lua
camera:clone('game', 'mirror', 0, 360, 1280, 360)
camera:mirror('game', {'mirror'})   -- 同一场景,第二个视口
```

### camera:bind(tag)

参数：
- `tag`(String)——分配给现有默认相机的标签(必须未使用)

返回：Bool

标记状态的现有默认相机——每个精灵已经渲染到的——所以你可以驱动它(缩放和跟随和抖动……)而不添加第二个相机.覆盖如 HUD 使用 `camera:add` 代替.如果标签被占用则失败.

```lua
camera:bind('game')   -- 驱动世界相机
camera:add('hud')     -- 单独的 UI 叠加层
sprite:camera('hpText', 'hud')
```

### camera:remove(tag)

参数：
- `tag`(String)——相机标签

返回：Bool

从堆栈移除相机,销毁它,并释放其标签.之前路由到它的精灵回退到默认相机.

```lua
camera:remove('hud')
```

### camera:main(tag)

参数：
- `tag`(String)——相机标签

返回：Bool

使此相机成为默认绘制目标,所以新创建的未显式路由的精灵通过它渲染.

```lua
camera:add('world', 1)
camera:main('world')
```

### camera:immune(tag, on)
*自 v0.6.0*

参数：
- `tag`(String)——相机标签
- `on`(Bool?)——相机是否应在状态切换中存活 [默认 true]

返回：Bool

状态切换通常在新状态构建自己的之前移除每个相机.`immune` 相机被跳过：它继续渲染,保持其在堆栈中的位置并保留绘制在它上的任何东西.用于应在创建它的状态之后存活的 HUD 或调试叠加层.

```lua
camera:add('hud')
camera:immune('hud', true)   -- 从现在起在 state:change() 中存活
```

### camera:isImmune(tag)
*自 v0.6.0*

参数：
- `tag`(String)——相机标签

返回：Bool

如果相机被 `camera:immune` 标记则返回 `true`.

```lua
if not camera:isImmune('hud') then camera:immune('hud') end
```

### camera:count()
*自 v0.5.4*

返回：Int

返回堆栈中当前有多少相机——与 `camera:order` 一起方便(前索引是 `count - 1`).

```lua
local top = camera:count() - 1
camera:order('hud', top)
```

### 绘制顺序

### camera:order(tag, index)
*自 v0.5.4*

参数：
- `tag`(String)——相机标签
- `index`(Int?)——堆栈中的新位置：`0` 是后面,越高越靠近前面.钳制到有效范围.省略以只读当前索引

返回：Int

获取或设置相机在绘制堆栈中的位置；更高索引绘制在更低之上.没有 `index` 时返回相机当前位置；有一个时,将相机移到那里并返回结果索引.如果标签未知则返回 `-1`.

```lua
local i = camera:order('hud')       -- 读取当前位置
camera:order('hud', camera:count() - 1)   -- 将 HUD 放在顶部
```

### camera:toFront(tag)
*自 v0.5.4*

参数：
- `tag`(String)——相机标签

返回：Bool

将相机移到堆栈前面,使其绘制在所有其他相机之上.`camera:order(tag, camera:count() - 1)` 的简写.

```lua
camera:toFront('hud')
```

### camera:toBack(tag)
*自 v0.5.4*

参数：
- `tag`(String)——相机标签

返回：Bool

将相机移到堆栈后面,使其他每个相机绘制在它之上.`camera:order(tag, 0)` 的简写.

```lua
camera:toBack('background')
```

### camera:moveUp(tag, steps)
*自 v0.5.4*

参数：
- `tag`(String)——相机标签
- `steps`(Int?)——向前面移动多少位置 [默认 1]

返回：Bool

将相机在堆栈上(向前面/顶部)微调 `steps` 个位置.在前面钳制.

```lua
camera:moveUp('hud')       -- 向前一步
camera:moveUp('hud', 2)    -- 向前两步
```

### camera:moveDown(tag, steps)
*自 v0.5.4*

参数：
- `tag`(String)——相机标签
- `steps`(Int?)——向后面移动多少位置 [默认 1]

返回：Bool

将相机在堆栈下(向后面/其他后面)微调 `steps` 个位置.在后面钳制.

```lua
camera:moveDown('overlay')
```

### 缩放和滚动和旋转

### camera:zoom(tag, zoom)

参数：
- `tag`(String)——相机标签
- `zoom`(Number)——缩放乘数(1 = 无缩放)

返回：Bool

设置相机缩放.对于内置 `'game'`/`'hud'` 相机,这也会移动 PlayState 自己的目标缩放,所以它粘住——那两个否则每帧会向该目标缓动回来(节拍碰撞和重启等),这以前会在大约一秒内将普通缩放拉回.任何其他相机(`camera:add`)没有这种拉力,作为普通永久值设置.与 `tw:any` 组合或每帧在 `onUpdate` 中设置以获得平滑缩放.

```lua
camera:zoom('world', 1.25)

-- 'game' 现在粘住而不是自行缓动回 1.0
camera:zoom('game', 1.15)
```

### camera:scroll(tag, x, y, duration, ease)

参数：
- `tag`(String)——相机标签
- `x`(Number)——滚动 X(世界像素)
- `y`(Number)——滚动 Y(世界像素)
- `duration`(Number?)——滑到那里的秒数.`0` 或省略立即跳转 v0.7.3 [默认 0]
- `ease`(String?)——滑动的缓动名称 [默认 'linear']

返回：Bool

设置相机的滚动位置.有 `duration` 时平滑平移那里；平移是补间 `'camera.TAG.scroll'`,所以 `tw:cancel`和`tw:completed` 和冻结在它上工作,新的 `camera:scroll` 替换运行中的平移.对于更花哨的,直接补间路径：`tw:any('pan', 'TAG.scroll', {x = 200}, 1, 'sineInOut')`.如果相机跟随目标,这没有持久效果——跟随 lerp 下一帧拉回它(并记录诊断).先调用 `camera:unfollow` 获得手动控制,或使用 `camera:followOffset` 平移被跟随的相机(像 `'game'`)而不与跟随对抗.

```lua
camera:scroll('world', 200, 0)
camera:scroll('world', 600, 0, 2, 'sineInOut')

-- 'game' 默认跟随 boyfriend/dad/girlfriend - 这会被拉回
-- 并记录诊断；使用 followOffset 代替(见下文)
camera:followOffset('game', 0, -60)
```

### camera:size(tag, width, height)

参数：
- `tag`(String)——相机标签
- `width`(Number)——视口宽度(像素)
- `height`(Number)——视口高度(像素)

返回：Bool

调整相机的视口大小——它占据屏幕多少.小于窗口制作子视图(小地图和分屏和画中画).调整大小后重新瞄准跟随,因为死区从相机维度派生.

```lua
-- 角落的 320x240 画中画
camera:add('mini')
camera:size('mini', 320, 240)
camera:screenPos('mini', 940, 20)
```

### camera:screenPos(tag, x, y)

参数：
- `tag`(String)——相机标签
- `x`(Number)——屏幕上视口 X(像素)
- `y`(Number)——屏幕上视口 Y(像素)

返回：Bool

在屏幕上移动相机的视口——这是屏幕上的矩形,不是世界滚动(世界使用 `camera:scroll` / `camera:follow`).在不持续缩放或旋转的相机上最可靠.

```lua
camera:screenPos('mini', 940, 20)
```

### camera:screenOffset(tag, x, y)

参数：
- `tag`(String)——相机标签
- `x`(Number)——水平屏幕空间微调,像素
- `y`(Number)——垂直屏幕空间微调,像素

返回：Bool

一个加法屏幕空间偏移,与信箱居中组合而不是替换它——写 `viewportOffsetX/Y` 而不是绝对 `x`/`y`,所以每帧摇摆或抖动不会覆盖宽屏居中的基础位置.(每帧驱动 `camera:screenPos` 会在调整大小时将 UI 相机弹到边缘.)用于抖动/摇摆；仅用 `screenPos` 设置绝对视口原点.需要 `FreakCamera`(`camera:add` 创建的)——在普通绑定相机上失败.

```lua
function onUpdate(elapsed)
    local sway = util:sin(game:get('songTime') / 200) * 6
    camera:screenOffset('hud', sway, 0)
end

camera:screenOffset('hud', 0, 0)  -- 重置
```

### camera:widescreen(tag, on)
*自 v0.6.0*

参数：
- `tag`(String)——相机标签
- `on`(Bool)——此相机是否允许扩展到填充超宽窗口

返回：Bool

切换此相机是加宽以填充超宽窗口还是保持其设计宽度的信箱模式,并立即重新应用当前窗口尺寸,所以变化无需等待调整大小即可见.世界/游戏相机通常想要这个开启；固定大小叠加层(小地图和画中画)通常想要关闭.

```lua
camera:widescreen('game', true)    -- 随超宽窗口增长
camera:widescreen('minimap', false) -- 不管窗口宽度保持固定大小
```

### camera:aspectCentering(tag, on)
*自 v0.7.2*

参数：
- `tag`(String)——相机标签
- `on`(Bool)——`true` 保持相机在窗口中居中；`false` 留在它所在处

返回：Bool

在可见窗口区域中居中相机并在窗口调整大小时保持在那里.与 `camera:size` 一起使用以在屏幕中间显示较小的视图,例如 4:3.`camera:screenPos` 关闭居中.

```lua
camera:size('game', 1024, 768)
camera:aspectCentering('game', true)
```

### camera:fit(tag, on)
*自 v0.7.3*

参数：
- `tag`(String)——相机标签
- `on`(Bool)——`true` 缩放相机以填充窗口；`false` 回到缩放 1

返回：Bool

将用 `camera:size` 制作的相机尽可能放大以填充窗口而不裁剪,并居中.相机保持显示相同的场景区域,只是更大,所以 4:3 视图填充 4:3 窗口而不是显示更多舞台.只在窗口形状不同的侧面出现条.窗口调整大小时更新.

```lua
camera:size('game', 1024, 768)
camera:aspectCentering('game', true)
camera:fit('game', true)
```

### camera:scale(tag, value)
*自 v0.7.3*

参数：
- `tag`(String)——相机标签
- `value`(Number?)——相机的屏幕缩放.省略以读取当前值

返回：Number

设置相机在屏幕上绘制多大,在窗口缩放之上.与 `camera:zoom` 不同,相机的盒子随之增长,所以它以更大大尺寸显示相同区域.设置值会关闭 `camera:fit`.返回当前缩放.

```lua
camera:scale('game', 1.25)
print(camera:scale('game'))
```

### camera:angle(tag, deg, pivotX, pivotY)

参数：
- `tag`(String)——相机标签
- `deg`(Number)——旋转(度)
- `pivotX`(Number?)——枢轴 X 作为视图的分数(`0` 左 … `1` 右).默认 `0.5`(中心)[默认 0.5]
- `pivotY`(Number?)——枢轴 Y 作为视图的分数(`0` 顶 … `1` 底).默认 `0.5`(中心)[默认 0.5]

返回：Bool

围绕枢轴旋转相机内容,而不是相机矩形本身——渲染画布上的变换矩阵,所以框架保持原位,只有场景倾斜(以前整个相机精灵旋转,留下倾斜边缘).抖动和缩放在倾斜时继续工作.

游戏暂停或冻结时以及窗口失去焦点时角度保持 v0.7.7.要像以前那样在那时拉直相机,`game:set('freezeFlattenAngle', true)`.

```lua
camera:angle('world', 5)            -- 5° 倾斜,枢轴在中心
camera:angle('world', -8, 0.5, 1)   -- 枢轴在底边缘
camera:angle('world', 0)            -- 回到水平
```

### camera:skew(tag, x, y, pivotX, pivotY)
*自 v0.7.7*

参数：
- `tag`(String)——相机标签
- `x`(Float)——水平倾斜(度)：顶部和底部分开滑动
- `y`(Float?)——垂直倾斜(度)[默认 0]
- `pivotX`(Float?)——保持原位的点,0 左 … 1 右 [默认 0.5]
- `pivotY`(Float?)——0 顶 … 1 底 [默认 0.5]

返回：Bool

倾斜整个相机视图.与 `camera:angle` 和缩放一起工作,边缘保持填充.

```lua
camera:skew('game', 10)
tw:any('slant', 'game', {skewX = 0}, 0.5, 'expoOut')
```

### camera:matrix(tag, a, b, c, d, tx, ty)
*自 v0.7.7*

参数：
- `tag`(String)——相机标签
- `a`(Float?)——水平缩放 [默认 1]
- `b`(Float?)——垂直剪切 [默认 0]
- `c`(Float?)——水平剪切 [默认 0]
- `d`(Float?)——垂直缩放 [默认 1]
- `tx`(Float?)——向右移动,像素 [默认 0]
- `ty`(Float?)——向下移动,像素 [默认 0]

返回：Bool

在缩放和角度和剪切之上对相机应用任何 2D 变换,围绕同一枢轴.点移动到 `(a·x + c·y + tx, b·x + d·y + ty)`.只用标签调用以移除它.

```lua
camera:matrix('game', 1, 0.1, -0.2, 0.9)
-- 回到正常
camera:matrix('game')
```

### camera:tilt(tag, deg, duration, ease, pivotX, pivotY)

参数：
- `tag`(String)——相机标签
- `deg`(Number)——目标角度(度)
- `duration`(Number)——秒.`0` 立即设置
- `ease`(String?)——FlxEase 名称(例如 `quadOut`).默认线性
- `pivotX`(Number?)——枢轴 X,视图的 0..1.默认 0.5 [默认 0.5]
- `pivotY`(Number?)——枢轴 Y,视图的 0..1.默认 0.5 [默认 0.5]

返回：Bool

将相机倾斜(内容旋转)从其当前角度平滑缓动到 `deg`.取消该相机上已运行的任何倾斜.使用与 camera:angle 相同的内容旋转,所以框架保持原位.

```lua
camera:tilt('world', 6, 0.4, 'quadOut')   -- 倾斜
camera:tilt('world', 0, 0.4, 'quadIn')     -- 拉直
```

### camera:tiltBump(tag, deg, duration, ease)

参数：
- `tag`(String)——相机标签
- `deg`(Number)——踢的峰值角度
- `duration`(Number)——总秒数(出和回到 0)
- `ease`(String?)——FlxEase 名称.默认线性

返回：Bool

将倾斜踢到 `deg` 并缓动回水平——一次性倾斜.从节拍驱动它获得微妙的律动.

踢从相机的当前角度开始并回到它,所以用 `camera:tilt` 倾斜的相机保持其倾斜,每拍踢不会漂移 v0.7.7.

```lua
function onBeat(beat)
    if beat % 2 == 0 then camera:tiltBump('world', 3, 0.3, 'sineOut') end
end
```

### 锁定和冻结

两种相关但不同的方式将相机保持在原位：

| | 保持 | 效果(抖动/闪烁/淡出/缩放) | 每轴 |
|---|---|---|---|
| lock | 仅滚动位置 | 继续运行 | 是(x / y / 两者) |
| freeze | 滚动和所有效果进度 | 暂停(时间停止) | 否 |

锁将滚动钉在当前位置(或你说的地方)并胜过你自己的写入——甚至 `game:set('cam.main.scroll.x', …)` 每帧被重新断言.相机仍然可以抖动和淡出和在自由轴跟随和缩放.冻结使整个相机停止,包括飞行中的抖动.两者在窗口调整大小 / 宽屏切换中存活(它们通过调整大小快照重新断言),所以被保持的相机保持原位.这些需要 Freak 相机(`camera:add` / `camera:bind`).

### camera:lock(tag, axes)

参数：
- `tag`(String)——相机标签
- `axes`(String?)——`'x'`和`'y'` 或省略为两者 [默认两者]

返回：Bool

将相机的滚动钉在它现在在给定轴上的位置.像抖动这样的效果继续运行.锁定一个轴以在另一个仍然滚动或跟随时保持它稳定,像垂直移动但从不侧向漂移的菜单.

```lua
camera:lock('song', 'x')      -- 无水平移动,垂直仍然滚动
camera:lock('main')           -- 两个轴
```

### camera:unlock(tag, axes)

参数：
- `tag`(String)——相机标签
- `axes`(String?)——`'x'`和`'y'` 或省略为两者 [默认两者]

返回：Bool

释放用 `camera:lock` 锁定的轴.跟随相机从它所在处缓动回其目标,无跳跃.

```lua
camera:unlock('song', 'x')
```

### camera:locked(tag)

参数：
- `tag`(String)——相机标签

返回：Bool

相机被 `camera:lock` 保持原位期间为真.未知标签返回 `false`.

```lua
if camera:locked('main') then
    camera:unlock('main')
end
```

### camera:lockAt(tag, x, y, axes)

参数：
- `tag`(String)——相机标签
- `x`(Number)——锁定到的滚动 x
- `y`(Number)——滚动 y
- `axes`(String?)——`'x'`和`'y'` 或省略为两者 [默认两者]

返回：Bool

像 `camera:lock`,但钉到特定滚动位置而不是当前位置.如果任一轴被锁定,`camera:locked(tag)` 返回 `true`.

```lua
camera:lockAt('main', 400, 200)
if camera:locked('main') then ... end
```

### camera:freeze(tag)

参数：
- `tag`(String)——相机标签

返回：Bool

暂停整个相机：滚动和每个效果(抖动和闪烁和淡出和跟随)停在它们所在处.与 `camera:lock` 不同,进行中的抖动停在中间运动.`camera:frozen(tag)` 告诉你它是否冻结.

```lua
camera:freeze('main')     -- 命中停止：此相机上一切暂停
timer:start('unfreeze', 0.1, function() camera:unfreeze('main') end)
```

### camera:unfreeze(tag)

参数：
- `tag`(String)——相机标签

返回：Bool

恢复用 `camera:freeze` 暂停的相机.效果从它们停止处继续.

```lua
if camera:frozen('main') then camera:unfreeze('main') end
```

### camera:frozen(tag)

参数：
- `tag`(String)——相机标签

返回：Bool

相机被 `camera:freeze` 暂停期间为真.未知标签返回 `false`.

```lua
if not camera:frozen('main') then
    camera:freeze('main')
end
```

### 跟随和偏移

`'game'` 相机总是跟随某物(见上面的 camera:focus)——默认是拥有当前段落的任何角色.因为它在跟随目标,`camera:scroll('game', x, y)` 不会像你预期的那样工作：跟随 lerp 在下一帧覆盖它(camera:scroll 自己的诊断警告相同的事情).这是你应该改用的.

| 你想要 | 立即 | 随时间缓动 |
|---|---|---|
| 相对于它跟随的任何人将视图左/右/上/下推 | `camera:followOffset('game', x, y)` | `tw:any(t, 'game', { ['targetOffset.x'] = x, ['targetOffset.y'] = y }, duration, ease)` |
| 倾斜屏幕上的内容 | `camera:angle('game', deg, [pivotX], [pivotY])` | `camera:tilt('game', deg, duration, ease, [pivotX], [pivotY])`(或 `camera:tiltBump` 用于倾斜再回 0 的踢)——它将设置枢轴与补间捆绑,通用的 `tw:any`/`tw:angle` 仅在 `angle` 上的调用做不到 |
| 冲击/缩放进出 | `camera:zoom('game', zoom)`(见其条目——它也移动 PlayState 的缩放目标,所以它粘住) | 不只是 `tw:any(t, 'game', { zoom = z }, duration, ease)` 单独——见下面的提示 |
| 将视图弹到特定位置完全无跟随 | `camera:unfollow('game')`,然后自由 `camera:scroll('game', x, y)` | `tw:any(t, 'game', { ['scroll.x'] = x, ['scroll.y'] = y }, duration, ease)` 在取消跟随后 |

`camera:followOffset` 在被跟随角色已经所在的位置之上是加法的——`{0, 0}` 正中心在他们上,负 `y` 向上推视图(显示他们下方更多),正 `x` 向右推(显示他们左边更多).一旦设置,偏移在正常每帧跟随中持续直到你更改或清除它.`camera:angle`/`tilt`/`tiltBump` 完全独立于跟随——它们围绕枢轴旋转渲染场景而不触及滚动,所以你可以同时偏移和倾斜游戏相机,各自按自己的时间表.

### camera:focus(who, snap | ease, duration)
*自 v0.6.5*

参数：
- `who`(String|Number)——`'player'`和`'opponent'`和`'girlfriend'` 或 `'default'`(回到跟随段落).别名和 `-1`..`2` 也工作.
- `snap | ease`(Bool|String?)——`true` 立即跳转那里.或缓动名称：`'linear'` 是通常的平滑跟随(Psych Engine 风格),`'instant'` 跳转,任何其他曲线像 `'quadOut'` 沿它移动相机.[默认 linear]
- `duration`(Number?)——曲线移动的秒数.linear 和 instant 不使用.[默认 0.6]

返回：Bool

更改游戏相机看向哪个角色.游戏相机跟随引擎每帧移动的内部点,不是角色精灵本身,所以用 `camera:focus` 做这个.`camera:follow('game', 'boyfriend')` 会将相机指向精灵并在歌曲剩余时间关闭焦点系统.与 `FocusCamera` 谱面事件工作相同.

```lua
camera:focus('player', true)             -- 直接跳到玩家
camera:focus('opponent')                 -- 平滑跟随,像 Psych Engine
camera:focus('player', 'quadOut', 0.8)   -- 在 0.8 秒内滑过去
camera:focus('default')                  -- 回到跟随段落
```

### camera:getFocus()
*自 v0.6.5*

返回：String

游戏相机现在看向谁：`'player'`和`'opponent'` 或 `'girlfriend'`.当相机跟随段落时,它报告拥有当前段落的一侧.仅在 `Camera Follow Pos` 事件将相机保持在固定点时返回 `'default'`.

```lua
if camera:getFocus() == 'player' then
    camera:zoom('game', 1.1)
end
```

### camera:followPos([x, y], [ease], [duration])
*自 v0.7.4*

参数：
- `x`(Number?)——看向的点,X
- `y`(Number?)——看向的点,Y
- `ease`(String?)——`'linear'`(平滑跟随)和`'instant'` 或像 `'sineInOut'` 的曲线.[默认 linear]
- `duration`(Number?)——曲线移动的秒数.[默认 0.6]

返回：Bool

`Camera Follow Pos` 谱面事件的 Lua 侧：将游戏相机保持在固定点直到你无坐标调用它.相同的缓动选项在事件本身中工作,作为其第三和第四个值；Psych Engine 谱面从未有它们,所以它们总是使用平滑跟随.

```lua
camera:followPos(900, 450)                    -- 平滑跟随到点
camera:followPos(900, 450, 'instant')         -- 跳转
camera:followPos(900, 450, 'cubeInOut', 1.2)  -- 滑行
camera:followPos(nil, nil, 'quadOut', 0.5)    -- 滑回角色
```

### camera:follow(tag, spriteTag, lerp, style)

参数：
- `tag`(String)——相机标签
- `spriteTag`(String)——要跟随的精灵标签
- `lerp`(Number)——跟随平滑(更低 = 更松,1 = 立即)[默认 0.04]
- `style`(String)——死区预设——见下表 [默认 lockon]

返回：Bool

使相机跟随标记的精灵,每帧向它平滑 `lerp`.`style` 选择死区预设：

| 名称 | 行为 |
|---|---|
| `lockon` | 保持目标正中心(默认). |
| `platformer` | 宽水平死区,更紧垂直——横版卷轴感觉. |
| `topdown` | 与视图大小相同的方形死区. |
| `tight` | 更小的方形死区(`topdown_tight`). |
| `screen` | 一次吸附一整个屏幕(`screen_by_screen`). |
| `loose` | 无死区(`nodeadzone`)——与 lockon 相同的居中但没有吸附预设. |

```lua
camera:follow('world', 'player', 0.08)
camera:follow('world', 'player', 0.08, 'platformer')
```

### camera:followOffset(tag, x, y)

参数：
- `tag`(String)——相机标签
- `x`(Number)——从目标的水平偏移(世界像素)
- `y`(Number)——从目标的垂直偏移(世界像素)

返回：Bool

偏移跟随点,使目标偏离中心——例如将玩家推向屏幕底部.跟随期间生效.专门平移游戏相机的正确方式：它已经有活动跟随目标(见 camera:focus),所以 `camera:scroll('game', …)` 下一帧就被覆盖,而此移动被跟随点本身.

```lua
camera:follow('world', 'player')
camera:followOffset('world', 0, -80)

-- 平移内置游戏相机而不与角色跟随对抗
camera:followOffset('game', 120, 0)
```

### camera:followLerp(tag, lerp)

参数：
- `tag`(String)——相机标签
- `lerp`(Number)——跟随平滑(更低 = 更松,1 = 立即)

返回：Bool

更改已在跟随的相机的跟随平滑,而不重新发出 `camera:follow`(那会重置死区).便于在动作期间使相机更紧,空闲时更松.

```lua
camera:followLerp('game', 0.2)
```

### camera:snap(tag)

参数：
- `tag`(String)——相机标签

返回：Bool

立即将相机跳到其跟随目标,跳过平滑.在状态进入后立即 `camera:follow` 后,或在传送目标后有用.如果相机没有目标则失败.

```lua
camera:follow('world', 'player')
camera:snap('world')
```

### camera:unfollow(tag)

参数：
- `tag`(String)——相机标签

返回：Bool

停止跟随当前目标,将相机留在它所在处.在 `camera:scroll` 生效之前需要.

```lua
camera:unfollow('world')
```

### camera:deadzone(tag, x, y, width, height)

参数：
- `tag`(String)——相机标签
- `x`(Number)——死区左边缘,以相机/屏幕像素为单位
- `y`(Number)——死区顶边缘,以相机/屏幕像素为单位
- `width`(Number)——死区宽度(像素)
- `height`(Number)——死区高度(像素)

返回：Bool

设置自定义跟随死区——目标可以移动的矩形,相机滚动之前——覆盖 `style` 的预设.在 `camera:follow` 之后调用它：`follow` 从其样式重建死区.如果显示,重绘 `camera:debug` 叠加层以匹配.

```lua
camera:follow('game', 'player', 0.1, 'platformer')
camera:deadzone('game', 480, 260, 320, 200)  -- 自定义盒
camera:debug('game')                          -- 看到它
```

### camera:centerDeadzone(tag, axis)

参数：
- `tag`(String)——相机标签
- `axis`(String)——`'x'`和`'y'` 或 `'xy'`(两者)[默认 'xy']

返回：Bool

沿所选轴在视口内重新居中相机的当前死区,保持死区大小.让你只用 `camera:deadzone` 设置大小并让引擎放置它.需要死区(先跟随相机或调用 `camera:deadzone`)；`camera:debug` 叠加层更新以匹配.

```lua
camera:follow('game', 'player', 0.1, 'platformer')
camera:deadzone('game', 0, 0, 320, 200)  -- 仅大小
camera:centerDeadzone('game', 'xy')      -- 在视图中居中它
camera:debug('game')
```

### camera:alignDeadzone(tag, halign, valign)

参数：
- `tag`(String)——相机标签
- `halign`(String)——`'left'`和`'center'` 或 `'right'` [默认 'center']
- `valign`(String)——`'top'`和`'center'` 或 `'bottom'` [默认 'center']

返回：Bool

在每个轴上将死区对齐到视口内,保持其大小——`centerDeadzone` 的通用形式.用它偏向相机：`bottom` 死区在目标上方保留更多空间(玩家向上看时好),`left` 死区显示右侧更多.需要死区；调试叠加层更新.

```lua
camera:deadzone('game', 0, 0, 320, 200)
camera:alignDeadzone('game', 'center', 'bottom')  -- 低,水平居中
camera:alignDeadzone('game', 'left', 'center')    -- 看到右侧更多
```

### camera:bounds(tag, x, y, width, height)

参数：
- `tag`(String)——相机标签
- `x`(Number)——可滚动世界区域的左边缘
- `y`(Number)——顶边缘
- `width`(Number)——世界区域宽度
- `height`(Number)——世界区域高度

返回：Bool

限制相机可以滚动多远,所以它永远不会显示关卡边缘之外.设置到你的世界矩形的边界.

```lua
camera:bounds('game', 0, 0, 1280, 720)
```

### camera:clearBounds(tag)

参数：
- `tag`(String)——相机标签

返回：Bool

移除 `camera:bounds` 设置的滚动边界,让相机再次自由滚动.

```lua
camera:clearBounds('game')
```

### camera:offScreen(tag, spriteTag)

参数：
- `tag`(String)——相机标签
- `spriteTag`(String)——要测试的精灵标签

返回：Bool

当精灵在此相机上不可见时返回 `true`——它不可见/已销毁(`visible=false` 或 `alpha<=0`)和相机隐藏和其 `cameras` 过滤器排除这个,或其边界不与视图重叠.`sprite:onScreen` 的严格逆.用于剔除屏幕外演员的 AI 更新或 VFX.

```lua
for _, e in ipairs(group:get('enemies')) do
  if camera:offScreen('game', e) then
    -- 跳过屏幕外敌人的 AI / 动画
  else
    -- 正常更新
  end
end
```

### camera:debug(tag, on, thickness)

参数：
- `tag`(String)——相机标签
- `on`(Bool)——`true` 显示叠加层,`false` 隐藏它 [默认 true]
- `thickness`(Number)——轮廓线宽(像素)[默认 2]

返回：Bool

绘制相机跟随死区的绿色轮廓——目标在相机滚动之前在其中移动的区域.便于调整 `camera:follow` 样式.用 `false` 再次调用以隐藏它.没有死区的相机(`loose` 样式)显示一个小中心标记代替.状态切换时自动清除.

```lua
camera:follow('game', 'player', 0.1, 'platformer')
camera:debug('game')            -- 默认 2px 轮廓
camera:debug('game', true, 5)   -- 更厚的 5px 轮廓
-- camera:debug('game', false)  -- 再次隐藏它
```

### 抖动和闪烁和颜色

### camera:shake(tag, intensity, duration)

参数：
- `tag`(String)——相机标签
- `intensity`(Number)——抖动强度(视图大小的分数)[默认 0.05]
- `duration`(Number)——持续时间(秒)[默认 0.5]

返回：Bool

抖动相机.强度是视图维度的分数,所以 `0.05` 是中等震动.

```lua
camera:shake('world', 0.02, 0.3)
```

### camera:flash(tag, color, duration)

参数：
- `tag`(String)——相机标签
- `color`(String)——十六进制颜色 [默认白色]
- `duration`(Number)——持续时间(秒)[默认 1]

返回：Bool

用纯色闪烁相机,在持续时间内淡出.

```lua
camera:flash('hud', 'FFFFFF', 0.4)
```

### camera:fade(tag, color, duration, fadeIn)

参数：
- `tag`(String)——相机标签
- `color`(String)——十六进制颜色 [默认黑色]
- `duration`(Number)——持续时间(秒)[默认 1]
- `fadeIn`(Bool)——`true` 从颜色淡到清晰；`false` 淡到颜色 [默认 false]

返回：Bool

将相机淡到(或从)纯色.在状态进入时使用 `fadeIn = true`,在过渡前使用 `false`.

```lua
camera:fade('hud', '000000', 0.5, true)
```

### camera:stopFX(tag)

参数：
- `tag`(String)——相机标签

返回：Bool

立即取消相机上进行中的任何 `shake`和`flash` 和 `fade`,立即清除它们的效果.在重启状态或提前中断过渡时方便.

自 v0.4.0(2026-06-16).

```lua
camera:stopFX('world')
```

### camera:color(tag, color)

参数：
- `tag`(String)——相机标签
- `color`(String)——十六进制颜色

返回：Bool

设置相机的背景填充.相机开始时透明；设置颜色使此相机在其精灵下方绘制全屏背景.

```lua
camera:color('world', '1A1A2E')
```

### camera:overlay(tag, color, alpha, blend)

参数：
- `tag`(String)——相机标签
- `color`(String)——叠加层的十六进制颜色
- `alpha`(Number?)——叠加层强度 / 不透明度,`0`..`1`.`0` 移除它 [默认 1]
- `blend`(String?)——混合模式：`normal`(alpha 混合)和`multiply`和`add`和`screen`和`subtract`和`overlay`和`hardlight`和`softlight`.最后三个读取背后场景——这是每精灵 blend:set 在原生上做不到的,所以这是获得它们的方式 [默认 normal]

返回：Bool

在相机绘制的所有内容上铺一层彩色色调——`camera:color`(绘制在精灵后面)的对应物.作为每个对象之上的后处理滤镜运行并尊重透明度：它给渲染内容着色但空区域保持清晰.`blend` 选择它如何与场景组合.与其他相机滤镜(分级和shader:*)堆叠.用 `camera:overlayClear` 或 `alpha` = `0` 移除.

```lua
camera:overlay('game', 'FF3333', 0.4)              -- 40% 红色洗
camera:overlay('game', 'FF3333', 0.6, 'multiply')   -- 更深,乘法色调
camera:overlay('game', '3355FF', 0.3, 'add')        -- 加法辉光
camera:overlayClear('game')
```

### camera:effects(tag, order)
*自 v0.7.5*

参数：
- `tag`(String)——相机标签
- `order`(Table?)——效果名称按它们应运行的顺序,例如 `{'blur', 'vignette'}`.省略以只读取列表；`{}` 回到调用顺序

返回：Table——相机当前运行顺序的效果

相机上的每个效果一个接一个运行,每个在前一个的结果之上,所以顺序改变外观：`{'blur', 'vignette'}` 在模糊图片上给出清晰的暗角,`{'vignette', 'blur'}` 也模糊暗角.效果按你添加的顺序运行,除非你在这里设置顺序.顺序从那时起保持,也用于之后添加或重新创建的效果；你未列出的效果在列出的之后运行.名称来自效果：`blur`和`vignette`和`flow`和`heat`和`rain`和`color`(来自 `filter:brightness`和`filter:contrast` 等的所有内容)和`overlay`和`perspective`,其余是着色器名称——读取列表查看它们.来自 `filter:blur(tag, strength, quality, true)` 的模糊放在下面相机的首位,所以它们自己的效果在它之上保持清晰.

```lua
shader:vignette('main', 0.8, 0.4)
filter:blur('main', 0.3)
print(camera:effects('main')[1])         -- 'vignette'(先添加)

camera:effects('main', {'blur', 'vignette'})   -- 先模糊,清晰暗角在上
camera:effects('main', {})                     -- 回到它们添加的顺序
```

### camera:overlayClear(tag)

参数：
- `tag`(String)——相机标签

返回：Bool

从相机移除颜色叠加层.

```lua
camera:overlayClear('game')
```

### camera:alpha(tag, a)

参数：
- `tag`(String)——相机标签
- `a`(Number)——不透明度 0–1

返回：Bool

设置相机的整体不透明度,淡出它绘制的所有内容.

```lua
camera:alpha('hud', 0.5)
```

### camera:visible(tag, on)

参数：
- `tag`(String)——相机标签
- `on`(Bool)——`true` 显示相机,`false` 完全隐藏它

返回：Bool

显示或隐藏整个相机.与 `camera:alpha(tag, 0)`(仍然合成,只是透明)不同,隐藏的相机在渲染中完全跳过——用它便宜地切换小地图或画中画视图的开关.

```lua
camera:visible('minimap', false)
camera:visible('minimap', true)
```

---

## 游戏函数

`game:get`和`game:set` 和读取及更改引擎状态的其他函数.变量本身按主题列在变量类别中.

### 路径如何解析

- 注册表命中——路径匹配像 `curBeat`和`score`和`downScroll` 的策划键.稳定和安全和推荐.

- 自定义变量——你之前用 `game:set("speed", 5)` 存储的单个键(无点).让你将自己的脚本值保存在一个共享位置.见下面的自定义变量.

- 标签行走——第一段是你注册的精灵/文本/任何东西的标签(`sprite:add`和`text:add`……).路径的其余部分钻入该对象的字段.这是你读写任何标签的任何属性的方式——`game:set("hero.x", 200)`和`game:set("title.alpha", 0)`和`game:get("title.text")`.

- 状态行走——以上都不是；路径针对当前 `FlxState` 行走.让你到达 `boyfriend.x`和`camHUD.zoom`和从 `PlayState` 可到达的任何东西.

注册表是引擎重构后保持稳定的.自定义变量在整个会话中持续.标签行走只要标签存在就稳定.状态行走是快速实验——如果引擎重命名字段,你的路径中断.所有变量,按主题排序：变量.

### 用 set 编辑标签和状态

`game:set` 不仅仅是引擎标志.你可以通过标签行走或状态行走到达的任何东西也可以写入——这就是反射回退的全部意义,也是大多数人第一次错过的部分.

| 你想改变什么 | 如何写 | 解析为 |
|---|---|---|
| 移动你用 `sprite:add("hero", …)` 添加的精灵 | `game:set("hero.x", 200)` | `Tag.get("hero").x = 200` |
| 淡出标签 | `game:set("hero.alpha", 0.3)` | `Tag.get("hero").alpha = 0.3` |
| 调整文本标签大小 | `game:set("title.size", 48)` | `Tag.get("title").size = 48` |
| 读取标签当前 X | `game:get("hero.x")` | `Tag.get("hero").x` |
| 标签上的嵌套字段 | `game:set("hero.scale.x", 2)` | `Tag.get("hero").scale.x = 2` |
| 状态上的内置角色 | `game:set("boyfriend.alpha", 0.5)` | `PlayState.boyfriend.alpha = 0.5`(状态行走,因为 `boyfriend` 不是标签) |
| 相机属性 | `game:set("camHUD.zoom", 1.2)` | `PlayState.camHUD.zoom = 1.2` |

解析规则：第一段首先对照标签注册表检查.如果存在该名称的标签,路径的其余部分钻入它；否则路径行走当前状态.这意味着名为 `"boyfriend"` 的标签会遮蔽 `PlayState.boyfriend`——不要重用引擎字段名作为标签名,除非你是故意的.

类型检查.`game:set` 拒绝改变字段持有的类型：数字保持数字,字符串保持字符串,对象保持相同类的对象.写 `game:set("FlxG.cameras.list", "x")` 以前会成功并在下一帧崩溃游戏；现在跳过并带警告命名脚本行.`nil` 仍然允许.v0.7.2

### game:get(path, default)

参数：
- `path`(String)——注册表键和自定义变量和`tag.field…` 或状态路径
- `default`(Any?)——当值将是 `nil` 时返回(路径未解析或从未设置).省略以获得纯 `nil`

返回：*any | nil*

返回 `path` 处的值,按顺序尝试注册表和自定义变量和标签行走和状态行走.如果都不解析或 `path` 为空则返回 `nil`,除非你传递 `default`——对于脚本稍后设置的值很方便,所以读取永不命中 `nil`：`game:get('styleNeed', 250)`.

```lua
-- 1. 注册表
print(game:get("curBeat"))        -- 例如 12
print(game:get("songName"))       -- 例如 "test"

-- 2. 自定义变量(之前用 game:set 存储)
game:set("speed", 8)
print(game:get("speed"))          -- 8

-- 3. 标签行走——从你注册的精灵/文本读取
sprite:add("hero", "char/hero")
print(game:get("hero.x"))         -- 例如 100
print(game:get("hero.alpha"))     -- 例如 1

-- 4. 状态行走——从 PlayState 可到达的任何东西
print(game:get("boyfriend.x"))    -- 例如 770
print(game:get("camHUD.zoom"))    -- 例如 1.0

-- 默认——对尚未设置的值永不返回 nil
print(game:get("combo", 0))       -- 0 直到某些东西设置它
```

### game:set(path, value)

参数：
- `path`(String)——注册表键和自定义变量和`tag.field…` 或状态路径
- `value`(any)——要写入的值

返回：Bool

在 `path` 处写 `value`,与 `game:get` 相同的四种方式解析——可写注册表键和自定义变量和标签字段或状态字段.成功时返回 `true`,路径无法解析或注册表键只读(`maxCombo`和`accuracy` 等)时返回 `false`.

```lua
-- 注册表
game:set("score", 5000)
game:set("ghostTapping", false)
game:set("downScroll", true)

-- 自定义变量：存储在会话范围映射中,任何脚本可读
game:set("speed", stats.speed)

-- 标签字段(这是大多数人错过的那个)
sprite:add("hero", "char/hero", 100, 100)
game:set("hero.x", 300)              -- 移动标记的精灵
game:set("hero.alpha", 0.5)          -- 淡出它
game:set("hero.scale.x", 2)          -- 嵌套字段,正常工作

text:add("title", "hello", 20, 20)
game:set("title.text", "goodbye")    -- 实时编辑文本内容
game:set("title.size", 48)

-- 状态字段
game:set("boyfriend.alpha", 0.5)
game:set("camHUD.zoom", 1.2)
```

### game:has(path)

参数：
- `path`(String)——注册表键和自定义变量和`tag.field…` 或状态路径

返回：Bool

如果任何查找(注册表和自定义变量和标签行走和状态行走)产生非 `nil` 值则返回 `true`.用它保护跨多个状态运行的脚本——例如在菜单中触碰 `boyfriend` 之前检查它存在,或在设置标签上的字段之前检查标签已添加.

```lua
if game:has("boyfriend") then
    tw:alpha("bfFade", "boyfriend", 0, 1)
end

if game:has("hero") then
    game:set("hero.alpha", 0.5)
end
```

### game:clearVars()
*自 v0.5.4*

返回：Bool

清除每个自定义变量(用 `game:set` 存储的单个键值)——注册表键和标签和状态字段不受影响.自定义变量在整个会话中跨状态切换持续,所以没有东西自行清除它们；调用此获得干净状态,或 `game:clearVar` 只丢弃一个.

```lua
game:set("runScore", 12000)
-- ... 之后,开始新运行：
game:clearVars()
print(game:get("runScore"))   -- nil
```

### game:clearVar(path)
*自 v0.5.4*

参数：
- `path`(String)——要移除的自定义变量键

返回：Bool

移除单个自定义变量,其余保持不变.之后 `game:get` 该键返回 `nil`(或你传递的 `default`).

```lua
game:clearVar("combo_multiplier")
```

### game:worldBounds(x, y, width, height)

参数：
- `x`(Float)——世界左边缘,世界像素
- `y`(Float)——世界顶边缘,世界像素
- `width`(Float)——世界宽度(必须 ≥ 1)
- `height`(Float)——世界高度(必须 ≥ 1)

返回：Bool

设置 Flixel 物理操作的矩形区域(`FlxG.worldBounds`).对象仅在这些边界内被考虑碰撞/重叠,所以在大型关卡上你应该将世界调整到关卡而不是保留默认.如果 `width` 或 `height` 低于 1 则返回 `false`(带诊断).在你调用此之前默认实际上无界.

```lua
-- 将世界匹配到 4000x2000 关卡
game:worldBounds(0, 0, 4000, 2000)
```

### game:clearWorldBounds()

返回：Bool

将世界边界重置为实际上无界的区域,撤销之前的 `game:worldBounds`.在离开有界关卡时调用它,以便下一状态的物理不被裁剪到旧矩形.

```lua
game:clearWorldBounds()
```

### game:freeze([pauseSounds = true])

参数：
- `pauseSounds`(Bool)——是否也暂停当前播放的音效(默认 true).传递 false 让它们继续可听.

返回：Bool

冻结世界：每个当前活动的补间和计时器和(除非 `pauseSounds` 为 false)音效停止推进,当前状态中的每个对象被挂起(见 `suspended`).你调用此之后创建的任何东西——新补间和计时器或精灵——正常运行,因为在调用时刻已经存在的才被冻结.这与 `song:pause()` 内部使用的冻结相同,单独暴露以便你可以在不也使伴奏/声乐静音的情况下保持场景静止.

```lua
game:freeze(false) -- 冻结世界,让音效继续播放
song:fadeOut('inst', 2)
```

### game:set(path .. '.suspended', on)
*自 v0.7.3*

参数：
- `path`(String)——对象路径：标签(`'enemy'`),或 `'tween.TAG'`和`'timer.TAG'`和`'sound.TAG'`和`'camera.TAG'`
- `on`(Bool)——`true` 停止它,`false` 让它继续

返回：Bool

冻结一个东西而不触及场景其余部分.被挂起的精灵和文本和组或粒子发射器停止更新但留在屏幕上；其子级保持原样.被挂起的补间或计时器保持其进度,声音暂停并从同一点恢复,相机停止跟随和抖动和淡出.用 `game:get` 读回它.

```lua
game:set('enemy.suspended', true)
game:set('tween.enemyX.suspended', true)
game:set('timer.enemyIdle.suspended', true)
game:set('sound.hurt.suspended', true)
game:set('camera.ui.suspended', true)

if game:get('enemy.suspended') then
    game:set('enemy.suspended', false)
end
```

### game:thaw()

返回：Bool

反转 `game:freeze()`：重新激活它冻结的任何补间和计时器和声音和对象.如果世界当前未冻结则返回 `false`.

```lua
game:freeze()
-- 冻结后创建的计时器仍然运行,所以它可以结束它
timer:start('hitstop', 0.15, function()
    game:thaw()
end)
```

---

## 音符线 / 音符函数

`strum` 命名空间移动接收器(音符落入的箭头)——一次整个车道或单个箭头.音符和长条尾部每帧跟随其接收器,所以一旦你移动一个音符线,滚动到它的一切都免费跟随.

### 方向和侧

每个音符属于一个侧和一个方向.

侧——传递 `'player'`(右下音符线,你的音符)或 `'opponent'`(左音符线).数字也工作：`1` = 玩家,`0` = 对手.别名 `'bf'`和`'dad'`和`'enemy'`和`'cpu'` 也接受.

方向是 `0`–`3`,始终按此顺序：

| 值 | 箭头 |
|---|---|
| `0` | 左 |
| `1` | 下 |
| `2` | 上 |
| `3` | 右 |

这是到处使用的相同顺序：音符皮肤数组(`notes`和`noteAngles`和`noteOffsets`)和`onNoteHit` 回调和这些函数.

### strum:move(side, x, y)

参数：
- `side`(String|Number)——`'player'`/`1` 或 `'opponent'`/`0`
- `x`(Number)——最左接收器的新基础 x(左上角)
- `y`(Number)——音符线行的新基础 y

返回：Bool

将整个车道(所有四个接收器)移动到新的基础位置.车道保持其间距；落入它的音符跟随.仅在歌曲内有效.

```lua
-- 将玩家的音符线推到屏幕中心
strum:move('player', 490, 50)

-- 读取车道当前所在位置
local ox, oy = strum:x('opponent'), strum:y('opponent')
```

### strum:moveBy(side, dx, dy)

参数：
- `side`(String|Number)——哪个音符线
- `dx`(Number)——X 上移动的像素(相对)
- `dy`(Number)——Y 上移动的像素(相对)

返回：Bool

与 `strum:move` 相同但相对于当前位置——便于从 `onUpdate` 偏移微调或驱动车道.

```lua
-- 随节拍轻轻摆动
strum:moveBy('player', 0, math.sin(game:get('songTime') / 200) * 4)
```

### strum:moveNote(side, direction, x, y)

参数：
- `side`(String|Number)——哪个音符线
- `direction`(Number)——`0`–`3`(左 / 下 / 上 / 右)
- `x`(Number)——该单个接收器的新左上 x
- `y`(Number)——该单个接收器的新左上 y

返回：Bool

移动一个接收器.其音符和长条跟随.用于分割车道和弯曲排列或每箭头效果.之后车道上的 `strum:move`/`strum:reset` 覆盖它.

```lua
-- 将四个玩家箭头扇开
for d = 0, 3 do
  strum:moveNote('player', d, 700 + d * 150, 50 + d * 20)
end
```

### strum:camera(side, camTag)
*自 v0.5.4*

参数：
- `side`(String|Number)——哪个音符线(`'player'`/`'opponent'` 或 `1`/`0`)
- `camTag`(String?)——将此侧移动到的相机标签.省略(或 `'hud'`/`'default'`)重置到 HUD 相机

返回：Bool

将整个侧——接收器和下落音符和长条尾部——移动到另一个相机.音符是池化共享的,所以现有下落音符立即重新分配,新的自动路由到那里.它们每帧继续跟随其接收器,所以通过相机滚动/缩放跟踪仍然工作.

v0.6.8 歌曲重启重置它：`song:restart` 将每侧放回 HUD 相机,像其他音符线设置一样.如果车道应留在自己的相机上,从 `onSongStart`(重启时也触发)重新应用它——否则你相对于相机上音符排序的任何东西最终绘制在它们上面.

```lua
-- HUD 上方的相机用于玩家车道
camera:add('pnotes', 1, 'hud')
strum:camera('player', 'pnotes')

-- 现在整个玩家车道可以独立移动/缩放
camera:zoom('pnotes', 1.15)

-- 放回 HUD
strum:camera('player')

-- 跨重启保持
function onSongStart(name)
    strum:camera('player', 'pnotes')
end
```

### 找到音符的绘制顺序

想要精灵就在接收器或下落音符后面？见 Sprite Functions 页面的 `order:*`——接收器和长条尾部和音符标记为 `'opponentStrums'`/`'opponentReceptors'`和`'playerStrums'`/`'playerReceptors'`和`'holds'`和`'notes'`,所以 `order:get` / `order:set` 可以直接定位它们.

### strum:alpha(side, direction, a)

参数：
- `side`(String|Number)——哪个音符线
- `direction`(Number)——`0`–`3` 为一个车道,或 `-1` 为所有四个
- `a`(Number)——Alpha 0–1

返回：Bool

设置车道音符和长条尾部的 alpha.在音符重生中保持,与 `game:set('playerStrums.alpha', …)` 相同——无需自己遍历 `notes.members`.

```lua
-- 只淡出玩家的 UP 车道
strum:alpha('player', 2, 0.3)

-- 一次调暗每个玩家车道
strum:alpha('player', -1, 0.5)

-- 而不是旧的手动循环：
--   while game:get('notes.members.'..j) ~= nil do ... game:set(...) end
```

### strum:visible(side, direction, on)

参数：
- `side`(String|Number)——哪个音符线
- `direction`(Number)——`0`–`3` 为一个车道,或 `-1` 为所有四个
- `on`(Bool)——显示(`true`)或隐藏(`false`)

返回：Bool

显示 / 隐藏车道的音符和长条.像 `strum:alpha`,它在重生中存活并与整个侧的 `game:set('playerStrums.visible', …)` 切换堆叠.

```lua
strum:visible('opponent', 1, false)   -- 隐藏对手 DOWN 音符
```

### strum:noteColor(side, direction, color)

参数：
- `side`(String|Number)——哪个音符线
- `direction`(Number)——`0`–`3` 为一个车道,或 `-1` 为所有四个
- `color`(String?)——十六进制色调(`RRGGBB`).省略 / `'FFFFFF'` = 无色调

返回：Bool

车道下落音符 + 长条的持久色调——不像活动音符上的 color:*(池化音符回收时被擦除),这会重新应用到车道中生成的每个音符.整个侧的形式是 `game:set('playerStrums.noteColor', 'FF4466')`.用 `strum:tint` 改为给接收器着色.

```lua
strum:noteColor('player', -1, 'FF66CC')   -- 所有玩家音符粉色
strum:noteColor('opponent', 2, '66CCFF')  -- 仅对手 UP
strum:noteColor('player', -1)             -- 回到正常
```

### strum:fade(side, a)

参数：
- `side`(String|Number)——哪个音符线
- `a`(Number)——Alpha 0–1

返回：Bool

一次调用淡出整个侧的下落音符和长条和接收器箭头——音符半部分是 `playerStrums.alpha`,接收器半部分是 `receptorAlpha(-1)`.当你想要一侧的一切一起调暗时使用这个；当你想要它们分开时使用 `strum:alpha` / `strum:receptorAlpha`.

```lua
strum:fade('opponent', 0.3)   -- 音符 + 接收器都到 0.3
```

### strum:reset(side)

参数：
- `side`(String|Number)——哪个音符线

返回：Bool

在其当前基础位置以默认间距重新布局车道——撤销任何每音符 `moveNote` 偏移.

```lua
strum:reset('player')
```

### strum:x(side)

参数：
- `side`(String|Number)——哪个音符线

返回：Number

音符线左边缘的 X.

```lua
print(strum:x('player'))
```

### strum:y(side)

参数：
- `side`(String|Number)——哪个音符线

返回：Number

音符线顶边缘的 Y.

```lua
text:add('label', 'YOU', strum:x('player'), strum:y('player') - 40, 0, 24)
```

### strum:noteX(side, dir)

参数：
- `side`(String|Number)——哪个音符线
- `dir`(Number)——箭头：0 左,1 下,2 上,3 右

返回：Number

任何移动后一个箭头中心的 X.用于将效果正好放在箭头上.

```lua
local cx = strum:noteX('player', 2)
sprite:add('spark', 'fx/spark', cx - 40, strum:noteY('player', 2) - 40)
```

### strum:noteY(side, dir)

参数：
- `side`(String|Number)——哪个音符线
- `dir`(Number)——箭头：0 左,1 下,2 上,3 右

返回：Number

任何移动后一个箭头中心的 Y.

```lua
local cy = strum:noteY('opponent', 0)
```

### 接收器视觉效果

这些设置接收器箭头本身(音符线)的样式,与下落音符分开.`direction` 是 `0`–`3`,或 `-1` 为所有四个一次.便于 modchart 花哨——旋转车道和淡出接收器和随节拍闪烁它.

### strum:center(side)

参数：
- `side`(String|Number)——哪个音符线

返回：Bool

在屏幕上水平居中整个车道(保持其当前 y).音符跟随.这是一次性微调——它不作为模式持续,所以之后的滚动方向改变或重新布局可以立即将车道移回偏离中心.对于保持居中的居中布局,见下面的 `strum:middleScroll`.

```lua
strum:center('player')   -- 一次性微调到中心
```

### strum:middleScroll(side, on)
*自 v0.6.3*

参数：
- `side`(String|Number)——哪个音符线
- `on`(Bool)——打开或关闭中滚动 [默认 true]

返回：Bool

车道的持久水平居中模式——不像 `strum:center` 的一次性微调,这粘住：车道在滚动方向改变和音符皮肤重新加载和任何其他重新布局中保持居中.纯水平——`y` 不受影响,所以上下滚动方向仍然在其上完全工作.也可以作为字段设置：`game:set('playerStrums.middleScroll', true)`.

```lua
strum:middleScroll('player', true)
-- ...之后,回到正常侧位置：
strum:middleScroll('player', false)
```

### game:get('playerStrums.middleX') / game:get('opponentStrums.middleX')
*自 v0.6.3*

返回：Float

只读.`strum:middleScroll` 将车道居中到的 X 坐标,无论它当前是否开启都可读——用于手动补间车道到那里而不是吸附.

```lua
-- 将玩家车道缓动到居中布局而不是吸附
tw:strum('toMiddle', 'player', { x = game:get('playerStrums.middleX') }, 0.6, 'expoOut')
-- 一旦补间着陆,使其在未来的重新布局中粘住：
strum:middleScroll('player', true)
```

### strum:receptorAlpha(side, direction, a)

参数：
- `side`(String|Number)——哪个音符线
- `direction`(Number)——`0`–`3`,或 `-1` 为所有
- `a`(Number)——Alpha 0–1

返回：Bool

淡出接收器箭头.这是音符线本身——下落音符使用 `strum:alpha`.

```lua
strum:receptorAlpha('opponent', -1, 0.4)
```

### strum:angle(side, direction, deg)

参数：
- `side`(String|Number)——哪个音符线
- `direction`(Number)——`0`–`3`,或 `-1` 为所有
- `deg`(Number)——旋转(度)

返回：Bool

旋转接收器箭头.从 `onUpdate` 驱动它获得旋转.

```lua
strum:angle('player', 2, math.sin(game:get('songTime') / 300) * 25)
```

### strum:scale(side, direction, sx, sy)

参数：
- `side`(String|Number)——哪个音符线
- `direction`(Number)——`0`–`3`,或 `-1` 为所有
- `sx`(Number)——X 缩放
- `sy`(Number?)——Y 缩放(默认为 `sx`)[默认 sx]

返回：Bool

缩放接收器箭头.传递一个值获得均匀缩放.

```lua
strum:scale('player', 1, 1.3)   -- 弹出 DOWN 接收器
```

### strum:tint(side, direction, color)

参数：
- `side`(String|Number)——哪个音符线
- `direction`(Number)——`0`–`3`,或 `-1` 为所有
- `color`(String)——十六进制 `RRGGBB` / `0xRRGGBB` / `#RRGGBB`.`FFFFFF` = 无色调

返回：Bool

给接收器箭头着色.设置为 `FFFFFF` 清除.

```lua
strum:tint('opponent', -1, 'FF4466')
```

### strum:play(side, direction, anim)

参数：
- `side`(String|Number)——哪个音符线
- `direction`(Number)——`0`–`3`,或 `-1` 为所有
- `anim`(String)——`'static'`和`'pressed'` 或 `'confirm'`

返回：Bool

强制接收器动画并保持它(无自动重置).使用 `'static'` 释放.非常适合对手侧的脚本化按下/命中视觉.

```lua
strum:play('opponent', 3, 'confirm')
-- ...之后
strum:play('opponent', 3, 'static')
```

### 音符线变量(game:get / game:set)

每个音符线也是普通 `game` 对象——将其作为 `playerStrums` 或 `opponentStrums` 寻址并设置字段.这是旧的 `playerNoteAlpha` / `playerNotesVisible` 扁平变量的整洁替代：命名音符线,更改参数.

| 字段 | 类型 | 它做什么 |
|---|---|---|
| `visible` | Bool | 显示 / 隐藏该侧的音符 + 长条(在重生中存活) |
| `alpha` | Float | 该侧音符 + 长条的 Alpha(在重生中存活) |
| `x` / `y` | Float | 车道基础位置；音符跟随.与 `strum:move` 相同 |
| `noteScale` | Float | 该侧下落音符的缩放 |
| `receptorScale` | Float | 该侧接收器箭头的缩放 |
| `scale` | Float | 一起设置音符 + 接收器缩放 |
| `holdScaleX` | Float | 该侧长条尾部的额外宽度乘数 |
| `angle` | Float | 旋转该侧所有接收器 |
| `receptorAlpha` | Float | 接收器箭头的 Alpha(不是音符) |
| `noteColor` | String | 该侧下落音符的持久十六进制色调(在重生中存活) |
| `upX` / `upY` | Float | 上滚中使用的车道位置 |
| `downX` / `downY` | Float | 下滚中使用的车道位置 |

### 补间整个音符线

两个专用 `tw` 补间为你滑动音符——整个车道或单个接收器——接受一组字段一起移动(在一个运动中移动 + 淡出)：

- `tw:strum(tag, side, {…}, time, ease)`——整个音符线.`side` 是 `'player'`/`1` 或 `'opponent'`/`0`.

- `tw:strumNote(tag, side, dir, {…}, time, ease)`——一个接收器,`dir` = 0 L和1 D和2 U和3 R.其下落音符跟随.

两者接受与 `playerStrums.*` 相同的字段名(`x`和`y`和`alpha`和`angle`和`noteScale`和……)加上可选的 `options` 表用于循环/类型.底层它们驱动 `game:set`,所以音符和长条尾部总是跟随.

如果你更喜欢路径,普通补间也在音符线路径上工作：`tw:x('t', 'playerStrums', …)`,或通过 `tw:any('t', 'playerStrums.members.2', {…})` 的接收器.注意 `tw:strumNote` / `members.<dir>.alpha` 淡出接收器；要淡出该车道的下落音符使用 `strum:alpha(side, dir, a)`.

### strum:noteScale(side, s)

参数：
- `side`(String|Number)——哪个音符线
- `s`(Number)——缩放

返回：Bool

一侧下落音符的缩放,与 `game:set('noteScale', ...)` 分开.与 `playerStrums.noteScale` 字段相同.

```lua
strum:noteScale('player', 0.7)
```

### strum:receptorScale(side, s)

参数：
- `side`(String|Number)——哪个音符线
- `s`(Number)——缩放

返回：Bool

一侧接收器箭头的缩放.与 `playerStrums.receptorScale` 字段相同.

```lua
strum:receptorScale('opponent', 0.9)
```

### strum:upPos(side, x, y)

参数：
- `side`(String|Number)——哪个音符线
- `x`(Number)——上滚中车道的 X
- `y`(Number)——上滚中车道的 Y

返回：Bool

车道在上滚中坐在哪里.滚动方向改变(TAB 或 `game:set('downScroll', ...)`)时立即使用.如果只设置一个方向,另一个使用相同的 X 并将 Y 镜像到另一个边缘.

```lua
strum:upPos('player', 800, 60)
```

### strum:downPos(side, x, y)

参数：
- `side`(String|Number)——哪个音符线
- `x`(Number)——下滚中车道的 X
- `y`(Number)——下滚中车道的 Y

返回：Bool

车道在下滚中坐在哪里.

```lua
strum:downPos('player', 800, 620)
game:set('downScroll', true)   -- 车道移动到其下滚位置
```

### 生成音符(成员)

Alpha(和每个其他字段)也作用于下落音符,不仅是接收器——整个侧或逐个音符.

整个侧：`game:set('playerStrums.alpha', 0.4)` 淡出该侧的音符 + 长条并在重生中存活；`strum:fade('player', 0.4)` 一起做音符 + 接收器.

单个活动音符：`spawnedNotes[strum][note]`——strum `0` = 玩家,`1` = 对手——是真实音符精灵,所以每个字段都读写：`.player`和`.direction`(0–3)和`.strumTime`(ms)和`.holdLength`和`.noteType`,加上精灵字段 `.alpha`和`.x`和`.y`和`.visible`.用 `spawnedNotes.<strum>.length` 读取活动数量.

原始池 `notes.members.<i>` 也可到达(例如 `notes.members.1.player`),但它包括回收/死音符且索引不稳定——保护 `nil` 并优先使用 `spawnedNotes` 获得活动音符.

### 相关音符变量

全局音符控制位于 `game` 变量上(两侧同时)：

- `game:set('noteSpacing', px)`——车道之间的间隙(独立于音符缩放).

- `game:set('noteScale', mul)`——音符 + 接收器大小的全局乘数(每侧在 `playerStrums.noteScale` 上).

- `game:set('downScroll', bool)`——实时翻转滚动方向；车道跳到它们的 `up*`/`down*` 位置.

- `game:get('songTime')`——当前歌曲位置(ms)(音符的"时间位置"是其谱面 `strumTime`；当 `songTime` 等于它时它到达接收器).

- `spawnedNotes[strum][note]`——用于直接字段访问的活动音符精灵(见 Game Variables 音符集合注释).

要更改音符和长条尾部的样子(图像和角度和每方向偏移和长条大小和开始偏移),见 Note Skins 指南.

### 读取音符键

车道按下,独立于是否有音符被命中.仅在歌曲内有意义——这些中的每一个在其他地方返回 `false`.回调形式是 `onKeyPress` / `onKeyRelease`.

### strum:pressed(direction)
*自 v0.5.8*

参数：
- `direction`(Int)——车道,`0`–`3`

返回：Bool

玩家现在是否持有该车道的键.用于只要键按下就持续的效果；对于它按下的时刻使用 `onKeyPress` 或 `justPressed`.

```lua
function onUpdate(dt)
    for d = 0, 3 do
        if strum:pressed(d) then
            strum:alpha('player', d, 1)
        end
    end
end
```

### strum:justPressed(direction)
*自 v0.5.8*

参数：
- `direction`(Int)——车道,`0`–`3`

返回：Bool

该车道的键是否在本帧按下.`onKeyPress` 回调的轮询等价——两者都触发,无论那里是否有音符可命中.

```lua
if strum:justPressed(0) then print('left tapped') end
```

### strum:justReleased(direction)
*自 v0.5.8*

参数：
- `direction`(Int)——车道,`0`–`3`

返回：Bool

该车道的键是否在本帧弹起.

```lua
if strum:justReleased(0) then stopGlow(0) end
```

---

## 音符皮肤(config.json)

箭头和接收器和长条由 `assets/ui/noteSkins/config.json` 驱动.它可以指向经典 sparrow 图集和松散的单图像 PNG和重用一张图像带每方向角度和定义自定义音符类型,并按歌曲覆盖其中任何.每个图像键在 `assets/ui/noteSkins/` 下解析(所以 `"custom/left"` → `assets/ui/noteSkins/custom/left.png`).新图像文件需要重建才能打包.下面的 `noteskin` 命名空间也实时从 Lua 驱动所有这些.

### 形状

最小皮肤只需命名 sparrow 图集和缩放；其他一切都有默认值.块都是可选的——只指定你想更改的.

你省略的任何内容回退到 `image` 命名的图集,所以混合没问题(松散音符 PNG + 图集长条,比如).设置 `"image": null` 完全退出图集——那么你必须为你使用的任何内容提供松散图像,否则你会得到一次性控制台警告和缺失部分的洋红色占位符.

### 基础字段

| 字段 | 类型 | 它做什么 |
|---|---|---|
| `image` | String \| null | Sparrow 图集键(需要匹配的 `.png` + `.xml`).`null` = 无图集(仅松散图像).音符线接收器使用这个,除非你给松散接收器图像. |
| `scale` | Float | 音符和长条和接收器的基础缩放.默认 `0.7`. |
| `antialiasing` | Bool | 此皮肤精灵的平滑. |
| `spacing` | Float | 车道间距(px)(箭头中心之间的距离).`0`/省略 = 引擎默认(116).独立于 `scale`. |
| `noteOffset` | `[x, y]` | 应用于每个下落音符的像素偏移. |
| `staticOffset` / `pressedOffset` / `confirmOffset` | `[x, y]` | 接收器的每状态偏移. |

### 松散箭头图像(无 XML)

不指向 sparrow 图集,而是将四个箭头指向它们自己的 PNG.`notes` 接受四个键(作为 `left, down, up, right` 顺序的数组,或作为对象)——或一个单字符串重用于所有四个,按车道用 `noteAngles` 旋转.

| 字段 | 类型 | 备注 |
|---|---|---|
| `notes` | String \| [4] \| {left,down,up,right} | 下落箭头.一个单字符串 = 所有四个车道一张图像. |
| `noteAngles` | [l, d, u, r] | 每个车道箭头的旋转度数.对于左指向图像：`[0, 90, 270, 180]`. |
| `noteOffsets` | `[[x,y] ×4]` | 每方向偏移(覆盖该车道的单 `noteOffset`). |

### 松散接收器(音符线)

音符线箭头("按下的音符")也可以是松散图像.提供 `receptor`(空闲状态)；`pressed` 和 `confirm` 是可选的,回退到 `receptor`.它们尊重相同的 `noteAngles`,所以一张箭头图像可以驱动整个车道.如果你不设置 `receptor`,音符线留在图集上.

| 字段 | 类型 | 状态 |
|---|---|---|
| `receptor` | String | 空闲 / 静态 |
| `pressed` | String | 键按住(默认为 receptor) |
| `confirm` | String | 音符命中 / 按住(默认为 receptor) |

### 长条(长按音符)

长条是重复主体加端盖.提供 `holdBody` 使用松散图像(一个主体所有车道共享)；`holdEnd` 可选,省略时重用主体.两者都省略回退到图集长条.

如果你的自定义长条看起来太细和分离或从音符头偏移,那是松散主体与你的音符艺术大小不同——使用这些旋钮调整大小并重新连接它(它们都不改变音符计时长度)：

| 字段 | 类型 | 备注 |
|---|---|---|
| `holdBody` | String | 重复长条段(松散 PNG 键) |
| `holdEnd` | String | 尾盖.可选——默认为 `holdBody` |
| `holdScaleX` | Float | 加宽 / 变细长条(默认 `1`).如果尾部比音符细,提高它 |
| `holdScaleY` | Float | 缩放尾盖高度(默认 `1`) |
| `holdOffset` | `[x, y]` | 微调长条相对于音符头的开始位置(px).正 `y` 将尾部推离接收器；`x` 在音符下重新居中它.默认 `[0, 0]` |
| `holdBodyOffset` v0.7.7 | `[x, y]` | 只移动长条的**身体**,在 `holdOffset` 之上.默认 `[0, 0]` |
| `holdEndOffset` v0.7.7 | `[x, y]` | 只移动**末端**,在 `holdOffset` 之上.用它闭合身体和末端之间的间隙或重叠.默认 `[0, 0]` |
| `holdLayer` v0.6.8 | String | 长条绘制在哪里：`'note'`(默认)——在接收器之上和音符头之下；`'receptor'`——在接收器后面.歌曲加载和每次重启时应用,两侧都是 |

自 v0.7.7 起,游戏注意到 `config.json` 保存并使用新值用于之后出现的音符,所以你可以在歌曲运行时调整偏移.如果项目文件夹有比游戏文件夹更新的副本,那个被读取.

### 音符水花和长按覆盖

v0.7.4 `config.json` 中的两个可选块添加 Funkin' 的效果.图像是 `assets/ui/noteSkins` 中的 sparrow 图集.两者都可以按歌曲(`songs`)和按音符类型(`noteTypes`)逐字段覆盖,`false` 关闭一个.

- 每方向.任何图像或动画可以使用 `{color}`(Purple和Blue和Green和Red)或 `{dir}`(left和down和up和right)和是 4 个的数组和或带 `left/down/up/right` 的对象.更短的数组随机选一个条目,所以水花可以交替.

- 大小.`scale` 乘以效果播放所在的音符线的接收器缩放,所以效果跟随皮肤和 `strum:receptorScale`.有自己 `scale` 的音符类型皮肤不改变效果大小；改为在其 `splashes` / `holdCovers` 内设置 `scale`.

- 水花在命中等于或优于 `judgment`(`sick`和`good`和`bad`和`any`)时出现.`randomAngle` 按 90° 步旋转它们.

- 长按覆盖播放 `start` 一次,在长按持续期间循环 `loop`,完成时播放 `end` 并立即消失当它被丢弃时.`start` 和 `end` 是可选的.

- 色调.`"tint": true` 用经典音符颜色给它们着色,十六进制字符串或每方向列表设置你自己的.

- 大小和位置.`scale` 是数字或 `[x, y]` 并乘以接收器缩放.`anchor`(默认 `[0.5, 0.5]`)是坐在接收器中心的帧点,所以不居中的艺术可以为每个皮肤大小对齐.它对每一帧保持,所以不同大小的 start和loop 和 end 帧不跳,`randomAngle` 围绕该点旋转.`offset` 在上面添加屏幕像素.

- 音符类型.`noteTypes` 条目只更改它列出的字段.如果它设置自己的 `image`,主皮肤的动画和`scale`和`offset`和`anchor`和颜色和 fps 不被继承,所以不同的图集干净开始；`player`和`opponent` 和 `judgment` 仍然继承.

- RGB 重着色.`"rgb"` 用 RGB 调色板着色器重新着色模板图像：红色通道变成第一个颜色,绿色第二个,蓝色第三个.`true` 使用经典音符颜色,`["C24B99", "FFFFFF", "3C1F56"]` 为所有车道设置一个调色板,4 个调色板的数组(或 `left/down/up/right`)为每个车道设置一个.`rgbMult`(0..1)与原始颜色混合.

### 像素音符

像素皮肤(第 6 周风格)使用两个网格表而不是 sparrow 图集,布局像 Psych Engine 的 `pixelUI` 文件.将它们放在 `assets/ui/noteSkins/` 中并让 `pixel` 指向它们：

| 表 | 网格行 |
|---|---|
| `notes` | 4 × 5：1：接收器 · 2：音符 · 2–3：按下动画 · 4–5：确认动画(每方向一列) |
| `ends` | 4 × 2：1：长条身体 · 2：长条末端 |

`"pixel": "pixel/NOTE_assets"` 是快捷方式：ends 表然后是 `pixel/NOTE_assetsENDS`.其他表布局使用 `"grid": [columns, rows]` 和 `"endsGrid"` 工作.像素层关闭 `antialiasing` 并重置 `noteAngles` 到 0 除非它自己设置,并且它替换下面层的松散图像.像素艺术很小,所以给它一个大的 `scale`(FNF 使用 6).新表需要重建才能打包.

### 音符线布局(位置和缩放)

`strums` 块设置每侧布局作为配置默认——每个车道坐在哪里以及其音符和接收器多大.它在歌曲开始时应用；这里的一切也可以从 Lua 实时(`playerStrums.*` / strum 命名空间),所以配置只是起点.

| 字段 | 类型 | 备注 |
|---|---|---|
| `player` / `opponent` | object | 每侧一个块 |
| `noteScale` | Float | 该侧下落音符的缩放(乘以皮肤 `scale`) |
| `receptorScale` | Float | 该侧接收器箭头的缩放,单独 |
| `scale` | Float | 同时设置音符和接收器缩放的简写 |
| `holdScaleX` | Float | 该侧长条尾部的额外宽度乘数(在皮肤 `holdScaleX` 之上) |
| `up` | `[x, y]` | 上滚中使用的车道基础位置.省略使用引擎默认 |
| `down` | `[x, y]` | 下滚中使用的车道基础位置.如果你只设置一个方向,另一个重用其 `x` 并将 `y` 镜像到对边 |

匹配的 `up` / `down` 位置在滚动翻转时应用.每歌曲覆盖放在 `songs.<name>.strums` 下,相同形状.

### 自定义音符类型

`noteTypes` 块给每个谱面音符类型自己的外观.标记为 `'Hurt Note'`(或你自己的 `'Gold Note'`)的谱面音符从其块渲染,省略的任何内容回退到基础皮肤——并且它仍然向 onNoteHit / onNoteMiss 报告其 `noteType`,所以你可以脚本化其行为.每个条目接受与基础皮肤相同的字段(`notes`和`noteAngles`和`scale`和`holdBody`/`holdEnd` 等).

游戏玩法字段 v0.6.8——类型也可以改变音符如何播放,不仅是外观：

| 字段 | 类型 | 备注 |
|---|---|---|
| `avoid` | Bool | 敌意音符(地雷和伤害音符).让它通过不是错过——无惩罚,保持连击,`onNoteAvoid` 触发.按下它是错误.对手/CPU 从不命中它.如果正常音符和 avoid 音符都在同一车道的命中窗口内,按键取正常音符.默认 `false` |
| `hurtHealth` | Float | 按下 `avoid` 音符时失去的生命值.省略 = 与常规错过相同的量 |
| `hurtMiss` | Bool | 按下 `avoid` 音符是否也算错过：打破连击和添加到错过计数器和播放错过动画并触发 `onNoteMiss`.`false` = 仅失去生命值和 `onNoteHurt`.默认 `true` |

按下 `avoid` 音符总是触发 `onNoteHurt`(从不 `onNoteHit`)；附加到它的长按像错过的长按一样淡出.

### 每歌曲覆盖

`songs` 块覆盖特定谱面的基础(按歌曲名匹配).只有你列出的字段改变；其他一切继承基础皮肤.非常适合单个轨道上一次性缩放或重新着色的皮肤而不复制整个配置.

### 运行时更改音符

其中很多也可以在歌曲期间从 Lua 实时通过 game:get / game:set 变量——无需编辑文件：

| 变量 | 类型 | 效果 |
|---|---|---|
| `noteScale` | Float | 皮肤 `scale` 的乘数,实时应用于音符和长条和接收器.每首歌重置为 `1`. |
| `noteSpacing` | Float | 车道间距(px)；实时重新定位音符线.每首歌重置为皮肤的值. |
| `playerStrums.alpha` / `opponentStrums.alpha` | Float 0–1 | 一侧音符 + 长条的 Alpha；在音符重生中存活. |
| `playerStrums.visible` / `opponentStrums.visible` | Bool | 显示 / 隐藏整个侧的音符 + 长条. |
| `playerStrums.noteScale` / `receptorScale` | Float | 每侧音符 / 接收器缩放(见 Strum). |
| `canPress` | Bool | 玩家音符输入的主门(关闭时忽略所有键命中). |
| `laneCanPress.<dir>` | Bool | 每车道输入门(`dir` = 0 左 … 3 右). |
| `mipmaps` | Bool | 图像的全局三线性过滤(清晰 vs 平滑缩小). |

命中/错过的音符的 `noteType` 也传递给 onNoteHit / onNoteMiss 回调,所以音符的 `noteTypes` 块和其脚本化行为对齐.活动音符集合(`spawnedNotes` / `unspawnNotes` / `allNotes`,索引 `[strum][note]`)让你触碰单个音符.

### 运行时切换或混合皮肤

`noteskin` 命名空间在以上一切之上添加一层——脚本设置的覆盖,总是胜过基础/每歌曲/每音符类型配置,合并字段的方式与那些层已经相互合并的方式相同.这使"切换皮肤"和"混合其他皮肤的部件"成为同一机制,只是从 Lua 而不是 JSON 驱动：用 `noteskin:get` / `noteskin:fromSkin` 从任何皮肤读取一个部件,并将该部件交给 `noteskin:set` 以移植到当前活动的任何皮肤上.设置或清除覆盖立即重新布局音符线并重生侧艺术——无需等待歌曲重启.

### noteskin:set(config)
*自 v0.6.5*

参数：
- `config`(table)——要合并的皮肤字段——image和scale和notes和holdBody和holdEnd和receptor和pressed和confirm和staticOffset和spacing和noteAngles和……

返回：Bool

将皮肤字段表合并到基于文件的配置(基础 → 每歌曲 → 每音符类型)当前解析的任何内容之上——只有 `config` 中存在的字段改变,其他一切仍来自 config.json.

```lua
-- 保持活动皮肤,只借用另一个预设的长条部件
noteskin:set({
    holdBody = noteskin:fromSkin('classic', 'holdBody'),
    holdEnd = noteskin:fromSkin('classic', 'holdEnd')
})
```

### noteskin:load(name)
*自 v0.6.5*

参数：
- `name`(String)——config.json 中 "skins" 块的预设名称

返回：Bool

从 config.json 的 `"skins"` 部分加载整个命名预设作为运行时覆盖,独立于当前歌曲或音符类型.如果该名称没有皮肤则失败.

```lua
noteskin:load('neon')
```

### noteskin:reset()
*自 v0.6.5*

返回：Bool

清除运行时覆盖,回到基于文件的配置(基础/歌曲/音符类型)自行解析的任何内容.

```lua
noteskin:reset()
```

### noteskin:active()
*自 v0.6.5*

返回：Bool

运行时覆盖当前是否设置(通过 `noteskin:set` 或 `noteskin:load`).

```lua
if noteskin:active() then noteskin:reset() end
```

### noteskin:get(field)
*自 v0.6.5*

参数：
- `field`(String)——解析皮肤上的字段名——接受 notes 和 notePieces 可互换

返回：Dynamic

在每个层(基础和每歌曲和每音符类型和运行时覆盖)合并后读取当前活动解析皮肤上的一个字段——抓取一个部件以用 `noteskin:set` 在其他地方重用.

```lua
local body = noteskin:get('holdBody')
```

### noteskin:fromSkin(name, field)
*自 v0.6.5*

参数：
- `name`(String)——config.json 中 "skins" 块的预设名称
- `field`(String)——从该预设读取的字段名

返回：Dynamic

直接从命名 `"skins"` 预设读取一个字段,而不触及活动覆盖——从你不使用的预设中只取出一个部件(长条身体和接收器图像).

```lua
local holdEnd = noteskin:fromSkin('classic', 'holdEnd')
```

### noteskin:list()
*自 v0.6.7*

返回：Table

返回 config.json `"skins"` 部分下每个预设的名称——从这构建设置菜单的选择列表,而不是在脚本中硬编码预设名称.

```lua
for _, name in ipairs(noteskin:list()) do
    print(name)
end
```

### noteskin:current()
*自 v0.6.7*

返回：String

当前活动 `noteskin:load` 的预设名称,如果没有加载则为 `nil`(活动皮肤只是基于文件的默认,或没有预设名称背后的临时 `noteskin:set` 表).用于在设置菜单中高亮选中选项.

```lua
for _, name in ipairs(noteskin:list()) do
    local selected = (name == noteskin:current())
    -- 如果选中则高亮绘制此选项
end
```

### noteskin:save(?name)
*自 v0.6.7*

参数：
- `name`(String?)——要记住的预设名称.默认为 `noteskin:load` 最后加载的——如果那是 `nil` 且没有给定名称则失败.

返回：Bool

将命名预设记住为玩家的选择,底层用 `save:*` 持久化(与引擎其他一切使用的相同存档文件)——不写入 config.json 本身,所以从不触及发布的默认值.与 `noteskin:loadSaved` 配对以在下次启动恢复它.

```lua
-- 玩家在设置菜单中选了皮肤
noteskin:load('noRotation')
noteskin:save()   -- 特别记住 'noRotation'

-- 或不先加载它,显式命名
noteskin:save('noRotation')
```

### noteskin:loadSaved()
*自 v0.6.7*

返回：Bool

恢复上次用 `noteskin:save` 保存的预设,与用该名称调用 `noteskin:load` 相同.如果尚未保存(新存档文件)则返回 `false` 而不报错——从启动脚本调用一次,使回归玩家的选择自动应用.

```lua
function onCreate()
    noteskin:loadSaved()
end
```

---

## 谱面事件

谱面事件是放置在歌曲时间线上的提示：相机移动和闪光和动画,你的脚本反应的任何东西.制作一个需要三个步骤：描述事件类型(`assets/events` 中的小 JSON 文件),在谱面编辑器中放置它,并在 Lua 中用 `onEvent` 处理它.本页逐步介绍所有三个.

### 如何组合

| 步骤 | 哪里 | 你做什么 |
|---|---|---|
| 1. 事件类型 | `assets/events/*.json` | 命名事件并列出其参数(数字和文本和复选框和列表和颜色和缓动).编辑器从这构建其字段. |
| 2. 放置 | 谱面编辑器,事件轨道 | 点击轨道放置关键帧,选择事件类型,填写值. |
| 3. 处理 | 任何 Lua 脚本 | `onEvent(name, v1, v2, params, strumTime)` 在播放头到达事件时运行.检查名称并做效果. |

事件类型只描述字段.它本身什么都不做：效果总是来自脚本(或内置事件之一).没有 JSON 类型的事件仍然工作——它只是获得两个纯文本值,像 Psych Engine 中一样.

### 文件放在哪里

一切都在你的项目文件夹(有 `project.xml` 的那个)中：

| 文件夹 | 放什么 | 更改后 |
|---|---|---|
| `assets/events/` | 事件类型(`.json`).一个文件可以持有一个事件或多个.直接在文件夹中,无子文件夹. | 编辑器立即看到 |
| `scripts/` | 有 `onEvent` 的 Lua 脚本.任何名称和任何子文件夹. | 重建游戏(脚本编译进去) |
| `assets/charts/<song>/` | 谱面；放置的事件保存在其中.这里的可选 `events.json` 被合并. | 由编辑器保存 |

### 逐步

- 描述事件.创建 `assets/events/my-events.json`(下面的示例),或在谱面编辑器中使用 Events > New event type...,它为你写文件.

- 用 `state:change('chart', 'my-song')` 打开谱面编辑器.你的事件在事件列表中.

- 放置它.在事件轨道(音符右侧)的空白处点击放置关键帧,点击关键帧,在 Event 窗口中选择你的事件并设置其值.用 Ctrl+S 保存.

- 编写处理程序.创建 `scripts/events.lua`,其 `onEvent` 函数检查事件名称(更多见下面的 onEvent 部分),然后重建游戏.

- 测试.在编辑器中按 Enter,Test > With Lua scripts 开启,或直接播放歌曲.

### 它的脚本

一个 `onEvent` 处理上面文件中的两个事件.`v1` 和 `v2` 是前两个参数；每个参数也在 `params` 中按其键.

### 在编辑器中创建事件类型

最简单的方式：打开谱面编辑器并使用 Events > New event type....窗口有两个标签页.

General

| 字段 | 含义 |
|---|---|
| Id | 事件名称.正是 `onEvent` 作为 `name` 接收的字符串. |
| Title | 编辑器中显示的名称(可选,默认为 id). |
| Description | 指向事件时作为提示显示. |
| Color | 轨道上事件菱形的颜色. |
| Sound | 播放头经过事件时播放的声音：内置(Click和Tick和Wood和Beep和Clap)或 `assets/audio/sounds` 中的任何 `.ogg` / `.wav`.Play 预览它,Add sound... 从你的计算机选择文件并复制到 `assets/audio/sounds`. |
| Volume | 声音的音量,0 到 1. |
| Play in game too | 关闭：声音只在谱面编辑器中播放,作为制谱时的提示.开启：事件触发时也在游戏中播放. |
| Save to | Shared(default.json)将其添加到 `assets/events/default.json`；Separate file 写 `assets/events/<Id>.json`. |

Parameters——+ Add a parameter 并设置其 Key(你在 Lua 中读取的名称)和Label和Type 和 Hint.在它们下面,窗口只显示该类型需要的内容：数字的 Min / Max / Step,下拉菜单的每个选项一个字段带 + Add option / Remove last,其他类型的复选框和颜色选择器或缓动列表,以及新事件开始的 Example 值.Up / Down 设置顺序——顺序很重要,它是传递给 `onEvent` 的值的顺序.

Copy Lua handler(在 Save event type 旁边)为此事件复制一个现成的 `onEvent`,每个参数都从 `params` 读取,所以你可以粘贴到歌曲的脚本中.如果文本参数有像 `time`和`speed` 或 `zoom` 的键,窗口建议步进器或滑块：文本参数作为字符串到达脚本,期望数字的函数(补间和相机)在它上中断.

按 Save event type.文件被写入构建的 `assets/events`,当编辑器从项目构建运行时,也写入项目的 `assets/events`,所以下次重建保留它.新类型立即可用,无需重启.

### 事件类型文件

你也可以手写 JSON.`assets/events`(和 `assets/shared/events`)中直接存在的每个 `.json` 都被读取.一个文件持有 `events` 列表,所以一个文件可以描述许多事件(纯数组或单个事件对象也工作).`default.json` 首先加载,其他按字母顺序；后面同 `id` 的文件替换前面的定义,这也是你覆盖内置事件的方式.下面的示例在一个事件上显示每种字段.

### 事件字段

| 字段 | 类型 | 它做什么 |
|---|---|---|
| `id` | String | 必需.谱面和 `onEvent` 中使用的事件名称.(`name` 也接受.) |
| `title` | String | 编辑器中的显示名称. |
| `description` | String | 编辑器中的提示文本. |
| `color` | String | 菱形的 `RRGGBB` 颜色.没有它编辑器从名称选择颜色. |
| `sound` | String | 编辑器播放头经过事件时播放的声音：内置名称或 `assets/audio/sounds` 中的文件名. |
| `volume` | Float | `sound` 的音量,0 到 1(默认 1). |
| `playInGame` | Bool | 事件触发时也在游戏中播放 `sound`(默认 `false`). |
| `replay` | Bool | 对于设置状态的事件(背景和相机模式).当事件编辑器跳到后面时,该点之前同类型的最后事件再次运行,以便场景匹配.对于一次性效果如闪光或碰撞则省略(默认 `false`).内置 FocusCamera和Set Camera Zoom和Change Character和Change Scroll Speed 和 Camera Follow Pos 总是这样做. |
| `params` | Array | 参数,按顺序.对于无值事件可以为空. |

参数字段

| 字段 | 类型 | 它做什么 |
|---|---|---|
| `key` | String | Lua 中 `params` 表里值的名称.默认为 `value1`和`value2`…… |
| `label` | String | 编辑器中字段旁边的文本. |
| `type` | String | 下面的类型之一.未知类型变成 `text`. |
| `defaultVal` | Any | 新放置事件的值(`default` 也接受). |
| `min` / `max` / `step` | Float | `stepper` 和 `slider` 的限制和步长.值钳制到 min/max. |
| `options` | Array | `dropdown` 的选项.在 `ease` 字段上,曲线之前显示的额外选项,例如 `["instant"]`. |
| `tooltip` | String | 指向字段时显示的提示. |

参数类型和 Lua 接收什么

| type | 编辑器字段 | Lua 值 |
|---|---|---|
| `stepper` | 带 − / + 按钮的数字(Shift = 更大步长) | number |
| `slider` | 滑块上的数字 | number |
| `text` | 自由文本 | string |
| `checkbox` | 开 / 关 | boolean |
| `dropdown` | `options` 之一 | string |
| `color` | 颜色选择器 | string `RRGGBB`(无 `#`) |
| `ease` | 缓动列表 | string,例如 `quadOut`——直接传递给 `tween` |

键包含 `duration`和`length`和`dur` 或 `time` 的数字参数在编辑器中在键下绘制一条细线,以便你看到效果持续多久.值以秒读取.

### 在谱面中放置事件

事件住在音符网格右侧的轨道上,像视频编辑器中的关键帧.一个关键帧(菱形)是一个轨道上的某个时刻的所有事件；它们一起触发.

| 动作 | 结果 |
|---|---|
| 点击轨道空白处 | 用最后使用的事件类型新建关键帧(Shift：无吸附) |
| 点击关键帧 | 打开 Event 窗口：选择类型,编辑值 |
| 拖动关键帧 | 在时间中移动它,或侧向移动到另一轨道 |
| Alt+拖动 | 复制关键帧 |
| 右键点击关键帧 | 删除它 |
| + Add event to this key | 在同一关键帧上堆叠另一个事件(显示为 `x2`和`x3`……) |

轨道仅用于组织——轨道号不改变事件触发方式.在编辑器中按 F3 获得完整快捷键列表.

### 处理事件：onEvent

当歌曲到达事件时,歌曲的每个脚本得到 `onEvent`,总是五个参数：

| 参数 | 它是什么 |
|---|---|
| `name` | 事件 id,例如 `'Flash'`. |
| `v1`和`v2` | 前两个参数,已类型化(数字是数字,复选框是布尔值).对于 Psych 事件和没有 JSON 类型的事件,这些是两个文本值.缺失的是 `""`. |
| `params` | 按其键每个参数的表(`params.color`和`params.duration`……),填充默认值,加上按位置的 `params.value1`和`params.value2`和`params.value3`…….用于第三个参数及以后. |
| `strumTime` | 事件在歌曲中的时间,毫秒. |

位置从不改变,无论事件有多少参数,所以一个脚本可以处理任意数量的事件类型.写为 `onEvent(name, value1, value2)` 的旧脚本继续工作.

事件按时间顺序触发.当歌曲重启或跳转时,新位置之前的事件被跳过(从播放头测试也跳过它们),所以事件不应依赖更早的事件已运行——每次都设置完整状态.在谱面测试中,`onEvent` 仅在 Test > With Lua scripts 时运行,在所选脚本中.

### 旧式值和 params 表

来自 Psych Engine 的脚本通常只将 `v1` 和 `v2` 作为文本读取,像 `tonumber(v1)`；这仍然工作,因为类型化数字通过 `tonumber` 不变传递.对于第二个参数之后的任何东西,或当你想要名称而不是位置时,读取 `params`.

不要命名参数像 API 命名空间(`camera`和`sprite`……)：它会在函数内隐藏该命名空间.每个语句必须保持一行(Lua 转译器不接受跨行拆分的表达式).

### events:on——每个事件一个函数

不在 `onEvent` 内部分支,你可以将全局函数绑定到一个事件名称.函数由名称作为字符串给出,获得与 `onEvent` 相同的值,只是没有名称：`(v1, v2, params, strumTime)`.

| 调用 | 描述 |
|---|---|
| `events:on(name, fnName)` | 事件 `name` 触发时调用全局函数 `fnName`.每个名称一个处理程序；第二个 `on` 替换它. |
| `events:off(name)` | 移除处理程序. |
| `events:trigger(name, v1?, ..., v8?)` | 现在调用 `name` 的 `events:on` 处理程序,最多 8 个值.你省略的值获得事件类型的默认值,`params` 以与谱面事件相同的方式填充.它不运行 `onEvent` 或内置项——便于测试处理程序或从过场动画重用它. |

处理程序在 `state:change` 时清除,所以在 `onCreate` 中注册它们.

### events:on(name, callback)

参数：
- `name`(String)——事件名称,如谱面中
- `callback`(String)——全局 Lua 函数的名称,作为字符串

返回：Bool

每次事件触发时运行你的函数,所以你不需要一个大的 `onEvent`.函数获得 `(v1, v2, params, strumTime)`.为同一事件再次调用它替换旧函数.状态切换时清除处理程序.

```lua
function onCreate()
    events:on('Flash', 'flash')
end

function flash(v1, v2, params, strumTime)
    camera:flash('hud', params.color, params.duration)
end
```

### events:off(name)

参数：
- `name`(String)——事件名称,如谱面中

返回：Bool

停止为此事件调用用 `events:on` 绑定的函数.

```lua
events:off('Flash')
```

### events:trigger(name, value1?, ... value8?)

参数：
- `name`(String)——事件名称,如谱面中
- `value1 ... value8`(Any)——事件的值,按参数顺序 [可选]

返回：Bool

现在从脚本触发事件,在当前歌曲时间.如果事件有定义(`assets/events` 中的参数),值按顺序匹配其参数.它调用该名称的 `events:on` 函数；不调用 `onEvent`.

```lua
function onBeatHit(beat)
    if beat == 64 then
        events:trigger('Flash', 'FFFFFF', 1)
    end
end
```

### events:count(name, time?)
*自 v0.7.1*

参数：
- `name`(String)——事件名称,如谱面中
- `time`(Float)——检查的歌曲时间(ms).省略以使用当前歌曲时间 [可选]

返回：Int

谱面在歌曲时间或之前有多少此名称的事件.它读取谱面本身,所以即使事件被跳过也正确：从中间开始的测试和向前或向后跳转.用于打开和关闭某些东西的事件：计数为奇数时状态开启.游戏玩法外返回 0.

在 `onEvent` 内,正在触发的事件现在已经计数 v0.7.7.

```lua
function syncLights()
    local dark = events:count('lights') % 2 == 1
    game:set('darkness.visible', dark)
end

function onEvent(name)
    if name == 'lights' then syncLights() end
end

function onSongStart() syncLights() end
function onSeek(time) syncLights() end
```

### events:last(name, time?)
*自 v0.7.1*

参数：
- `name`(String)——事件名称,如谱面中
- `time`(Float)——检查的歌曲时间(ms).省略以使用当前歌曲时间 [可选]

返回：Table

在歌曲时间或之前此名称的最后一个事件,或如果还没有则为 `nil`.表有 `t`(其时间)和`name`和`v1`和`v2`和`value1`……以及每个参数按其 id,与 `onEvent` 中 `params` 表相同的字段.用于设置值的事件,像相机目标或角色,在跳转后恢复正确的.

```lua
function onSeek(time)
    local bg = events:last('changeBG')
    if bg then
        setBackground(bg.value)
    end
end
```

### 内置事件

这些事件在 `funkinStyle` 模式(角色和相机存在的地方)由引擎本身处理.它们仍然到达 `onEvent` 和 `events:on`,所以脚本可以添加到它们.你可以通过在 `assets/events` 中定义同 `id` 的类型来更改其编辑器字段,但保持前两个参数含义相同——内置代码将它们作为 `value1` / `value2` 读取.

| 事件 | 参数 | 效果 |
|---|---|---|
| FocusCamera | 目标(`Opponent` / `Player` / `Girlfriend` / `Position`,旧谱面带 `0`/`1`/`2` 仍工作)和X / Y 位置和缓动和持续时间 | 将相机指向角色,从其相机点移动 X / Y,或用 `Position` 指向世界点 X / Y.缓动 `follow` 是 Psych Engine 的平滑跟随,`instant` 跳转,任何其他曲线在持续时间内移动.v0.8.0 |
| Camera Zoom | 量和相机(`Both` / `Game` / `HUD`) | 短暂的缩放碰撞,缓动回去.HUD 碰撞两倍远.v0.8.0 |
| Set Camera Zoom | 缩放和模式(`Direct` / `Stage`)和持续时间和缓动 | 设置静止相机缩放.`Stage` 乘以舞台缩放.持续时间高于 0 沿曲线缓入.v0.8.0 |
| Play Animation | 角色(`bf`/`dad`/`gf`)和动画和重启和保持 | 在角色上播放动画.保持使其持续到结束而不是在下一拍跳舞.v0.8.0 |
| Hey! | — | bf 播放 `hey`,gf 播放 `cheer`. |
| Change Character | 槽位(`bf`/`dad`/`gf`,或 Psych `0` bf和`1` dad和`2` gf)和角色名 | 交换角色.它保持舞台点(见 `stage:position`)；目标在歌曲开始时预加载,所以交换不会停顿.重启恢复原始.触发 `onCharacterChange(slot, new, old)`.v0.7.3 |
| Change Scroll Speed | 乘数和秒 | 音符滚动速度作为谱面速度的倍数,在给定时间内沿缓动曲线缓动(`0` = 立即).v0.7.3 |
| Add Camera Zoom | 游戏量(0.015)和HUD 量(0.03) | 游戏和 HUD 相机上的一次性缩放碰撞.v0.7.3 |
| Screen Shake | 游戏相机的 `"duration, intensity"`,HUD 相同 | 抖动任一或两个相机.v0.7.3 |
| Camera Follow Pos | x和y(两者都空 = 释放) | 将游戏相机保持在世界点上而不是聚焦的角色,具有与 FocusCamera 相同的缓动和持续时间.v0.7.3 |
| Camera Bop | 每(拍)和强度 | 相机撞拍的频率.`0` 关闭碰撞.v0.8.0 |
| Camera Angle | 相机(`Game` / `HUD`)和角度和持续时间和缓动 | 旋转相机.v0.8.0 |
| Camera Shake | 相机(`Game` / `HUD` / `Both`)和强度和持续时间 | 抖动相机.v0.8.0 |
| Flash Camera | 颜色和持续时间和相机 | 在相机上闪烁颜色.v0.8.0 |
| Fade Camera | 模式(`Out` / `In`)和颜色和持续时间和相机 | 将相机淡到颜色,或从颜色淡回.v0.8.0 |
| HUD Fade | alpha和持续时间和缓动 | 淡入或淡出整个 HUD.v0.8.0 |
| Strum Line | 侧(`Player` / `Opponent` / `Both`)和X / Y 偏移和alpha和持续时间和缓动 | 移动或淡出音符线.X / Y 是从开始位置的偏移,音符跟随它.v0.8.0 |

在事件编辑器中,倒回(R和循环和点击时间线)立即以结束状态应用这些事件,暂停时 Preview 显示相机和缩放和 HUD 最终落在哪里.

### 完整示例：相机倾斜事件

从头开始一个完整事件：一个带数字和持续时间和缓动的类型,以及一个倾斜游戏相机并缓动回来的脚本.保存 JSON(或在 Events > New event type... 中构建它),放置几个 `Tilt` 关键帧,并用 Enter 使用 Test > With Lua scripts 测试.

### Tilt 类型

此示例的事件类型.脚本按键从 `params` 读取所有三个值；`v1` 将是角度,`v2` 是持续时间.键 `duration` 也在编辑器中每个关键帧下绘制长度线.

### 事件存储在哪里

- 在谱面中.每个放置的事件作为 `{"t": ms, "name": "Flash", "p": {"color": "FFFFFF", ...}, "k": track}` 保存在谱面的 `events` 列表中.旧式事件使用 `v1` / `v2` 而不是 `p`；两者都读取.

- 谱面旁边的 events.json.与谱面同一文件夹中的 `events.json` 在歌曲加载时合并(重复被忽略).Freak 格式和 Psych 的 `events.json` 都工作.

- Psych Engine 谱面.Psych 事件自动导入；它们的两个值作为 `value1` / `value2` 到达.保存为 Psych 谱面也保留 Freak 参数,所以来回不丢失任何东西.

常见问题

- 事件在编辑器中显示但什么都不发生——类型只是描述；脚本必须在 `onEvent` 中处理它.在谱面测试中,选择 Test > With Lua scripts 和具有 `onEvent` 的脚本.

- 名称不匹配——`onEvent` 比较 `id`,不是 `title`,且区分大小写.

- 补间或相机忽略值——参数是 `text`,所以脚本获得字符串.使时间和速度和缩放和角度成为 `stepper` 或 `slider`(编辑器警告这个),或用 `tonumber()` 包裹旧值.

- 值到达时偏移——从 `params` 按键盘读取它们而不是按位置.

- 新 JSON 不在列表中——文件必须直接在 `assets/events` 中(无子文件夹)且有效 JSON 或 JSON5；使用 Events > Reload event types.解析错误命名行和列.

- 重建后事件类型消失——它保存在构建游戏旁边.在从构建制作事件类型之前打开 Settings > General > Also copy saved files into the project.

谱面编辑器也解释这一切：按 F3 并打开 Events.

### 将事件导入谱面

v0.7.4 在谱面编辑器中,File > Import events... 将任何 `.json` 的事件添加到打开的谱面并跳过已存在的.File > Replace events from file... 将谱面的所有事件替换为文件的.两者都读取 Freak 或 Psych 格式的单独 `events.json`,或整个 Psych 谱面的事件.Ctrl+Z 一步撤销导入.

---

## 指挥器 / 节拍函数

`conductor` 命名空间驱动节拍时钟——`onBeatHit`和`onStepHit` 和 `onSectionHit` 回调.在歌曲中它们自动跟随音乐；在菜单或自定义状态中你可以以选定的 BPM 自由运行它们或同步到任何播放的声音.

### 歌曲外的节拍如何工作

构建在引擎上的每个状态每帧滴答共享指挥器,并将 `onBeatHit(beat)` / `onStepHit(step)` / `onSectionHit(section)` 分发到你的脚本.是的——这些在自定义状态中也触发,不仅在歌曲中.问题：歌曲外指挥器没有音乐可读取节奏,所以你给它一个.

`conductor:enable(bpm)` 以该 BPM 启动自由运行时钟(按真实时间推进)——从那时起 `onBeatHit` 在节拍上滴答.`conductor:sync` 改为将节拍绑定到播放的声音,以便它们与实际音频对齐.`conductor:disable` 冻结时钟.歌曲自动重新断言时钟,所以在菜单中切换它永远不会破坏游戏玩法.

### conductor:enable(bpm)

参数：
- `bpm`(Number?)——每分钟节拍的速度 [默认 120]

返回：Bool

以 `bpm` 启动自由运行的节拍时钟(按真实时间推进,无需音乐)并打开节拍分发.在自定义状态的 `onCreate` 中调用使 `onBeatHit` 滴答.

```lua
function onCreate()
  conductor:enable(128)   -- 现在 onBeatHit 以 128 BPM 触发
end

function onBeatHit(beat)
  sprite:scale('logo', 1.2, 1.2, true)
end
```

### conductor:bpm(n)

参数：
- `n`(Number)——新速度(BPM),必须高于 0

返回：Bool

立即更改节拍时钟的速度.与 `game:set('bpm', n)` 相同.

```lua
conductor:bpm(160)
```

### conductor:getBpm()

返回：Number

节拍时钟的当前速度.与 `game:get('bpm')` 相同.

```lua
text:set('tempo', conductor:getBpm()..' BPM')
```

### conductor:sync(soundTag)

参数：
- `soundTag`(String?)——要跟随的标记声音.省略以跟随 `FlxG.sound.music`(当前背景音乐)

返回：Bool

将节拍绑定到播放的声音,以便它们跟踪其真实播放位置(并在暂停时暂停)而不是自由运行.用 `conductor:bpm` 设置速度以匹配轨道.

```lua
music:play('menu', 'menuTheme')
conductor:sync('menu')   -- 节拍跟随菜单音乐
conductor:bpm(102)       -- 以轨道的速度
```

### conductor:disable()

返回：Bool

停止节拍时钟：直到再次启用之前没有更多 `onBeatHit` 或 `onStepHit`.进入歌曲时自行重新打开.与 `game:set('conductorEnabled', false)` 相同.

```lua
conductor:disable()
```

### conductor:enabled()

返回：Bool

节拍时钟运行时为 `true`.

```lua
if not conductor:enabled() then conductor:enable(128) end
```

### 平滑速度变化

速度变化可以从之前的 BPM 滑动到新 BPM 而不是立即切换.节拍和步和段落以及与之相关的一切(相机碰撞和`onBeatHit`和`onStepHit`)跟随滑动；音符保持其时间,所以无需重新制谱.

在谱面编辑器中打开 Song → Tempo,将播放头放在速度变化内并设置 Transition(以拍为单位,`0` 立即切换)和 Ease(linear和sine和quad和cubic和quart和expo 或 circ,每个 In和Out 或 InOut).网格着色速度滑动的部分,标志工具提示显示其长度.在谱面文件中它是速度变化上的两个可选字段：`d`,以毫秒为单位的长度,和 `ease`.

---

## 窗口函数

`window` 命名空间控制操作系统应用程序窗口本身——标题和任务栏图标和位置和大小和游戏后面的清除颜色和标题栏主题.每个设置器成功时返回 `true` 并通过错误控制台报告失败.

### 窗口控制如何工作

这些函数直接与 Lime 应用程序窗口对话,所以变化是立即和全局的——它们不绑定到当前状态.在一个脚本中设置的标题或图标保持直到某些东西再次更改它.

`window:background` 是例外：它写默认相机的清除颜色,相机在每个状态切换时重建.在 `onCreate` 中设置它,如果你想要该屏幕上的它.

调用优雅地失败.如果没有活动窗口(或,对于主题,你在 Windows 之外)函数返回 `false` 并向错误控制台打印一行原因,而不是崩溃脚本.

### 标题和图标和主题

### window:title(text)

参数：
- `text`(String)——新窗口 / 任务栏标题(`nil` 被视为空)

返回：Bool

设置标题栏和任务栏中显示的文本.立即应用并在状态变化中持续.

```lua
window:title('Freak Engine - Week 7')
```

### window:icon(image)

参数：
- `image`(String)——`assets/images/` 下的图像键,无 `.png` 扩展名

返回：Bool

用你资产中的 PNG 替换窗口 / 任务栏图标.键解析为 `assets/images/<image>.png`.如果文件缺失或解码失败则返回 `false`(并记录).

```lua
-- 加载 assets/images/icons/boyfriend.png
window:icon('icons/boyfriend')
```

### window:background(color)

参数：
- `color`(String)——十六进制颜色——`RRGGBB`和`#RRGGBB` 或 `0xAARRGGBB`

返回：Bool

设置绘制在一切后面的清除颜色(默认相机的 `bgColor`).因为相机在每个状态切换时重新创建,从脚本的 `onCreate` 为你想要的屏幕调用这个.

```lua
function onCreate()
    window:background('101820')
end
```

### window:bars(?color, ?image)
*自 v0.7.2*

参数：
- `color`(String?)——条的十六进制颜色,例如 `'1B1B2F'` [默认黑色]
- `image`(String?)——`images/` 下的图像键,拉伸以覆盖游戏后面的整个窗口

返回：Bool

样式化窗口与形状不匹配时游戏周围显示的条：窄窗口中上下,超过 32:9 时两侧.有 `image` 时图片填充游戏后面的窗口并随它调整大小.跨状态变化保持.无参数调用回到纯黑.

```lua
window:bars('1B1B2F')

window:bars('000000', 'menu/barsPattern')

window:bars()
```

### window:dark()

返回：Bool

将标题栏切换到暗模式(仅 Windows).在其他平台返回 `false` 并记录.

```lua
window:dark()
```

### window:light()

返回：Bool

将标题栏切换到亮模式(仅 Windows).

```lua
window:light()
```

### window:theme(name)

参数：
- `name`(String)——`"dark"` 或 `"light"`

返回：Bool

`dark`/`light` 的数据驱动版本——按字符串选择标题栏主题.任何其他值被拒绝并报错.仅 Windows.

```lua
local mode = game:get('darkUI') and 'dark' or 'light'
window:theme(mode)
```

### 位置和大小和状态

### window:position(x, y)

参数：
- `x`(Int)——窗口左边缘,桌面像素
- `y`(Int)——窗口顶边缘,桌面像素

返回：Bool

将窗口移动到绝对桌面坐标.`(0, 0)` 是主显示器的左上角.如果你只想居中它,使用 `window:center`.

```lua
window:position(100, 60)
```

### window:center()

返回：Bool

在主显示器上居中窗口,考虑当前窗口大小.在 `window:size` 调用之后很方便.

```lua
window:size(1280, 720)
window:center()
```

### window:size(width, height)

参数：
- `width`(Int)——新窗口宽度(像素,必须 ≥ 1)
- `height`(Int)——新窗口高度(像素,必须 ≥ 1)

返回：Bool

调整应用程序窗口大小.内部游戏分辨率不受影响——Flixel 缩放其渲染以适应.低于 `1` 的值被拒绝并报错.

```lua
window:size(1600, 900)
window:center()
```

### window:minSize(width, height)
*自 v0.6.9*

参数：
- `width`(Int)——最小宽度
- `height`(Int)——最小高度

返回：Bool

用户可以将窗口调整到的最小大小.

```lua
window:minSize(640, 360)
```

### window:maxSize(width, height)
*自 v0.6.9*

参数：
- `width`(Int)——最大宽度
- `height`(Int)——最大高度

返回：Bool

用户可以将窗口调整到的最大大小.

```lua
window:maxSize(1920, 1080)
```

### window:resizable(enable)

参数：
- `enable`(Bool)——用户是否可以拖动调整窗口大小 [默认 true]

返回：Bool

启用或禁用用户调整窗口边框大小.

```lua
window:resizable(false)  -- 锁定窗口大小
```

### window:borderless(enable)

参数：
- `enable`(Bool)——`true` 隐藏操作系统边框 / 标题栏 [默认 true]

返回：Bool

显示或隐藏操作系统窗口镶边(边框和标题栏).无边框窗口没有标题栏,所以主题/标题仍然应用但直到镶边返回才可见.

```lua
window:borderless(true)
```

### window:fullscreen(type, enable)
*自 v0.6.0*

参数：
- `type`(String)——`"exclusive"`(真实 OS 全屏)或 `"borderless"`(窗口化全屏)
- `enable`(Bool?)——`true` 进入该模式,`false` 窗口化 [默认 true]

返回：Bool

在两种全屏之间切换.`"exclusive"` 是真正的 OS 全屏,可能根据 OS 在 alt-tab 时最小化；`"borderless"` 改为将无边框窗口钉到显示以覆盖它,避免那个最小化,代价是不是真正的独占全屏.`type` 也接受 `"native"`/`"true"` 和 `"windowed"`/`"fake"` 作为别名.未知类型错误而不是静默无操作.

```lua
window:fullscreen('exclusive', true)    -- 真正全屏
window:fullscreen('borderless', true)   -- 窗口化全屏,alt-tab 友好
window:fullscreen('exclusive', false)   -- 回到窗口化
```

### window:maximize()
*自 v0.6.9*

返回：Bool

使窗口填充屏幕同时保持其标题栏,像最大化按钮.`window:restore()` 恢复之前的大小.

```lua
window:maximize()
```

### window:minimize()
*自 v0.6.9*

返回：Bool

将窗口最小化到任务栏.

```lua
window:minimize()
```

### window:restore()
*自 v0.6.9*

返回：Bool

将最大化或最小化的窗口恢复到正常大小.

```lua
window:restore()
```

### window:focus()
*自 v0.6.9*

返回：Bool

将窗口带到前面并给它键盘焦点(如果另一个应用活动,OS 可能只闪烁它).

```lua
window:focus()
```

### 透明度和注意力

### window:opacity(value)
*自 v0.6.9*

参数：
- `value`(Number)——0.05..1,整个窗口多不透明

返回：Bool

使整个窗口(内容和框架)透视.值钳制到 0.05..1 所以窗口不能完全消失.

```lua
window:opacity(0.8)
```

### window:fade(to, time, ?ease)
*自 v0.6.9*

参数：
- `to`(Number)——目标不透明度,0.05..1
- `time`(Number)——秒
- `ease`(String?)——缓动名称,如补间中 [默认 linear]

返回：Bool

补间窗口不透明度.新调用或 `window:opacity` 取消运行中的淡出.

```lua
window:fade(0.3, 1, 'quadOut')
window:fade(1, 0.5)
```

### window:transparentColor(?color)
*自 v0.6.9*

参数：
- `color`(String?)——变成透视的十六进制颜色；省略或 `nil` 关闭它

返回：Bool

正好此颜色的每个像素变成窗口中的洞：桌面透出,点击去后面的窗口.用该颜色绘制应该消失的部分(例如相机背景)并让它远离你的艺术及其抗锯齿边缘.与 `window:opacity` 组合.仅 Windows.

```lua
camera:color('game', 'FF00FF')
window:transparentColor('FF00FF')
window:borderless(true)
```

### window:alwaysOnTop(?enable)
*自 v0.6.9*

参数：
- `enable`(Bool?)[默认 true]

返回：Bool

保持窗口在所有其他窗口之上.仅 Windows.

```lua
window:alwaysOnTop(true)
```

### window:flash(?count)
*自 v0.6.9*

参数：
- `count`(Int?)——闪烁多少次；0 停止 [默认 3]

返回：Bool

闪烁任务栏按钮以引起玩家注意(保持闪烁直到窗口聚焦).仅 Windows.

```lua
window:flash(3)
```

### 帧率和 GPU

### window:frameRate(fps)
*自 v0.6.0*

参数：
- `fps`(Int)——目标每秒帧数,更新和绘制都是(必须 >= 1)

返回：Bool

一起设置游戏的更新和绘制帧率(`FlxG.updateFramerate` 和 `drawFramerate`).便于游戏内 FPS 上限选项——从存档读取它并带合理默认.

```lua
window:frameRate(save:get('maxFps') or 60)
```

### window:vsync(?enable)
*自 v0.6.9*

参数：
- `enable`(Bool?)[默认 true]

返回：Bool

打开或关闭垂直同步.

```lua
window:vsync(false)
```

### window:preferDedicatedGpu(?enabled)
*自 v0.6.9*

参数：
- `enabled`(Bool?)——`true` 要求 Windows 在专用 GPU 上运行游戏,`false` 移除该设置 [默认 true]

返回：Bool

仅 Windows.写与 Settings → System → Display → Graphics → High performance 相同的每应用设置(仅当前用户,无需管理员权限,保留 exe 的其他 Windows 图形选项).引擎已在启动时要求 NVIDIA 和 AMD 驱动使用专用 GPU；这是驱动忽略该提示的笔记本电脑的安全网.从下次启动起生效.设置已更改时返回 `true`,已设置时返回 `false`.没有专用 GPU 的 PC 上 Windows 只是使用集成的.

```lua
function onCreate()
    window:preferDedicatedGpu()
end
```

### window:mouseLock(?enable)
*自 v0.6.9*

参数：
- `enable`(Bool?)[默认 true]

返回：Bool

将鼠标锁定在窗口内并隐藏它(相对鼠标模式).

```lua
window:mouseLock(true)
```

### 读取状态和对话框

### window:get(field)
*自 v0.6.9*

参数：
- `field`(String)——x和y和width和height和opacity和maximized和minimized和fullscreen和borderless和resizable和vsync和mouseLock和title和scale和displayWidth和displayHeight

返回：Dynamic

读取窗口值：`x`和`y`和`width`和`height`和`opacity`和`maximized`和`minimized`和`fullscreen`和`borderless`和`resizable`和`vsync`和`mouseLock`和`title`和`scale`和`displayWidth` 或 `displayHeight`.

```lua
if window:get('maximized') then window:restore() end
```

### window:screenshot(path)
*自 v0.7.7*

参数：
- `path`(String?)——保存 PNG 的位置.没有它文件去 `screenshots/`,按日期和时间命名

返回：String

将窗口现在显示的保存为 PNG,在帧绘制后,所以着色器和滤镜在它中.返回文件路径.

```lua
function onUpdate()
    if input:keyJustPressed('F12') then
        print('saved '..window:screenshot())
    end
end
```

### window:alert(message, ?title)
*自 v0.6.9*

参数：
- `message`(String)——消息框的文本
- `title`(String?)——标题

返回：Bool

显示原生消息框.游戏等到它关闭.

```lua
window:alert('Save file is corrupted', 'TH2L')
```

---

## 路径函数

`path` 命名空间构建命名路径点路径并使精灵自动行走它们.用 `path:create` + `path:add` 定义路径一次,然后用 `path:follow` 将任何精灵沿它发送——引擎每帧节点到节点移动它,可选旋转它面向旅行方向.基于 Flixel 的 `FlxPath`.

### 路径如何工作

路径是命名路径点(世界 x/y 点)列表.你构建它,然后附加到精灵：

| 步骤 | 调用 |
|---|---|
| 开始命名路径 | `path:create('lap')` |
| 按顺序添加路径点 | `path:add('lap', 200, 200)` |
| 将精灵沿它发送 | `path:follow('car', 'lap', 260, 'loop', true)` |

精灵的中心以给定速度依次移动到每个路径点.模式决定末端发生什么——`'forward'` 停止,`'loop'` 重启,`'yoyo'` 来回弹跳.开启 autoRotate 时,精灵转向面向它移动的方向(非常适合汽车和敌人和投射物).路径只是数据,所以一个路径可以驱动几个精灵,精灵可以随时重新指向新路径.路径在状态切换时释放.

### path:create(name)

参数：
- `name`(String)——新路径的名称(覆盖同名)

返回：Bool

开始新的空命名路径.如果此名称的路径已存在则先清除它.用 `path:add` 向它添加路径点.

```lua
path:create('lap')
path:add('lap', 200, 200)
path:add('lap', 1000, 200)
path:add('lap', 1000, 520)
path:add('lap', 200, 520)
```

### path:add(name, x, y)

参数：
- `name`(String)——要追加的路径(如果还不存在则即时创建)
- `x`(Float)——路径点世界 X
- `y`(Float)——路径点世界 Y

返回：Bool

向命名路径末尾追加路径点.路径点按添加顺序访问.你可以保持路径点稀疏——精灵在它们之间直线旅行.

```lua
for i = 1, 8 do
  path:add('zigzag', i * 140, (i % 2 == 0) and 200 or 420)
end
```

### path:follow(tag, name, speed, mode, autoRotate)

参数：
- `tag`(String)——沿路径移动的精灵
- `name`(String)——要跟随的路径(必须至少有一个路径点)
- `speed`(Float)——旅行速度(px/秒)[默认 100]
- `mode`(String)——`forward`(末端停止)和`backward`和`loop`和`loopback` 或 `yoyo` [默认 forward]
- `autoRotate`(Bool)——旋转精灵面向其旅行方向 [默认 false]

返回：Bool

将精灵沿命名路径发送：其中心以 `speed` 路径点移动到路径点,每帧自动推进.`mode` 控制末端——`'forward'` 运行一次并停止(用 `path:done` 轮询),`'loop'` 跳回开始并重复,`'yoyo'` 在每端反转.`autoRotate` 转动精灵面向其旅行方向.在同一精灵上重新调用在新路径上重启它.如果精灵或路径不存在,或路径为空则失败.

```lua
path:follow('car', 'lap', 260, 'loop', true)   -- 无尽圈,头朝前
path:follow('lift', 'shaft', 80, 'yoyo')       -- 电梯上下
path:follow('arrow', 'route', 400, 'forward')  -- 发射一次并停止
```

### path:stop(tag)

参数：
- `tag`(String)——要停止的精灵

返回：Bool

取消精灵的路径,将其冻结在它所在处并将移动控制交还给你(所以 `sprite:velocity` 再次工作).如果精灵没有跟随路径则返回 `false`.

```lua
if input:keyJustPressed('SPACE') then path:stop('car') end
```

### path:done(tag)

参数：
- `tag`(String)——要检查的精灵

返回：Bool

当 `'forward'` / `'backward'` 路径到达其末端时(或精灵没有路径)返回 `true`.循环和 yoyo 路径永不完成,所以对它们这保持 `false`.用它触发一次性移动到达后发生什么.

```lua
function onUpdate(elapsed)
  if path:done('arrow') then
    game:set('arrow.visible', false)
  end
end
```

### path:speed(tag, speed)

参数：
- `tag`(String)——当前跟随路径的精灵
- `speed`(Float)——新旅行速度(px/秒)

返回：Bool

更改已在跟随路径的精灵的旅行速度,而不重启它——将汽车加速到速度,或在电梯接近停止时减慢它.如果精灵不在路径上则返回 `false`.

```lua
path:speed('car', 260 + 120 * game:get('boost'))
```

### path:points(name)

参数：
- `name`(String)——路径名称

返回：Int

返回命名路径有多少路径点(如果不存在则 `0`).便于在循环中构建路径并在跟随前检查它.

```lua
print(path:points('lap'))   -- 4
```

### path:clear(name)

参数：
- `name`(String)——要删除的路径

返回：Bool

删除命名路径及其路径点.已跟随它的精灵保持其进行中的副本——清除只移除模板,所以之后重新跟随该名称失败直到重建.如果路径不存在则返回 `false`.

```lua
path:clear('lap')
```

---

## 幽灵 / 重放函数

`ghost` 命名空间记录精灵的运动——每帧的位置和角度——并将其重放到另一个精灵上.经典用途是计时赛幽灵：记录你的运行,然后在下一圈与它的半透明副本比赛.记录可以保存到磁盘并加载回来,所以最佳运行的幽灵在会话之间存活.

### 幽灵如何工作

幽灵是一个精灵 `x`和`y` 和 `angle` 的命名记录,每帧捕获一次.流程是记录 → 播放：

| 步骤 | 调用 |
|---|---|
| 开始捕获精灵 | `ghost:record('run', 'player')` |
| 完成记录 | `ghost:stop('run')` |
| 重放到精灵上 | `ghost:play('run', 'ghostSprite', true)` |

播放从记录驱动目标精灵的位置和角度,每游戏帧一个捕获帧——所以它以记录的速度移动(给幽灵精灵低 `alpha` 使它读作幻影).你记录一个精灵并播放到另一个上,所以原始保持在玩家控制下而幽灵重走运行.用 `ghost:save` 保存记录并在下次会话用 `ghost:load` 加载以保持赛道的单圈最佳幽灵.

### ghost:record(name, tag)

参数：
- `name`(String)——存储记录的名称(覆盖现有)
- `tag`(String)——要捕获运动的精灵

返回：Bool

开始每帧记录精灵的 `x`和`y` 和 `angle` 在 `name` 下.该名称的任何先前记录被替换.记录继续直到 `ghost:stop`(或精灵停止存在).如果精灵标签不存在则失败.

```lua
-- 开始一圈
ghost:record('lap', 'player')
```

### ghost:stop(name)

参数：
- `name`(String)——要完成的记录

返回：Bool

停止捕获.记录的帧留在内存中 `name` 下,准备好 `ghost:play` 或 `ghost:save`.如果该名称下没有记录则返回 `false`.

```lua
-- 冲过终点线
ghost:stop('lap')
print('captured ' .. ghost:frames('lap') .. ' frames')
```

### ghost:play(name, tag, loop)

参数：
- `name`(String)——要重放的记录
- `tag`(String)——用记录驱动的精灵
- `loop`(Bool)——到达结束时从头重启 [默认 false]

返回：Bool

将记录重放到精灵上,每帧从下一个捕获帧设置其 `x`和`y` 和 `angle`.`loop = false` 播放一次并停止；`true` 永远重复.给目标精灵低 alpha(`game:set('ghost.alpha', 0.4)`)使它看起来像幻影.如果记录为空或精灵不存在则失败.

```lua
sprite:add('ghost', 'ships/racer', {0, 0})
game:set('ghost.alpha', 0.4)
ghost:play('lap', 'ghost', true)   -- 循环记录的运行
```

### ghost:stopPlay(name)

参数：
- `name`(String)——要停止的播放记录

返回：Bool

停止进行中的重放.记录本身保留(稍后再次重放).如果没有在播放则返回 `false`.

```lua
ghost:stopPlay('lap')
```

### ghost:has(name)

参数：
- `name`(String)——记录名称

返回：Bool

如果 `name` 下存在非空记录(本次会话记录或从磁盘加载)则返回 `true`.在提供"与幽灵比赛"选项之前检查这个.

```lua
if ghost:has('best') then ghost:play('best', 'ghost', true) end
```

### ghost:frames(name)

参数：
- `name`(String)——记录名称

返回：Int

返回记录中捕获的帧数(如果不存在则 `0`).在稳定 60 FPS 下这大致是运行长度以 60 分之一秒为单位——除以 60 得秒——所以你可以比较两次运行.

```lua
local secs = ghost:frames('lap') / 60
text:set('time', string.format('%.2fs', secs))
```

### ghost:isPlaying(name)

参数：
- `name`(String)——记录名称

返回：Bool

重放记录期间返回 `true`.对于非循环幽灵,它在完成时翻回 `false`,所以你可以检测幽灵过线.

```lua
if not ghost:isPlaying('lap') then text:set('hud', 'ghost finished') end
```

### ghost:isRecording(name)

参数：
- `name`(String)——记录名称

返回：Bool

在 `ghost:record` 和 `ghost:stop` 之间积极捕获期间返回 `true`.

```lua
text:set('rec', ghost:isRecording('lap') and 'REC' or '')
```

### ghost:clear(name)

参数：
- `name`(String)——要丢弃的记录

返回：Bool

丢弃记录并停止使用该名称的任何记录或播放.如果它不存在则返回 `false`.

```lua
ghost:clear('lap')   -- 重新开始
```

### ghost:save(name, path)

参数：
- `name`(String)——要写入的记录
- `path`(String)——文件路径(如果你省略,添加 `.json` 扩展名)

返回：Bool

将记录作为 JSON 写入磁盘以便在会话之间存活.路径遵循与 `json:save` 相同的规则：相对路径解析到游戏可执行文件旁边,缺失的文件夹被创建.如果记录不存在则失败(或在没有文件访问的 web 构建上).

```lua
-- 新记录？存储幽灵
if ghost:frames('lap') < game:get('bestFrames') then
  ghost:save('lap', 'ghosts/track1')
  game:set('bestFrames', ghost:frames('lap'))
end
```

### ghost:load(name, path)

参数：
- `name`(String)——存储加载记录的名称
- `path`(String)——之前由 `ghost:save` 写入的文件路径

返回：Bool

将之前保存的记录加载到 `name`,准备好 `ghost:play`.如果文件缺失或不可读则失败.

```lua
function onCreate()
  if ghost:load('best', 'ghosts/track1') then
    sprite:add('ghost', 'ships/racer', {0, 0})
    game:set('ghost.alpha', 0.4)
    ghost:play('best', 'ghost', true)
  end
end
```

---

## 输入函数

`input` 命名空间暴露鼠标和键盘和绑定的游戏玩法音符动作(左/下/上/右).鼠标函数是位置和点击状态查询；键盘函数是按名称的状态检查；方向函数包装 `Controls.hx`,所以它们尊重引擎的音符动作绑定恰好的任何东西.

### 鼠标位置

位置获取器.世界坐标随活动相机滚动；屏幕坐标是窗口上的原始像素位置.

`mouse()`和`mouseX()` 和 `mouseY()` 接受可选相机标签——传递它以获得该相机世界空间(其滚动和缩放)中的光标,当对象住在活动相机之外的相机上(HUD/制作叠加层和小地图等)时这是你想要的.没有参数时它们使用活动相机,与以前完全一样.

| 函数 | 返回 | 备注 |
|---|---|---|
| `input:mouse(cam?)` | 表 `{x, y}` | 世界坐标(可选为相机 `cam`) |
| `input:mouseX(cam?)` | Float | 世界 x(可选为相机 `cam`) |
| `input:mouseY(cam?)` | Float | 世界 y(可选为相机 `cam`) |
| `input:mouseScreen()` | 表 `{x, y}` | 屏幕 / 窗口坐标 |
| `input:mouseScreenX()` | Float | 屏幕 x |
| `input:mouseScreenY()` | Float | 屏幕 y |

当定位相机锁定的 HUD 元素时,改用 `mouseScreen*`.

### input:mouse(cam?)

参数：
- `cam`(String)——测量的相机标签.省略以使用活动相机 [可选]

返回：Table

世界空间中的光标位置作为 `{x, y}`.世界空间跟随相机滚动和缩放,所以数字匹配精灵位置.当你比较的对象住在另一个相机上(HUD和小地图)时传递相机标签.

```lua
local m = input:mouse()
sprite:position('cursorDot', m.x, m.y)

local h = input:mouse('hud')   -- 在 HUD 相机的空间中
```

### input:mouseX(cam?)

参数：
- `cam`(String)——测量的相机标签.省略以使用活动相机 [可选]

返回：Float

世界空间中的光标 x.与 `input:mouse(cam).x` 相同.

```lua
sprite:position('crosshair', input:mouseX(), input:mouseY())
```

### input:mouseY(cam?)

参数：
- `cam`(String)——测量的相机标签.省略以使用活动相机 [可选]

返回：Float

世界空间中的光标 y.与 `input:mouse(cam).y` 相同.

```lua
sprite:position('crosshair', input:mouseX(), input:mouseY())
```

### input:mouseScreen()

返回：Table

游戏屏幕上的光标位置作为 `{x, y}`,忽略每个相机.用于永不滚动的东西,像 HUD 上的自定义光标.

```lua
local s = input:mouseScreen()
print(s.x, s.y)
```

### input:mouseScreenX()

返回：Float

游戏屏幕上的光标 x,忽略相机.

```lua
sprite:position('cursor', input:mouseScreenX(), input:mouseScreenY())
```

### input:mouseScreenY()

返回：Float

游戏屏幕上的光标 y,忽略相机.

```lua
sprite:position('cursor', input:mouseScreenX(), input:mouseScreenY())
```

### 鼠标按钮

所有三个鼠标按钮的点击状态检查.右和中按钮依赖 `FLX_MOUSE_ADVANCED` haxedef(在 `project.xml` 中启用).

| 函数 | 返回 | 备注 |
|---|---|---|
| `input:mousePressed()` | Bool | 左键按住 |
| `input:mouseJustPressed()` | Bool | 左键本帧按下 |
| `input:mouseJustReleased()` | Bool | 左键本帧弹起 |
| `input:mouseRightPressed()` | Bool | 右键按住 |
| `input:mouseRightJustPressed()` | Bool | 右键本帧按下 |
| `input:mouseRightJustReleased()` | Bool | 右键本帧弹起 |
| `input:mouseMiddlePressed()` | Bool | 中键按住 |
| `input:mouseMiddleJustPressed()` | Bool | 中键本帧按下 |
| `input:mouseMiddleJustReleased()` | Bool | 中键本帧弹起 |

### input:mousePressed()

返回：Bool

左鼠标按钮按住期间为真.`input:block()` 开启时返回 `false`.

```lua
if input:mousePressed() then
    print('mousePressed')
end
```

### input:mouseJustPressed()

返回：Bool

仅在左鼠标按钮按下的帧为真.`input:block()` 开启时返回 `false`.

```lua
if input:mouseJustPressed() then
    print('mouseJustPressed')
end
```

### input:mouseJustReleased()

返回：Bool

仅在左鼠标按钮松开的帧为真.`input:block()` 开启时返回 `false`.

```lua
if input:mouseJustReleased() then
    print('mouseJustReleased')
end
```

### input:mouseRightPressed()

返回：Bool

右鼠标按钮按住期间为真.`input:block()` 开启时返回 `false`.

```lua
if input:mouseRightPressed() then
    print('mouseRightPressed')
end
```

### input:mouseRightJustPressed()

返回：Bool

仅在右鼠标按钮按下的帧为真.`input:block()` 开启时返回 `false`.

```lua
if input:mouseRightJustPressed() then
    print('mouseRightJustPressed')
end
```

### input:mouseRightJustReleased()

返回：Bool

仅在右鼠标按钮松开的帧为真.`input:block()` 开启时返回 `false`.

```lua
if input:mouseRightJustReleased() then
    print('mouseRightJustReleased')
end
```

### input:mouseMiddlePressed()

返回：Bool

中鼠标按钮(滚轮点击)按住期间为真.`input:block()` 开启时返回 `false`.

```lua
if input:mouseMiddlePressed() then
    print('mouseMiddlePressed')
end
```

### input:mouseMiddleJustPressed()

返回：Bool

仅在中鼠标按钮按下的帧为真.`input:block()` 开启时返回 `false`.

```lua
if input:mouseMiddleJustPressed() then
    print('mouseMiddleJustPressed')
end
```

### input:mouseMiddleJustReleased()

返回：Bool

仅在中鼠标按钮松开的帧为真.`input:block()` 开启时返回 `false`.

```lua
if input:mouseMiddleJustReleased() then
    print('mouseMiddleJustReleased')
end
```

### 精灵上的鼠标

对光标进行点在精灵内检查——使精灵可点击的简单方式(按钮和拖动手柄和可点击角色).每个函数接受精灵标签,在精灵自己的相机上对光标与精灵当前边界进行命中测试,所以 HUD 相机上的按钮正常工作.不可见或完全透明的精灵从不注册.未知标签静默返回 `false`(每帧轮询安全).对于整个菜单项,优先使用组选择助手(`group:hovered` / `group:clicked`),它们返回光标下的索引.

| 函数 | 何时返回 True |
|---|---|
| `input:mouseOver(tag)` | 光标在精灵上(悬停) |
| `input:mouseClicked(tag)` | 左按钮本帧在它上按下 |
| `input:mouseDown(tag)` | 左按钮在它上按住 |
| `input:mouseReleased(tag)` | 左按钮本帧在它上弹起 |
| `input:mouseRightClicked(tag)` | 右按钮本帧在它上按下 |

### input:mouseOver(tag)

参数：
- `tag`(String)——精灵标签

返回：Bool

光标在精灵上(悬停)期间为真.测试使用精灵自己的相机,所以 HUD 按钮工作.隐藏或完全透明的精灵从不计数,未知标签只返回 `false`.`input:block()` 开启时返回 `false`.

```lua
if input:mouseOver('playBtn') then
    sprite:scale('playBtn', 1.1, 1.1)
else
    sprite:scale('playBtn', 1, 1)
end
```

### input:mouseClicked(tag)

参数：
- `tag`(String)——精灵标签

返回：Bool

左按钮在光标在精灵上时按下的帧为真.测试使用精灵自己的相机,所以 HUD 按钮工作.隐藏或完全透明的精灵从不计数,未知标签只返回 `false`.`input:block()` 开启时返回 `false`.

```lua
if input:mouseClicked('playBtn') then
    song:play('your-song')
end
```

### input:mouseDown(tag)

参数：
- `tag`(String)——精灵标签

返回：Bool

左按钮按住且光标在精灵上时为真.适合拖动手柄和按住充电按钮.测试使用精灵自己的相机,所以 HUD 按钮工作.隐藏或完全透明的精灵从不计数,未知标签只返回 `false`.`input:block()` 开启时返回 `false`.

```lua
if input:mouseDown('slider') then
    sprite:position('slider', input:mouseX() - 10, 300)
end
```

### input:mouseReleased(tag)

参数：
- `tag`(String)——精灵标签

返回：Bool

左按钮在光标在精灵上时松开的帧为真.用于释放时触发的按钮,像大多数菜单.测试使用精灵自己的相机,所以 HUD 按钮工作.隐藏或完全透明的精灵从不计数,未知标签只返回 `false`.`input:block()` 开启时返回 `false`.

```lua
if input:mouseReleased('backBtn') then
    state:change('menu')
end
```

### input:mouseRightClicked(tag)

参数：
- `tag`(String)——精灵标签

返回：Bool

右按钮在光标在精灵上时按下的帧为真.测试使用精灵自己的相机,所以 HUD 按钮工作.隐藏或完全透明的精灵从不计数,未知标签只返回 `false`.`input:block()` 开启时返回 `false`.

```lua
if input:mouseRightClicked('note') then
    sprite:remove('note')
end
```

### 光标

将 OS 箭头换成自定义光标图像(手和十字准星和主题指针),隐藏它,或恢复默认.图像像任何精灵一样通过 `Paths.image` 解析,光标的 hotspot 可以用偏移微调.自定义光标跨状态持续直到你重置它.

### input:cursor(img, scale, xOffset, yOffset, scaleWithWindow)

参数：
- `img`(String)——光标图像路径(无扩展名),通过 `Paths.image` 解析
- `scale`(Number)——光标缩放乘数 [默认 1]
- `xOffset`(Int)——水平 hotspot 偏移(像素)(点击相对于图像实际注册的位置)[默认 0]
- `yOffset`(Int)——垂直 hotspot 偏移(像素)[默认 0]
- `scaleWithWindow`(Bool?)——像游戏其余部分一样随窗口增长和缩小 [默认 true]

返回：Bool

用自定义图像(`FlxG.mouse.load`)替换鼠标光标并使其可见.偏移移动 hotspot——例如对于十字准星,偏移其大小的一半使中心成为点击点.如果找不到图像则返回 `false`(带错误控制台说明).

在脚本设置自己的光标之前,游戏显示系统光标,不是默认 Flixel 箭头.每帧用相同图像再次调用没有成本 v0.7.7.

```lua
input:cursor('ui/cursor_hand')

-- 一个 2x 十字准星,其中心是点击点
input:cursor('ui/crosshair', 2, -16, -16)
```

### input:cursorVisible(show)

参数：
- `show`(Bool)——`true` 显示光标,`false` 隐藏它 [默认 true]

返回：Bool

显示或隐藏鼠标光标(`FlxG.mouse.visible`).在游戏玩法中隐藏它,你自己驱动准星,或在过场动画中.

```lua
input:cursorVisible(false)   -- 隐藏
input:cursorVisible(true)    -- 显示
```

### input:cursorReset()

返回：Bool

恢复默认 Flixel 箭头光标(撤销自定义 `input:cursor`)并使其再次可见.

```lua
input:cursorReset()
```

### input:cursorAdd(name, img, scale, xOffset, yOffset)
*自 v0.6.0*

参数：
- `name`(String)——稍后用 `cursorUse` 切换的名称,例如 `"pointer"`和`"resize"`
- `img`(String)——光标图像路径(无扩展名),通过 `Paths.image` 解析
- `scale`(Number?)——光标缩放乘数 [默认 1]
- `xOffset`(Int?)——水平 hotspot 偏移(像素)[默认 0]
- `yOffset`(Int?)——垂直 hotspot 偏移(像素)[默认 0]

返回：Bool

提前注册命名光标类型——图像在这里加载一次,而不是每次切换.与 `cursorUse` 配对获得便宜的光标交换(悬停时的调整大小手柄和按钮上的手),而不每帧重新加载图像.

```lua
function onCreate()
    input:cursorAdd('pointer', 'ui/cursor')
    input:cursorAdd('hand', 'ui/cursor_hand')
end
```

### input:cursorUse(name, scaleWithWindow)
*自 v0.6.0*

参数：
- `name`(String)——之前用 `cursorAdd` 注册的名称
- `scaleWithWindow`(Bool?)——光标是否随游戏窗口缩放 [默认 true]

返回：Bool

切换到注册的光标类型.如果它已经是活动类型则无操作,所以每帧悬停按钮时调用它不重新加载任何东西.如果 `name` 从未用 `cursorAdd` 注册则失败.

```lua
if input:mouseOver('playButton') then
    input:cursorUse('hand')
else
    input:cursorUse('pointer')
end
```

### input:cursorType()
*自 v0.6.0*

返回：String

当前活动注册光标类型的名称,或如果没有活动(例如在 `input:cursor` 或 `input:cursorReset` 之后)则为空字符串.

```lua
print(input:cursorType())   -- 'hand',或如果不使用注册类型则为 ''
```

### input:setMaxCursorSize(px)
*自 v0.6.0*

参数：
- `px`(Number)——光标较大渲染轴的 cap,以 1x 游戏缩放的像素为单位

返回：Bool

限制任何光标(自定义或注册)允许渲染多大.超过此的光标图像或缩放按比例缩小以适应而不是绘制巨大——对某人放入超大图像的安全网.

```lua
input:setMaxCursorSize(96)
```

### 键盘

对 `FlxKey` 的按名称键的状态查询.名称不区分大小写匹配——`"space"` 和 `"SPACE"` 都解析.未知名称静默返回 `false` 而不是抛出.

| 函数 | 返回 |
|---|---|
| `input:keyPressed(name)` | Bool——键按住 |
| `input:keyJustPressed(name)` | Bool——键本帧按下 |
| `input:keyJustReleased(name)` | Bool——键本帧弹起 |
| `input:anyPressed()` | Bool——任何键按住 |
| `input:anyJustPressed()` | Bool——任何键本帧按下 |

常见名称常量(任何 `FlxKey` 字段工作)：

- 字母：`A`–`Z`

- 数字：`ZERO`和`ONE`和`TWO` … `NINE`

- 功能键：`F1`–`F12`

- 修饰键：`SHIFT`和`CONTROL`和`ALT`

- 空白 / 控制：`SPACE`和`ENTER`和`ESCAPE`和`TAB`和`BACKSPACE`

- 箭头：`LEFT`和`RIGHT`和`UP`和`DOWN`

### input:keyPressed(name)

参数：
- `name`(String)——键名称,任何 `FlxKey` 名称,不区分大小写：`SPACE`和`A`和`F1`和`SHIFT`和`LEFT`……

返回：Bool

键按住期间为真.未知名称返回 `false` 而不报错.`input:block()` 开启时返回 `false`.

```lua
if input:keyPressed('SHIFT') then
    speed = 2
end
```

### input:keyJustPressed(name)

参数：
- `name`(String)——键名称,任何 `FlxKey` 名称,不区分大小写：`SPACE`和`A`和`F1`和`SHIFT`和`LEFT`……

返回：Bool

仅在键按下的帧为真.用于一次性动作如打开菜单.未知名称返回 `false` 而不报错.`input:block()` 开启时返回 `false`.

```lua
if input:keyJustPressed('ESCAPE') then
    state:open('pause')
end
```

### input:keyJustReleased(name)

参数：
- `name`(String)——键名称,任何 `FlxKey` 名称,不区分大小写：`SPACE`和`A`和`F1`和`SHIFT`和`LEFT`……

返回：Bool

仅在键松开的帧为真.未知名称返回 `false` 而不报错.`input:block()` 开启时返回 `false`.

```lua
if input:keyJustReleased('SPACE') then
    print('charge released')
end
```

### input:anyPressed()

返回：Bool

任何键盘键按住期间为真.`input:block()` 开启时返回 `false`.

```lua
if input:anyPressed() then
    idleTime = 0
end
```

### input:anyJustPressed()

返回：Bool

任何键盘键按下的帧为真.适合"按任意键"屏幕.`input:block()` 开启时返回 `false`.

```lua
if input:anyJustPressed() then
    state:change('menu')
end
```

### 游戏玩法方向

包装引擎的音符动作绑定(见 `input/Controls.hx`).方向整数遵循音符线约定：

| Int | 方向 |
|---|---|
| `0` | 左 |
| `1` | 下 |
| `2` | 上 |
| `3` | 右 |

| 函数 | 返回 |
|---|---|
| `input:dirPressed(dir)` | Bool——方向按住 |
| `input:dirJustPressed(dir)` | Bool——方向本帧按下 |
| `input:dirJustReleased(dir)` | Bool——方向本帧弹起 |

因为这些包装 `Controls.hx`,在 Haxe 中重新绑定音符动作对 Lua 透明——无需每脚本绑定代码.

### input:dirPressed(dir)

参数：
- `dir`(Int)——0 = 左,1 = 下,2 = 上,3 = 右

返回：Bool

该方向的音符键按住期间为真.使用玩家在选项中的音符绑定,所以它跟随他们设置的任何键.0-3 之外的方向是错误.`input:block()` 开启时返回 `false`.

```lua
if input:dirPressed(0) then
    game:set('player.x', game:get('player.x') - 4)
end
```

### input:dirJustPressed(dir)

参数：
- `dir`(Int)——0 = 左,1 = 下,2 = 上,3 = 右

返回：Bool

该方向的音符键按下的帧为真.使用玩家在选项中的音符绑定,所以它跟随他们设置的任何键.0-3 之外的方向是错误.`input:block()` 开启时返回 `false`.

```lua
for d = 0, 3 do
    if input:dirJustPressed(d) then print('hit', d) end
end
```

### input:dirJustReleased(dir)

参数：
- `dir`(Int)——0 = 左,1 = 下,2 = 上,3 = 右

返回：Bool

该方向的音符键松开的帧为真.使用玩家在选项中的音符绑定,所以它跟随他们设置的任何键.0-3 之外的方向是错误.`input:block()` 开启时返回 `false`.

```lua
if input:dirJustReleased(2) then
    print('up released')
end
```

### 游戏手柄

跨手柄按钮 + 模拟查询加震动.`padPressed` / `padJustPressed` / `padJustReleased` 通过 `FlxG.gamepads.any*` 路由——任何连接的手柄都可以触发它们,所以合作玩家不需要指定槽位.`padAxis` 读取第一个活动手柄.按钮名称匹配 `FlxGamepadInputID`(不区分大小写)：`A`和`B`和`X`和`Y`和`LEFT_SHOULDER`和`RIGHT_SHOULDER`和`START`和`BACK`和`GUIDE`和`DPAD_UP`/`DOWN`/`LEFT`/`RIGHT`和`LEFT_STICK_CLICK`和`RIGHT_STICK_CLICK`和`LEFT_TRIGGER_BUTTON`和`RIGHT_TRIGGER_BUTTON` 等.

### input:padConnected()

返回：Bool

如果当前至少连接一个游戏手柄则返回 `true`.便宜；每帧安全调用以在键盘和手柄图标之间切换按钮提示.

```lua
if input:padConnected() then
   sprite:add('hint', 'ui/btn_A')
else
   sprite:add('hint', 'ui/key_space')
end
```

### input:padCount()

返回：Int

活动(连接)游戏手柄的数量.用于门控合作模式.

```lua
if input:padCount() >= 2 then state:open('coop_lobby') end
```

### input:padPressed(button)

参数：
- `button`(String)——来自 `FlxGamepadInputID` 的按钮名称(例如 `A`和`DPAD_UP`和`LEFT_SHOULDER`)

返回：Bool

任何连接手柄上本帧按住.未知按钮名称引发 Lua 错误.

```lua
if input:padPressed('A') then -- 跳跃 ... end
```

### input:padJustPressed(button)

参数：
- `button`(String)——按钮名称

返回：Bool

边缘触发：仅在按钮按下的帧为 `true`.用于菜单确认和单次能力.

```lua
if input:padJustPressed('START') then state:open('pause') end
```

### input:padJustReleased(button)

参数：
- `button`(String)——按钮名称

返回：Bool

边缘触发释放.与 `padJustPressed` 配对用于按住充电机制.

```lua
if input:padJustReleased('A') and chargeT > 0.5 then fireBigShot() end
```

### input:padAxis(name)

参数：
- `name`(String)——轴短名称：`lx`/`ly`/`rx`/`ry`/`lt`/`rt`(长格式别名 `leftx`和`right_trigger` 等也工作)

返回：Number

读取第一个活动手柄的模拟轴.摇杆返回 `-1..1`,Flixel 应用死区.触发器(`lt`/`rt`)返回 `0..1`.没有连接手柄时返回 `0`.未知轴名称引发 Lua 错误.

```lua
local mx = input:padAxis('lx')
local my = input:padAxis('ly')
sprite:velocity('player', mx * SPEED, my * SPEED)
```

### input:rumble(intensity, duration, strong)

参数：
- `intensity`(Number?)——高频(轻)马达强度,`0..1`(默认 `0.5`)
- `duration`(Number?)——长度(秒)(默认 `0.3`)
- `strong`(Number?)——低频(重)马达强度,`0..1`.默认为与 `intensity` 相同的值以获得对称震动

返回：Bool

震动第一个活动手柄.两个马达强度钳制到 `0..1`.如果设备接受命令则返回 `true`,如果没有连接手柄或设备不支持震动则返回 `false`.在现有震动持续时间内的调用替换它(无排队).

```lua
if input:padJustPressed('A') then input:rumble(0.8, 0.15) end

function onPlayerHit()
  input:rumble(0.3, 0.6, 1.0)  -- 轻嗡嗡 + 重砰
end
```

### input:rumbleAll(intensity, duration, strong)

参数：
- `intensity`(Number?)——高频马达,`0..1`(默认 `0.5`)
- `duration`(Number?)——长度(秒)(默认 `0.3`)
- `strong`(Number?)——低频马达,`0..1`.默认为 `intensity`

返回：Int

震动每个连接的手柄.返回实际震动的手柄数.在影响每个人的多人事件中使用(boss 击败震动和关卡结束号角).

```lua
if bossDefeated then input:rumbleAll(1.0, 1.2) end
```

### 任何输入

镜像 `game:get` 模式——常见输入键的策划注册表,加上一个反射回退,行走 `flixel.FlxG`,所以任何嵌套字段可到达而无需添加包装.

注册键

| 键 | 类型 | 来源 |
|---|---|---|
| `mouseX` / `mouseY` | Float | `FlxG.mouse.x` / `.y`(世界) |
| `mouseScreenX` / `mouseScreenY` | Float | `FlxG.mouse.screenX` / `.screenY` |
| `mouseWheel` | Int | `FlxG.mouse.wheel` |
| `mouseDeltaX` / `mouseDeltaY` | Float | `FlxG.mouse.deltaX` / `.deltaY`(帧增量) |
| `mousePressed` | Bool | `FlxG.mouse.pressed` |
| `mouseJustPressed` | Bool | `FlxG.mouse.justPressed` |
| `mouseJustReleased` | Bool | `FlxG.mouse.justReleased` |
| `mouseRightPressed` | Bool | `FlxG.mouse.pressedRight` |
| `mouseRightJustPressed` | Bool | `FlxG.mouse.justPressedRight` |
| `mouseRightJustReleased` | Bool | `FlxG.mouse.justReleasedRight` |
| `mouseMiddlePressed` | Bool | `FlxG.mouse.pressedMiddle` |
| `mouseMiddleJustPressed` | Bool | `FlxG.mouse.justPressedMiddle` |
| `mouseMiddleJustReleased` | Bool | `FlxG.mouse.justReleasedMiddle` |
| `anyPressed` | Bool | `FlxG.keys.pressed.ANY` |
| `anyJustPressed` | Bool | `FlxG.keys.justPressed.ANY` |

此表之外的任何内容首先与 `FlxKey` 名称匹配——`input:get('SPACE')`和`input:get('a')`和`input:get('F1')` 都返回该键当前按住状态(不区分大小写).当你想要一帧边缘时使用 `input:keyJustPressed(name)`.

如果路径不是注册键或 `FlxKey` 名称,它落到对 `FlxG` 的反射行走,所以 `input:get('mouse.pressed')` 和 `input:get('keys.justPressed.A')` 仍为临时读取工作.

### 速查表——如何读取 input:get

一个函数,三种模式——你传递什么决定你得到什么回来.

| 你写 | 你得到回来 | 何时使用 |
|---|---|---|
| `input:get()` | 你按住的键的名称,例如 `"SPACE"` 或如果没有按住则为 `nil` | "用户现在按什么键？" |
| `input:get('SPACE')` | 如果 SPACE 按住则为 `true`,否则 `false` | "这个特定键按下吗？" |
| `input:get('mouseX')` | 一个数字,例如 `642` | "给我一个注册值"(鼠标和注册输入) |
| `input:get('mouse.wheel')` | `FlxG.mouse.wheel` 当前的任何东西 | "我知道我想要什么,走进 FlxG 并抓取它" |

心理模型："给我路径处的值,或——如果没有路径——第一个按住的键."其他一切只是值从哪里来源(注册表和键快捷方式或反射行走).

### input:get(?path)

参数：
- `path`(String)——注册键和`FlxKey` 名称或进入 `FlxG` 的点分路径.可选——省略时,使用无参数形式.

返回：any | String | nil

有 `path` 时：返回那里的值,或如果注册表和键快捷方式和反射行走都不解析则返回 `nil`.

无参数时：扫描固定探针列表(字母和数字和SPACE和ENTER和ESCAPE和TAB和BACKSPACE和修饰键和箭头和F1-F12)并返回第一个按住的键的名称(`"SPACE"`和`"A"`和`"F1"`……),或 `nil`.每帧轮询,所以按住的键连续报告——将其锁存到局部变量以进行一次性边缘检测(见按下 / 按住 / 释放示例),或使用 `input:keyJustPressed(name)` 用于探针列表之外的特定键.

```lua
-- 无参数形式：轮询用户当前按住的键
function onUpdate(elapsed)
    local k = input:get()
    if k then print('held:', k) end
end

-- 路径形式
print(input:get('mouseX'))                  -- 注册表命中,例如 642
print(input:get('SPACE'))                   -- 键快捷方式：按住期间为 true
print(input:get('a'))                       -- 不区分大小写
print(input:get('mouse.wheel'))             -- 反射回退
print(input:get('keys.justPressed.SPACE'))  -- 反射回退
```

### input:has(path)

参数：
- `path`(String)——要探测的注册键或点分路径

返回：Bool

当路径在注册表中或反射行走产生非 `nil` 值时返回 `true`.当脚本可能在某个输入源不活动的状态中运行时有用.

```lua
if input:has('mouseJustPressed') and input:get('mouseJustPressed') then
    print('click')
end
```

### input:block(enabled)
*自 v0.6.1*

参数：
- `enabled`(Bool?)——阻止(true)或解除阻止(false)下面每个输入查询 [默认 true]

返回：Bool

一个开关使此文件中的每个按下/点击/悬停查询报告没有按下任何东西：`input:mousePressed` 及朋友和`input:mouseOver`/`mouseClicked`/`mouseDown`/`mouseReleased`和`input:keyPressed`/`keyJustPressed`/`keyJustReleased`和`input:anyPressed`/`anyJustPressed`和`input:dirPressed` 及朋友和手柄 `pad*Pressed` 函数和其中任何一个的 `input:get(path)`,以及 `sprite:overlap`/`backdrop:overlap` 的无参数"测试鼠标光标"形式.它不触及位置获取器(`mouseX`和`mouseScreen`和`padAxis`……),所以被阻止的脚本仍然可以读取光标在哪里,只是不读取那里是否按下了任何东西.

用于过渡动画——阻止每个按钮对动画中途落下的点击做出反应,而无需每个按钮自己检查标志.状态切换自动清除它,所以忘记解除阻止不会软锁输入超过下一状态.

```lua
input:block(true)
timer:start('unblock', 1, function() input:block(false) end)

-- 与此同时每个按钮自己的点击检查什么都不做
if input:mouseJustReleased() and sprite:overlap('btn') then end
```

### input:isBlocked()
*自 v0.6.1*

返回：Bool

`input:block` 开启期间为 `true`.

```lua
if input:isBlocked() then return end
```

### input:touchScroll(enabled, ?step, ?inertia)
*自 v0.7.1*

参数：
- `enabled`(Bool)——打开或关闭轻扫滚动.默认开启.
- `step`(Float)——多少像素轻扫算一个滚轮档.默认 70.
- `inertia`(Bool)——快速轻扫后继续滚动片刻.默认 true.

返回：Bool

在手机和触摸屏上,垂直轻扫像鼠标滚轮：每 `step` 像素轻扫向 `input:get('mouseWheel')` 添加一个(上扫 = 轮下,像滚动列表).现有滚轮代码在 Android 上无需更改即可工作.当触摸变成轻扫时,释放不算点击,所以滚动后手指在按钮上抬起不会按下它.读取 `input:get('touchDragging')` 了解轻扫是否进行中.

```lua
input:touchScroll(true, 90)

function onUpdate(dt)
    if input:get('mouseWheel') ~= 0 then
        scrollList(-input:get('mouseWheel'))
    end
end
```

---

## 键位函数

`keybind` 命名空间将命名动作映射到输入,所以脚本询问"跳跃是否按下"而不是命名键——并且玩家可以重新绑定它而脚本不变.绑定跨状态切换持续(它们是设置,不是每状态状态),并可以保存到玩家的存档文件.

### 动作和绑定

动作是你选择的小写名称(`'jump'`和`'confirm'`).绑定是键名称(`'SPACE'`)或以 `pad:` 为前缀的手柄按钮(`'pad:A'`).

一个动作可以一次持有几个绑定——键盘键和手柄按钮并排,任何一个触发都算.未知输入名称在绑定时大声失败,而不是静默永不触发.

动作的第一次 `keybind:set` 是 `keybind:reset` 返回的.因此在启动时声明你的绑定也是声明默认值；之后设置的任何东西被视为在其上的重新绑定.

### 音符车道动作

四个音符车道从与一切相同的 `keybind` 系统读取：`'left'`和`'down'`和`'up'` 和 `'right'`.没有单独的音符输入 API——重新绑定这四个动作的设置屏幕立即改变游戏玩法输入,无需 PlayState 特定接线.

每个车道第一次检查且还没有绑定时播种两个默认绑定——一个字母键加匹配箭头：`left`：`D` / `LEFT`,`down`：`F` / `DOWN`,`up`：`J` / `UP`,`right`：`K` / `RIGHT`.由于播种只在动作仍未绑定时发生,在歌曲开始前调用的 `keybind:set('left', ...)` 干净地覆盖它而不是与之竞争.

### 设置键

### keybind:set(action, keys)
*自 v0.5.6*

参数：
- `action`(String)——动作名称
- `keys`(String | Table)——一个键名称,或它们的数组.手柄按钮加 `'pad:'` 前缀

返回：Bool

替换 `action` 上的每个绑定.如果 `keys` 为空或包含引擎不认识则失败.动作的第一次调用还记录 `keybind:reset` 使用的默认值.

```lua
keybind:set('jump', 'SPACE')
keybind:set('jump', {'SPACE', 'W', 'pad:A'})
```

### keybind:setDefault(action, keys)
*自 v0.6.0*

参数：
- `action`(String)——动作名称
- `keys`(String | Table)——一个键名称,或它们的数组

返回：Bool

像 `keybind:set`,但从不触及已绑定到某些东西的动作——它只填充默认记录(用于 `reset`/`isDefault`)以及在还没有绑定时填充活动绑定.在你的启动脚本中 `keybind:load()` 之后调用：用这个注册你的硬编码默认值而不是 `set`,预先加载的存档永远不会被它们覆盖.

```lua
function onCreate()
    keybind:load()          -- 拉入已保存的任何东西

    keybind:setDefault('jump', 'SPACE')   -- 仅在 'jump' 没有加载任何东西时生效
    keybind:setDefault('dash', 'SHIFT')
end
```

### keybind:add(action, key)
*自 v0.5.6*

参数：
- `action`(String)——动作名称
- `key`(String)——要追加的输入

返回：Bool

向 `action` 添加另一个绑定,保留现有的.重复被忽略.

```lua
keybind:set('jump', 'SPACE')
keybind:add('jump', 'pad:A')
```

### keybind:setAt(action, slot, key)
*自 v0.5.6*

参数：
- `action`(String)——动作名称
- `slot`(Int)——替换哪个绑定,1 基.超过末尾追加
- `key`(String)——绑定的输入

返回：Bool

重新绑定动作的一个槽位,其他保持不变,这是带有 Primary 和 Alternate 列的菜单需要的.触发 `onKeybindChanged`.

```lua
keybind:setAt('jump', 2, 'pad:A')   -- 仅备用绑定
```

### keybind:removeKey(action, key)
*自 v0.5.6*

参数：
- `action`(String)——动作名称
- `key`(String)——要解绑的输入

返回：Bool

从动作解绑一个输入,其他绑定保留.如果该输入未绑定则返回 `false`.触发 `onKeybindChanged`.

```lua
keybind:removeKey('jump', 'W')
```

### keybind:remove(action)
*自 v0.5.6*

参数：
- `action`(String)——要完全丢弃的动作

返回：Bool

移除动作及其所有绑定.记录的默认值保留,所以之后的 `keybind:set` 仍然可以重置.

```lua
keybind:remove('debugToggle')
```

### keybind:clear()
*自 v0.5.6*

返回：Bool

一次移除每个动作.默认值保留.

```lua
keybind:clear()
```

### keybind:reset(action)
*自 v0.5.6*

参数：
- `action`(String)——要重置的动作.省略以重置每个动作 [可选]

返回：Bool

将动作放回其第一次 `keybind:set` 的键.没有动作时,重置所有.

```lua
keybind:reset('jump')
keybind:reset()          -- 每个动作
```

### keybind:defaultOf(action)
*自 v0.5.6*

参数：
- `action`(String)——动作名称

返回：Table

动作的默认键,而不应用它们.如果动作没有默认则为空表.

```lua
print('default: '..table.concat(keybind:defaultOf('jump'), ', '))
```

### keybind:isDefault(action)
*自 v0.5.6*

参数：
- `action`(String?)——动作名称.省略以检查每个动作 [可选]

返回：Bool

如果动作仍有其默认键则为 `true`.没有动作时,仅当什么都没改变时才为 `true`：用它灰化 Reset 按钮或显示"已修改"标记.

```lua
if not keybind:isDefault() then
    text:set('hint', 'R resets to defaults')
end
```

### keybind:setExclusive(on?)
*自 v0.5.6*

参数：
- `on`(Bool)——启用独占绑定 [默认 true]

返回：Bool

开启时,将一个输入绑定到一个动作会从其他每个动作中移除它(每个失去的动作触发自己的 `onKeybindChanged`).默认关闭,因为在动作之间共享输入有时是故意的.

```lua
keybind:setExclusive(true)
```

### 读取动作

### keybind:pressed(action)
*自 v0.5.6*

参数：
- `action`(String)——动作名称

返回：Bool

动作绑定的任何输入按住期间为 `true`,键盘或手柄.未知动作返回 `false`,重新绑定等待键时一切也返回 `false`(见 `keybind:listen`).

```lua
if keybind:pressed('run') then speed = 600 end
```

### keybind:justPressed(action)
*自 v0.5.6*

参数：
- `action`(String)——动作名称

返回：Bool

仅在动作的一个输入按下的帧为 `true`.

```lua
if keybind:justPressed('jump') then game:set('player.velocity.y', -900) end
```

### keybind:justReleased(action)
*自 v0.5.6*

参数：
- `action`(String)——动作名称

返回：Bool

仅在动作的一个输入松开的帧为 `true`.

```lua
if keybind:justReleased('charge') then shoot() end
```

### keybind:anyJustPressed(actions)
*自 v0.5.6*

参数：
- `actions`(Table)——动作名称数组

返回：Bool

如果列出的任何动作刚按下则为 `true`——用于接受几种确认方式的菜单.

```lua
if keybind:anyJustPressed({'confirm', 'jump'}) then select() end
```

### keybind:get(action)
*自 v0.5.6*

参数：
- `action`(String)——动作名称

返回：Table

绑定到动作的键,按槽位顺序.

```lua
for i, key in ipairs(keybind:get('jump')) do print(i, key) end
```

### keybind:count(action)
*自 v0.5.6*

参数：
- `action`(String)——动作名称

返回：Int

动作绑定了多少键.

```lua
if keybind:count('jump') == 0 then text:set('warn', 'Jump has no key!') end
```

### keybind:has(action)
*自 v0.5.6*

参数：
- `action`(String)——动作名称

返回：Bool

如果动作存在则为 `true`.

```lua
if not keybind:has('dash') then keybind:set('dash', {'SHIFT'}) end
```

### keybind:list()
*自 v0.5.6*

返回：Table

每个动作的名称,用于构建控制菜单.

```lua
for _, a in ipairs(keybind:list()) do
    print(a, keybind:display(a))
end
```

### keybind:conflicts(key)
*自 v0.5.6*

参数：
- `key`(String)——要检查的输入,像 `SPACE` 或 `pad:A`

返回：Table

已经使用输入的动动作,所以重新绑定屏幕可以在占用它之前警告.如果你想要它为你处理,使用 `keybind:setExclusive` 代替.

```lua
local clash = keybind:conflicts('SPACE')
if #clash > 0 then print('already used by '..clash[1]) end
```

### keybind:display(action, separator?)
*自 v0.5.6*

参数：
- `action`(String)——动作名称
- `separator`(String)——绑定之间的文本 [默认 ' / ']

返回：String

动作绑定的可打印列表,手柄条目美化——例如 `"SPACE / W / Pad DPAD UP"`.动作没有时为空字符串.

```lua
text:set('row1', 'JUMP   ' .. keybind:display('jump'))
```

### 重新绑定屏幕

`keybind:listen(action)` 将玩家按下的下一个输入交给该动作.优先使用它而不是自己轮询 `keybind:capture`——它处理两件容易出错的事：

- 武装时每个 keybind 查询报告 `false`,所以打开提示的 ENTER 不会也重新触发菜单的确认处理程序.

- 它在捕获前跳过一帧.打开提示的键在那帧仍然是"刚按下",所以朴素实现会立即将 ENTER 绑定到你正在重新绑定的任何东西.

ESCAPE 默认取消；如果你需要绑定 ESCAPE 本身,传递不同的 `cancelKey`.更改通过回调到达,所以保存和重绘在一个地方.

### keybind:listen(action, slot?, cancelKey?)
*自 v0.5.6*

参数：
- `action`(String)——要重新绑定的动作
- `slot`(Int)——替换哪个绑定,1 基.超过末尾追加 [默认 1]
- `cancelKey`(String)——中止提示的键 [默认 'ESCAPE']

返回：Bool

武装重新绑定：按下的下一个输入分配给 `action` 并触发 `onKeybindChanged`.按 `cancelKey` 中止并改为触发 `onKeybindCancel`.武装时,每个 keybind 查询返回 `false`.

```lua
keybind:listen('jump')            -- 替换主绑定
keybind:listen('jump', 2)         -- 替换备用
keybind:listen('back', 1, 'F1')   -- 以便 ESCAPE 本身可以绑定
```

### keybind:listening()
*自 v0.5.6*

返回：String | nil

当前正在重新绑定的动作,或 `nil`.用它绘制"按键..."行.

```lua
local busy = keybind:listening()
if busy ~= nil then text:set('hint', 'press any key for ' .. busy) end
```

### keybind:cancel()
*自 v0.5.6*

返回：Bool

从脚本中止武装的重新绑定.如果没有在监听则返回 `false`.不触发 `onKeybindCancel`——那是给玩家按取消键的.

```lua
keybind:cancel()
```

### keybind:capture(includePad?)
*自 v0.5.6*

参数：
- `includePad`(Bool)——也报告手柄按钮 [默认 true]

返回：String | nil

本帧按下的任何东西的名称,或 `nil`——已经格式化为直接喂回 `keybind:set`(手柄按钮带 `pad:` 前缀).`keybind:listen` 背后的低级构建块；仅当 `listen` 的捕获行为不够时才使用它.

```lua
local k = keybind:capture()
if k ~= nil then print('pressed ' .. k) end
```

### 回调

| 回调 | 何时触发 |
|---|---|
| `onKeybindChanged(action, keys)` | 任何绑定改变——`listen` 分配和`setAt`和`removeKey` 或 `setExclusive` 剥离.`keys` 是动作的新绑定数组. |
| `onKeybindCancel(action)` | 玩家在 `keybind:listen` 提示期间按了取消键. |

两者都广播到每个脚本,所以一个地方可以拥有保存和重绘,而不是通过每个编辑路径线程化.

### 保存

### keybind:save()
*自 v0.5.6*

返回：Bool

立即将每个当前绑定写入玩家的存档文件.

```lua
function onKeybindChanged(action, keys)
    keybind:save()
end
```

### keybind:load()
*自 v0.5.6*

返回：Bool

将保存的绑定读回当前绑定之上.如果尚未保存则返回 `false`.先用 `keybind:set` 声明默认值,然后调用这个.不再有效的键被跳过.

```lua
keybind:set('jump', {'SPACE', 'pad:A'})
keybind:load()
```

### 示例

### 完整设置屏幕

一个完整的可重新绑定控制屏幕——导航和每行"已修改"标记和重新绑定和重置和自动保存.作为 `scripts/examples/keybinds.lua` 发布.

---

## 歌曲函数

`song` 命名空间包装音频管道.`song:play(name)` 是高级"开始游戏玩法"调用——它切换到 `LoadingState`,它在工作线程上异步加载谱面 + 伴奏 + 声乐(显示加载条),然后在内存中一切后过渡到 `PlayState`.其他条目在歌曲已在 `PlayState` 内运行时控制播放.

### 加载和播放

### song:load(name, stages?)

参数：
- `name`(String|Array)——歌曲文件夹名称,或它们的列表.第一个现在加载,其余在后台预取 v0.5.8
- `stages`(Array?)——每首歌曲的舞台,按位置匹配.它们的艺术也预加载 v0.5.8 [可选]

返回：Bool

通过 `SongLoader` 异步预加载 `name`(谱面和伴奏和声乐——`LoadingState` 使用的相同管道).如果 `name` 为空或 `nil` 则返回 `false`.在 `song:play()` 之前预热它,使加载屏幕即时.

```lua
song:load('your-song')
-- ... 之后,一旦 song:loaded() == true ...
song:play()
```

### song:loaded()

返回：Bool

最近一次 `song:load` 无错误完成后返回 `true`.仍在加载和加载失败时返回 `false`.

```lua
if song:loaded() then
    song:play()
end
```

### song:play(name?, stages?, variant?, script?)

参数：
- `name`(String|Array)——歌曲名称,或它们的列表——第一个播放,其余预取 v0.5.8.省略时,回退到最后 `song:load` 目标.[可选]
- `stages`(Array?)——每首歌曲的舞台,按位置匹配——即使一个舞台也传递列表,因为这里的普通字符串会被读作 `variant` v0.5.8 [可选]
- `variant`(String)——可选伴奏/声乐变体标签(例如 `'erect'`).选择标记的子歌曲音频集——见下面的子歌曲.[可选]
- `script`(String|Bool?)——可选脚本 id 在 `PlayState` 内继续运行.省略它,引擎自动携带调用状态的脚本——见下面的携带你的脚本.传递 `false` 以无携带脚本开始歌曲：仅启动歌曲的菜单(故事模式和自由模式)应该这样做,否则菜单脚本在歌曲内再次运行 v0.7.3.[可选]

返回：Bool

切换到 `name` 的 `LoadingState`(或最近 `song:load` 的歌曲如果省略),然后加载完成后自动切换到 `PlayState`.如果无法解析歌曲名则返回 `false`.

歌曲住在哪里：谱面在 `assets/charts/<name>/<name>.json`,音频在 `assets/audio/music/<name>/`(`Inst` 加 `Voices` / `Voices-Player` / `Voices-Opponent`).名称匹配容忍大小写/拼写(`My Song` 找到 `my-song`),Freak 和 Psych Engine 谱面格式都读取.默认没有谱面发布——将你自己的放入 `assets/charts/`.

Funkin' 模式：默认是裸音符高速公路(音符线和音符和HUD).在调用它之前设置 `game:set('funkinStyle', true)` 以添加角色和相机跟随和节拍脉冲缩放——一个持久标志(见游戏注册表),不是每次调用参数.

子歌曲(变体)：传递 `variant` 标签以加载替代音频——按顺序尝试：`<song>/Inst-<variant>`,然后 `<base>/Inst-<variant>`,然后普通 `Inst`(以及匹配的 `Voices-<variant>`).所以变体可以住在其自己的文件夹中或作为基础歌曲旁边的额外文件.已经以变体结尾的谱面名称(`your-song-erect`)自动检测.

携带你的脚本：从脚本驱动状态调用 `song:play` 使该脚本在 `PlayState` 内继续运行——`onCreate`和`onUpdate`和节拍回调和它构建的一切在切换中存活.调用 `LuaState` 的脚本自动携带；传递 `script` 携带另一个.再次为已在播放的歌曲调用 `song:play` 是无操作,所以在 `onCreate` 顶部安全.在 `PlayState` 外切换只在下一帧发生,所以跟随 `if not game:get('songName') then return end`——否则 `onCreate` 的其余部分构建整个场景两次(一次在 LuaState,一次在 PlayState)并闪烁一帧.

缺失歌曲 v0.6.9：如果谱面找不到或读不了,加载屏幕隐藏其条,显示简短的 `Song "name" not found`(或 `failed to load`),并在 `1.5` 秒后返回歌曲进入的 LuaState.当 `song:play` 在 LuaState 自己的 `onCreate` 内运行时,那是它之前的状态(所以它不能循环回同一失败调用).

```lua
song:play('your-song')          -- 最小：音符 + HUD 仅

game:set('funkinStyle', true) -- 选择完整 Funkin' 呈现
song:play('your-song')          -- 现在有角色和相机和节拍碰撞

song:play('your-song', 'erect')  -- 使用 erect 伴奏 + 声乐
song:play('your-song-erect')     -- 相同,从名称自动检测

-- 你的整个脚本在 PlayState 中继续运行(相机和精灵和HUD)
song:play('your-song')

song:load('your-song')          -- 异步预加载
song:play()                   -- 播放预加载的歌曲

-- 从菜单：开始歌曲而不将菜单脚本带入其中
song:play('your-song', {'your-stage'}, nil, false)
```

### 哪个脚本在歌曲中运行

顺序是 `song:play(name, stages, variant, script)`.第三个值是声音变体(像 `'erect'`),不是脚本.没有给脚本时,你调用它的屏幕的脚本随你进入歌曲.它的 `onCreate` 在那里再次运行,所以它制作的一切也出现在歌曲中：菜单按钮和背景视频和任何东西.

为了安全,用表命名脚本,不依赖顺序.

### song:stop()

返回：Bool

停止歌曲并销毁其 `FlxSound` 实例.用它干净地结束播放；`PlayState` 会检测停止的歌曲并重置.总是返回 `true`.

```lua
song:stop()
```

### song:pause()

返回：Bool

就地暂停伴奏和两个声乐轨道,并随之冻结游戏世界——补间和计时器(包括 `sprite:lifetime`)和标记声音和精灵动画和速度/重力和发射器和丝带轨迹和动画着色器时钟都停在它们所在处.如果没有加载歌曲则返回 `false`.

冻结是快照：只有暂停时刻正在运行的东西被触及,只有那组被恢复.所以在它上面打开的暂停菜单正常动画(从不在快照中),你的脚本已经暂停的任何东西在恢复中保持暂停,而不是被强制启动.

```lua
song:pause()
-- 在这里打开你的暂停菜单；它自己的补间仍然运行
state:open('menu/pause')
```

### song:resume()

返回：Bool

恢复暂停的歌曲,重新同步声乐轨道到伴奏,并解冻 `song:pause` 冻结的恰好东西——你的脚本自己停止的任何东西不会重启.如果没有加载歌曲则返回 `false`.

```lua
song:resume()
```

### song:paused()
*自 v0.5.5*

返回：Bool

歌曲暂停期间为 `true`.让暂停菜单读取状态而不是跟踪自己的标志.

```lua
if song:paused() then song:resume() else song:pause() end
```

### song:restart()
*自 v0.5.5*

返回：Bool

从 `0` 重启当前歌曲——引擎在歌曲结束循环时走的相同路径：音频停止并重放,池化音符被杀,音符/事件索引倒回,两个音符线重置,Stats/HUD 刷新,相机缩放回到基础,`onSongStart` 再次触发.任何 `song:pause` 冻结和输入门被释放,所以从暂停菜单重启落在真正运行的歌曲中.在游戏玩法外失败.

从任何地方调用安全——`onEvent`和`onNoteHit`和`onUpdate`和计时器和补间的 `onComplete`.重置排队并在帧中的安全点应用,不在任何迭代中的循环下面.

```lua
if input:keyJustPressed('R') then song:restart() end
```

### 倒计时

### song:startCountdown(?amount)
*自 v0.7.2*

参数：
- `amount`(Int?)——滴答数,以歌曲起始 BPM 每拍一个.`0` 立即开始音乐.省略时,使用谱面的 Countdown 值 [默认谱面值]

返回：Bool

开始倒计时然后在 `song:holdStart()` 保持它之后开始歌曲.每个滴答触发 `onCountdownTick(tick, left)`,音符在倒计时期间滚入.在没有保持的情况下歌曲开始前调用,它只设置自动倒计时使用多少滴答并返回 `false`.

```lua
function onCreate()
    song:holdStart()
    timer:start('intro', 2, function()
        song:startCountdown(4)
    end)
end
```

### song:holdStart()
*自 v0.7.2*

返回：Bool

防止歌曲自行开始,用于先过场动画或对话.在 `onCreate` 中调用,然后在准备好时 `song:startCountdown()`.它只保持一次开始：重启直接播放.

```lua
function onCreate()
    song:holdStart()
end
```

### song:waitingStart()
*自 v0.7.2*

返回：Bool

被保持的歌曲等待 `song:startCountdown` 期间为 `true`.

```lua
if song:waitingStart() and input:keyJustPressed('ENTER') then
    song:startCountdown()
end
```

### 位置和速度

### song:seek(ms)
*自 v0.6.3*

参数：
- `ms`(Float)——毫秒位置,保持在歌曲内

返回：Bool

将歌曲跳到不同位置——伴奏和声乐一起跳转,屏幕上音符清除,两个音符线重置,`onSeek(ms)` 以实际(钳制)位置触发.谱面事件被处理,所以脚本的累积状态(段落切换和开/关标志)保持正确：向前跳转在播放赶上时正常触发跳过的事件,每个一次；向后跳转从谱面开始重放到新位置的每个事件,所以状态最终像你直接播放到那里一样.Stats/HUD 不受影响——这是用于审查/练习时机,不是假装你做了(或没做)播放跳过的内容.从任何地方调用安全,像 `song:restart`.在游戏玩法外失败.

```lua
song:seek(0)   -- 回到开始
```

### song:seekBy(deltaMs)
*自 v0.6.3*

参数：
- `deltaMs`(Float)——要移动的毫秒：负向后,正向前

返回：Bool

相对于当前位置跳转.与 `song:seek` 工作方式相同.

```lua
if input:keyPressed('SHIFT') then
    if input:keyJustPressed('LBRACKET') then song:seekBy(-5000) end
    if input:keyJustPressed('RBRACKET') then song:seekBy(5000) end
end
```

### song:time()

返回：Float

伴奏的当前播放位置,毫秒(如果没有播放则为 `0`).与 `songTime` 注册表键相同的值.

```lua
print(song:time() .. ' / ' .. song:length())
```

### song:botplay(on)
*自 v0.7.3*

参数：
- `on`(Bool?)——`true` 让游戏命中玩家的音符；省略以读取当前值

返回：Bool

自动播放玩家的音符：每个音符按时命中并获得最佳评级,长按保持到最后,avoid 音符(地雷)被跳过.仅在玩家被允许按下(`canPress`)时音符被命中,键盘音符输入被忽略.`onNoteHit` 仍以延迟 `0` 触发.跨歌曲保持开启直到你关闭它.

```lua
song:botplay(save:get('autoPlay') == true)
```

### song:offset(audio, note)
*自 v0.7.3*

参数：
- `audio`(Number?)——音频偏移,毫秒.移动整个游戏时钟：音符位置和命中时机和谱面事件.当声音出来晚了(例如蓝牙耳机)时为正值
- `note`(Number?)——音符偏移,毫秒.只移动音符和长条绘制的位置；命中时机保持不变.正值更晚绘制音符

返回：Table

设置玩家的时机偏移.省略参数以保持其当前值.值跨歌曲保持设置直到你更改,所以从玩家设置一次设置.返回 `{audio, note}`.

```lua
song:offset(save:get('audioOffset') or 0, save:get('visualOffset') or 0)
local o = song:offset()
print(o[1], o[2])
```

### song:setTime(ms)

参数：
- `ms`(Float)——目标位置(毫秒,钳制到 ≥ 0)

返回：Bool

将歌曲跳到 `ms` 并重新同步声乐轨道以匹配.如果没有歌曲在播放则返回 `false`(带控制台说明).

```lua
song:setTime(0)                    -- 重启音频
song:setTime(song:time() + 5000)   -- 向前跳 5s
```

### song:length()

返回：Float

伴奏总长度(毫秒,如果没有播放则为 `0`).

```lua
local secs = song:length() / 1000
```

### song:progress()

返回：Float

播放进度 `0..1`(`time / length`),没有播放时为 `0`.与 `songProgress` 注册表键相同的值.

```lua
bar:add('prog', 0, 0, 400, 8)
bar:mode('prog', 'manual')
function onUpdate(dt) bar:setNow('prog', song:progress()) end
```

### song:playing()

返回：Bool

伴奏积极播放期间(未暂停/停止)为 `true`.与 `songPlaying` 注册表键相同的值.

```lua
if not song:playing() then print('paused or ended') end
```

### song:name()

返回：String | nil

返回最后加载的歌曲名称(`SongLoader.songName`),或如果还没有加载则为 `nil`.

```lua
print(song:name())
-- [scripts/menu:1] test
```

### song:artist(song)

参数：
- `song`(String?)——歌曲名称.省略为当前歌曲 [可选]

返回：String

歌曲元数据中写的艺术家,或如果没有则为 `''`.

```lua
text:set('credits', song:name()..' by '..song:artist())
```

### song:charter(song)

参数：
- `song`(String?)——歌曲名称.省略为当前歌曲 [可选]

返回：String

谁制作了谱面,来自歌曲元数据,或如果没有则为 `''`.

```lua
local who = song:charter('tutorial')
if who ~= '' then text:set('charter', 'Chart: '..who) end
```

### song:pitch(p)
*自 v0.6.5*

参数：
- `p`(Float)——速度,高于 0.1 是正常

返回：Bool

一起更改伴奏和两个声乐轨道的播放速度.像唱片,更低的值使它更慢更深.音符和长按和节拍回调跟随,所以它是真正的慢动作.

```lua
song:pitch(0.5)   -- 半速,低一个八度
```

### song:getPitch()
*自 v0.6.5*

返回：Float

当前播放速度,没有播放时为 `1`.

```lua
text:set('speed', 'x'..song:getPitch())
```

### 谱面中的歌曲音频

每个难度的谱面可以在 `audio` 字段中命名自己的音乐,所以 Erect和Nightmare 或合作谱面可以使用与 Normal 不同的文件.没有它,引擎像以前一样从 `assets/audio/music/<song>` 加载 `Inst` 和 `Voices`(或 `Voices-Player` / `Voices-Opponent`).

| 字段 | 它做什么 |
|---|---|
| `folder` | 另一个音乐文件夹以从中加载 Inst 和 Voices. |
| `inst` | 伴奏文件.`assets/audio/music` 内的路径不带 `.ogg`,例如 `bopeebo/Inst-erect`. |
| `vocals` | 任意数量的声乐文件,每个 `{file, role}`. |
| `role` 决定一个声乐轨道属于谁：`'player'` 玩家的声乐,任何玩家错过时静音；`'opponent'` 对手的声乐,从不静音(或玩家错过时用 test as opponent)；`'both'` 总是,对每个人；一个数字 该音符线(其音符的 `p`)的声乐,仅在该线上错过时静音.省略 `role` 并从文件名猜测：Player 或 BF 表示玩家,Opponent 或 Dad 表示对手,其他任何东西对两者播放. |

你很少手写这个：在谱面编辑器中打开 Audio > Choose audio...,选择文件夹和一个 Inst 文件或多个声乐文件一次,并在其下拉菜单中设置每个文件的侧或线.选择保存在你正在编辑的难度的谱面中.`assets/audio/music` 之外的文件以其完整路径保存,仅在你的计算机上工作.

### 混音轨道

一首歌是三个独立轨道——伴奏和玩家声乐和对手的——它们可以独立静音和调平和淡出.下面每个函数接受一个 `target`：

| 目标 | 也接受 | 影响 |
|---|---|---|
| `'inst'` | `instrumental`和`music` | 伴奏 |
| `'player'` | `bf`和`boyfriend` | 玩家声乐 |
| `'opponent'` | `dad`和`enemy` | 对手声乐 |
| `'vocals'` | `voices`和`vocal` | 两个声乐轨道 |
| `'all'` | `everything`和`both` | 所有三个 |

### song:mute(target?, on?)
*自 v0.5.6*

参数：
- `target`(String)——哪些轨道——见上表 [默认 'all']
- `on`(Bool)——`false` 取消静音 [默认 true]

返回：Bool

静音一个或多个歌曲轨道,记住它们有的音量,所以取消静音恢复它而不是弹回满.未知目标名称失败.

`song:unmute(target)` 与 `on = false` 相同.`song:muted(target)` 仅当目标命名的每个轨道都静音时返回 `true`.

```lua
song:mute('vocals')          -- 两个声乐轨道
song:mute('opponent')        -- 仅对手
song:unmute('vocals')

song:mute()                  -- 一切
song:mute('inst', false)     -- ...但带回伴奏

if song:muted('vocals') then print('vocals off') end
```

### song:unmute(target?)

参数：
- `target`(String)——哪些轨道,与 `song:mute` 相同名称 [默认 'all']

返回：Bool

以 `song:mute` 之前的音量重新打开轨道.与 `song:mute(target, false)` 相同.

```lua
song:unmute('vocals')
```

### song:muted(target?)

参数：
- `target`(String)——哪些轨道,与 `song:mute` 相同名称 [默认 'all']

返回：Bool

当目标中的每个轨道都静音时为真.如果其中任何一个仍然播放,或名称未知则返回 `false`.

```lua
if song:muted('vocals') then
    song:unmute('vocals')
end
```

### song:volume(target, v)
*自 v0.5.6*

参数：
- `target`(String)——哪些轨道
- `v`(Float)——音量 `0`–`1`(钳制)

返回：Bool

每轨道电平.在单个轨道(`'inst'`和`'player'`和`'opponent'`)上,`v` 直接设置它.在多轨道目标(`'vocals'`和`'all'`)上,`v` 改为相对于每个轨道自己的当前音量缩放,所以玩家和对手保持平衡而不是弹到相同的平坦数字.设置静音轨道的音量存储值而不是应用它.`song:getVolume` 读回单个轨道,静音时报告待定值.

```lua
song:volume('player', 1.0)
song:volume('opponent', 0.8)
song:volume('vocals', 0.5)   -- 玩家 0.5,对手 0.4
```

### song:getVolume(target)
*自 v0.5.6*

参数：
- `target`(String)——`'inst'`和`'player'` 或 `'opponent'`

返回：Float

一个轨道的音量.轨道静音时返回它将回来的音量.

```lua
print(song:getVolume('inst'))
```

### song:fadeIn(target, duration, from, to)
*自 v0.5.6*

参数：
- `target`(String)——哪些轨道
- `duration`(Float)——秒,高于 0
- `from`(Float?)——起始音量 [默认 0]
- `to`(Float?)——结束音量 [默认 1]

返回：Bool

随时间提高轨道音量.轨道上的任何静音先被移除.

```lua
song:fadeIn('vocals', 1.5, 0, 1)
```

### song:fadeOut(target, duration, to)
*自 v0.5.6*

参数：
- `target`(String)——哪些轨道
- `duration`(Float)——秒,高于 0
- `to`(Float?)——结束音量 [默认 0]

返回：Bool

随时间降低轨道音量.轨道在结束音量继续播放,用 song:stop 停止它.

```lua
song:fadeOut('vocals', 1.5)   -- 为对话使声乐安静
song:fadeOut('all', 3)        -- 淡出整首歌
```

### 可视化器

这些读取器暴露谱面伴奏(`SongPlayer.inst`)的实时振幅.不需要标签——一次只有一首谱面播放.表面匹配 music:* 的 amplitude / level / peak / history.从 `onUpdate` 或 `onBeatHit` 使用它驱动弹跳图标和节拍条和舞台闪光.

每个读取器返回源音频的平滑 RMS,`0`–`1`——响度包络,不是原始波形样本.由此有两点：

- 它与增益无关.电平在音量和声像之前测量,所以声音托盘和静音和声音自己的音量不改变它.游戏音量调低时可视化器继续反应.只有实际没有播放时它才读 `0`.

- 它是绝对的,且比你预期的低.母带音乐大约在 `0.1`–`0.3`——它不会达到 `1`.乘以固定增益(约 3–4)并钳制.

### song:amplitude(source, source)

参数：
- `source`(String?)——哪个音频：`'inst'`和`'vocals'` 或 `'all'` [默认 'inst']

返回：Float

歌曲伴奏的当前平均源电平(左 + 右 / 2),`0`–`1`.平滑 RMS,在音量/声像之前测量,所以声音托盘不影响它.没有播放时返回 `0`.母带音乐通常 `0.1`–`0.3`——应用固定增益.

```lua
local GAIN = 3.5   -- RMS 偏低；提升它,然后钳制

function onUpdate()
    local amp = math.min(1, song:amplitude() * GAIN)
    sprite:scale('logo', 1 + amp * 0.2, 1 + amp * 0.2, true)
end
```

### song:amplitudeLeft()

返回：Float

仅左通道的歌曲伴奏振幅.

```lua
print(song:amplitudeLeft())
```

### song:amplitudeRight()

返回：Float

仅右通道的歌曲伴奏振幅.

```lua
print(song:amplitudeRight())
```

### song:level(attack, decay, source)

参数：
- `attack`(Float)——每个 60-fps 滴答的上升系数 [默认 0.6]
- `decay`(Float)——每个 60-fps 滴答的下降系数 [默认 0.15]
- `source`(String?)——哪个音频：`'inst'`和`'vocals'` 或 `'all'` [默认 'inst']

返回：Float

歌曲伴奏的平滑 VU 风格电平——驱动可视化器的那个.帧率无关(跟踪调用之间的真实时间).提高 `decay` 获得更慢的下降,降低它获得更灵敏的.`attack` 控制它上升多快.与 `song:amplitude` 相同的 `0`–`1` 增益无关尺度,所以给它固定增益.

```lua
local GAIN = 3

function onUpdate(dt)
    local v = math.min(1, song:level(0.8, 0.2) * GAIN)
    game:set('glow.alpha', 0.2 + v * 0.8)
end
```

### song:peak(decay, source)

参数：
- `decay`(Float)——每个 60-fps 滴答的下降 [默认 0.04]
- `source`(String?)——哪个音频：`'inst'`和`'vocals'` 或 `'all'` [默认 'inst']

返回：Float

歌曲伴奏的峰值保持振幅,缓慢衰减回来.

```lua
sprite:position('peak', 100, 400 - song:peak() * 200)
```

### song:history(count, source)

参数：
- `count`(Int)——缓冲区长度
- `source`(String?)——哪个音频：`'inst'`和`'vocals'` 或 `'all'` [默认 'inst']

返回：Table

最后 `count` 个歌曲伴奏振幅样本的滚动表(最旧在前).每次调用推入一个样本——每帧从 `onUpdate` 调用一次.它用于随时间绘制历史(滚动条行 / 波形),每个样本一个条.不要用它最小/最大来归一化实时值——见本节顶部的注释.

```lua
local GAIN = 3.5

function onUpdate()
    local hist = song:history(32)   -- 32 个条从右到左滚动
    for i, v in ipairs(hist) do
        local h = math.min(1, v * GAIN)
        sprite:scale('bar' .. i, 1, math.max(h, 0.02), true)
    end
end
```

### song:resetHistory(source, source)

参数：
- `source`(String?)——哪个音频：`'inst'`和`'vocals'` 或 `'all'` [默认 'inst']

返回：Bool

清空歌曲伴奏的滚动历史缓冲区.如果当前没有加载歌曲则返回 `false`.

```lua
song:resetHistory()
```

### song:spectrum(bands?, source?)
*自 v0.5.5*

参数：
- `bands`(Int)——返回的对数间隔频带数 [默认 16]
- `source`(String)——`'inst'`(默认)和`'vocals'` 或 `'all'` [可选]

返回：Table

歌曲的每频带频率幅度(每个 `0`–`1`),通过 FFT——`song:level` / `song:history` 的频域兄弟,那些是时域.频带从约 20Hz 到约 16kHz 对数间隔,所以低 `bands` 计数(例如 `3`)读起来像低音/中音/高音分割,而 `16`–`32` 给出合适的条式可视化器.默认为伴奏；传递 `'vocals'` 或 `'all'` 为其他源.没有播放时返回全零.歌曲和音乐直接加载到音频设备,所以第一次调用会在后台再次解码文件一次：频带保持零约一秒,然后跟随音乐.

```lua
local BAR_COUNT = 24

function onUpdate()
    local bands = song:spectrum(BAR_COUNT)
    for i = 1, BAR_COUNT do
        local v = bands[i] or 0
        sprite:scale('spec' .. i, 1, math.max(v, 0.02), false)
    end
end
```

### song:vocalAmplitude()

返回：Float

两个声乐轨道(玩家 + 对手)的最大振幅,`0`–`1`.

```lua
if song:vocalAmplitude() > 0.3 then
    sprite:play('bf', 'sing-open')
else
    sprite:play('bf', 'sing-closed')
end
```

---

## 舞台函数

从普通精灵构建背景,然后将它们分组在一个名称下,以便整个集合可以一次显示和移动和分层或丢弃.还预加载舞台的艺术,如果你想要,与歌曲一起运行舞台脚本.

### 舞台文件(JSON)

舞台可以是普通 JSON 文件而不是脚本.将其放在 `assets/stages/<name>.json`.当歌曲使用该舞台时(来自 `song:play` 或谱面),引擎构建每个精灵和放置角色和设置缩放和相机速度,并在加载屏幕期间预加载所有图像.`scripts/stages/<name>.lua` 的脚本仍然与它一起运行,用于任何移动或反应的东西.

Psych Engine 舞台文件(`defaultZoom`和`boyfriend`和`opponent`和`girlfriend`和`camera_*`和`hide_girlfriend`)也读取.`"format": "freak-engine"` 将其标记为 Freak Engine 文件,与谱面和事件和角色使用的相同标记.没有它的文件仍然读取：有 `sprites` 或 `characters` 的作为 Freak Engine 舞台,其他任何东西作为 Psych.

### 舞台文件中的角色

| 字段 | 含义 |
|---|---|
| `position` | 角色站在哪里,像 Psych Engine：角色自己的 `position` 偏移在它之上添加,所以相同数字对任何角色工作 |
| `camera` | 在此舞台上移动此角色的相机点 |
| `visible`和`alpha`和`scroll` | 隐藏和淡出或给角色视差 |
| `light` | `shader:light` 的选项,应用于角色 |

键是 `bf`和`dad` 和 `gf`.顶层：`zoom`(相机缩放)和`cameraSpeed`(1 是正常,2 跟随两倍快).

### 舞台文件中的精灵

| 字段 | 含义 |
|---|---|
| `tag` | 脚本的标签,像 `sprite:add` |
| `image` | `images/` 下的路径,不带 `.png` |
| `position` | `[x, y]` |
| `layer` | `back`(默认,角色后面)和`middle` 或 `front`.精灵保持列表的顺序 |
| `scroll`和`scale` | 一个数字或 `[x, y]` |
| `angle`和`alpha`和`flipX`和`flipY`和`visible`和`antialiasing`和`color`和`blend` | 与精灵字段相同 |
| `animations` | `{name, prefix, fps, loop, indices, offset}` 的列表.图像需要其 XML.`loop` 默认开启,除非设为 `false`,`indices` 可以是 `"0-3, 8"` |
| `play` | 哪个动画开始；`false` 不开始任何.默认：第一个.`frame` 选择其起始帧 |
| `copies`和`from` | 制作几个标记为 `tag1`和`tag2`……从 `from` 开始的副本 |
| `light` | `shader:light` 选项 |

每个精灵也加入同名舞台组,所以 `stage:visible`和`stage:alpha` 和其余在它上工作.顶层 `preload` 列表向加载屏幕添加更多图像.

### 歌曲中的层

v0.7.3 歌曲的角色坐在 `middle` 层.优先级 `'back'` 添加的舞台精灵在它们后面,`'front'` 在前面,`'middle'` 就在它们之后.同一层的精灵保持你添加它们的顺序.

### 没有女友的歌曲

v0.7.4 在谱面中设置 `"gfVersion": "none"`,女友从不创建,所以她的图集根本不加载.空值仍然表示 `gf`.脚本应在触碰她之前检查 `game:has('gf.curCharacter')`.

### 舞台是什么

舞台是一组命名精灵标签.你以通常方式制作精灵——`sprite:add`和`scroll:set`和`blend:set`——然后将它们的标签交给 `stage:add`.精灵本身没有任何变化；舞台只是记住哪些属于一起,以便你可以对整个集合行动.

同一名称下挂两个可选额外内容：

`images/stages/<name>/` 下的艺术可以用 `stage:load` 预加载,所以歌曲的第一帧不是解码二十个 PNG 的帧.

`scripts/stages/<name>.lua` 的脚本在歌曲命名该舞台时自动拾取——见 Stage scripts.

### 分组精灵

先构建,后分组.下面的一切对整个集合工作.

### stage:add(name, tag)
*自 v0.5.8*

参数：
- `name`(String)——舞台名称.首次使用时创建
- `tag`(String)——已存在的精灵标签

返回：Bool

将精灵放入舞台.同一标签添加两次什么都不做.如果标签尚未解析到精灵则失败——先制作它.

```lua
sprite:add('sky', 'stages/your-stage/bg', 0, 0)
scroll:set('sky', 0.3, 1)

sprite:add('front', 'stages/your-stage/front', 0, 0)

stage:add('your-stage', 'sky')
stage:add('your-stage', 'front')
```

### stage:remove(name, tag)
*自 v0.5.8*

参数：
- `name`(String)——舞台名称
- `tag`(String)——从集合中丢弃的精灵标签

返回：Bool

从舞台取出精灵而不销毁它.如果它在里面则 `true`.

```lua
stage:remove('your-stage', 'front')
```

### stage:has(name, tag)
*自 v0.5.8*

参数：
- `name`(String)——舞台名称
- `tag`(String)——精灵标签

返回：Bool

该标签是否是舞台的一部分.

```lua
if stage:has('your-stage', 'sky') then print('yep') end
```

### stage:tags(name?)
*自 v0.5.8*

参数：
- `name`(String?)——舞台名称.默认为当前舞台

返回：Array

舞台中的精灵标签,作为副本——编辑返回的列表不改变舞台.

```lua
for _, t in ipairs(stage:tags('your-stage')) do print(t) end
```

### stage:size(name?)
*自 v0.5.8*

参数：
- `name`(String?)——舞台名称.默认为当前舞台

返回：Int

舞台持有多少精灵标签.

```lua
print('sprites in stage:', stage:size('your-stage'))
```

### 对整个舞台行动

这些中的每一个行走集合并返回它实际触及多少精灵,这是捕捉拼错标签的便宜方式——返回 `0` 意味着该舞台中没有任何东西解析.

### stage:visible(name, on)
*自 v0.5.8*

参数：
- `name`(String)——舞台名称
- `on`(Bool)——精灵是否绘制

返回：Int

显示或隐藏舞台中的每个精灵.在来回切换时比销毁和重建更便宜.

```lua
stage:visible('your-stage', false)
```

### stage:alpha(name, value)
*自 v0.5.8*

参数：
- `name`(String)——舞台名称
- `value`(Float)——不透明度,0–1

返回：Int

设置舞台中每个精灵的不透明度.从 `onUpdate` 调用它淡出整个背景.

```lua
stage:alpha('your-stage', 0.4)
```

### stage:scroll(name, x, y?)
*自 v0.5.8*

参数：
- `name`(String)——舞台名称
- `x`(Float)——水平滚动因子
- `y`(Float?)——垂直滚动因子.默认为 `x`

返回：Int

一次设置每个成员的滚动因子.用于将整个舞台锁定到相机(`0`)或一起推回；对于视差舞台,在分组前按精灵设置因子.

```lua
stage:scroll('your-stage', 0)
```

### stage:shift(name, dx, dy)
*自 v0.5.8*

参数：
- `name`(String)——舞台名称
- `dx`(Float)——X 上移动的像素
- `dy`(Float)——Y 上移动的像素

返回：Int

按偏移移动舞台中的每个精灵,保持它们的相对位置.

```lua
function onBeatHit(beat)
    if beat % 4 == 0 then stage:shift('your-stage', 0, -4) end
end
```

### stage:priority(name, layer)
*自 v0.5.8*

参数：
- `name`(String)——舞台名称
- `layer`(String|Int)——`'back'`和`'middle'`和`'front'` 或数字

返回：Int

一键分层整个舞台.背景几乎总是想要 `'back'`,所以之后添加的游戏玩法精灵坐在顶部.

```lua
stage:priority('your-stage', 'back')
```

### stage:camera(name, cam)
*自 v0.5.8*

参数：
- `name`(String)——舞台名称
- `cam`(String)——相机标签

返回：Int

在一个相机上绘制整个舞台.如果相机标签不存在则失败(返回 `0`).

```lua
camera:add('bg', 'world')
stage:camera('your-stage', 'bg')
```

### stage:use(name)
*自 v0.5.8*

参数：
- `name`(String)——要设为当前的舞台名称

返回：Bool

使舞台成为当前：显示它并隐藏其他每个舞台.这是使几个舞台便宜的方式——构建它们所有一次,然后交换而不重建任何东西.

```lua
buildDay()
buildNight()

stage:use('day')

-- 之后,歌曲中途
stage:use('night')
```

### stage:clear(name)
*自 v0.5.8*

参数：
- `name`(String)——舞台名称

返回：Bool

忘记分组但保留精灵——它们留在屏幕上,只是不再是舞台的一部分.用 `destroy` 也丢弃精灵.

```lua
stage:clear('your-stage')
```

### stage:destroy(name)
*自 v0.5.8*

参数：
- `name`(String)——舞台名称

返回：Int

销毁舞台中的每个精灵并忘记分组,返回移除了多少.`clear` 的对应物,保留精灵.

```lua
print('removed', stage:destroy('your-stage'), 'sprites')
```

### 预加载舞台的艺术

`images/stages/<name>/` 下的任何东西都算该舞台的艺术.预加载跨帧分散而不是一次完成,所以请求舞台从不使游戏停顿.

### stage:load(name)
*自 v0.5.8*

参数：
- `name`(String)——舞台名称,匹配 `images/stages/` 下的文件夹

返回：Bool

排队舞台的图像在后台解码,每帧几个.立即返回——使用 `stage:loaded` 找出何时完成,或让加载屏幕通过在 `song:play` 中命名舞台来处理.

```lua
stage:load('your-stage')
```

### stage:set(name)
*自 v0.5.8*

参数：
- `name`(String)——舞台名称

返回：Bool

将舞台标记为当前并在需要时预加载其艺术.与 `use` 不同,这不触及精灵可见性——它只是说哪些无名称调用引用哪个舞台.

```lua
stage:set('your-stage')
print(stage:get())
```

### stage:get()
*自 v0.5.8*

返回：String

当前舞台名称,或如果没有设置则为 `nil`.

```lua
print('stage:', stage:get())
```

### stage:loaded(name?)
*自 v0.5.8*

参数：
- `name`(String?)——舞台名称.默认为当前舞台

返回：Bool

该舞台的每个图像是否完成解码.

```lua
if stage:loaded('your-stage') then build() end
```

### stage:exists(name)
*自 v0.5.8*

参数：
- `name`(String)——舞台名称

返回：Bool

引擎是否能找到该名称的任何东西——艺术和脚本或两者.

```lua
if not stage:exists('your-stage') then print('typo?') end
```

### stage:list()
*自 v0.5.8*

返回：Array

引擎能看到艺术的每个舞台,排序.

```lua
print(table.concat(stage:list(), ', '))
```

### stage:assets(name?)
*自 v0.5.8*

参数：
- `name`(String?)——舞台名称.默认为当前舞台

返回：Array

属于舞台的图像键,以 `sprite:add` 期望的形式,所以你可以构建舞台而不硬编码文件名.

```lua
for i, key in ipairs(stage:assets('your-stage')) do
    sprite:add('bg' .. i, key, 0, 0)
    stage:add('your-stage', 'bg' .. i)
end
```

### stage:count(name?)
*自 v0.5.8*

参数：
- `name`(String?)——舞台名称.默认为当前舞台

返回：Int

舞台有多少图像.注意这计数艺术,而 `stage:size` 计数你分组的精灵.

```lua
print(stage:count('your-stage'), 'images')
```

### stage:remaining()
*自 v0.5.8*

返回：Int

现在正在加载的舞台还有多少图像.没有加载时为 `0`.

```lua
text:set('load', stage:remaining() .. ' left')
```

### stage:unload(name)
*自 v0.5.8*

参数：
- `name`(String)——舞台名称

返回：Int

释放舞台的图形并返回释放了多少.只丢弃实际加载的艺术,所以在未使用的舞台上调用是免费的.

```lua
print('freed', stage:unload('your-stage'))
```

### 舞台脚本

`scripts/stages/<name>.lua` 的文件在歌曲命名该舞台时自动加载,并接收普通回调——没有特殊的舞台 API 要学.它仅为该歌曲运行并随它拆除.

它的 `onCreate` 在歌曲脚本的 `onCreate` 之前触发,所以背景在游戏玩法对象添加在顶部之前存在.`stage:script` 报告拾取了哪个文件.

### stage:script(name?)
*自 v0.5.8*

参数：
- `name`(String?)——舞台名称.默认为当前舞台

返回：String

引擎为该舞台解析的脚本 id(例如 `'stages/your-stage'`),或如果舞台没有脚本则为 `nil`.

```lua
print(stage:script('your-stage'))
```

### stage:hasScript(name?)
*自 v0.5.8*

参数：
- `name`(String?)——舞台名称.默认为当前舞台

返回：Bool

舞台是否有脚本文件,相对于仅艺术.

```lua
if stage:hasScript('your-stage') then print('scripted stage') end
```

### stage:position(who, x, y, raw)
*自 v0.7.3*

参数：
- `who`(String)——`'bf'`和`'dad'` 或 `'gf'`(也 `'boyfriend'`和`'player'`和`'opponent'`和`'girlfriend'`)
- `x`(Number?)——角色的舞台 X
- `y`(Number?)——角色的舞台 Y
- `raw`(Bool?)——`true` 按原样设置精灵位置,不带角色自己的偏移 [默认 false]

返回：Bool | Table

以 Psych 舞台 JSON 的方式在舞台上放置角色：你给舞台点,引擎添加角色自己 JSON 中的 `position` 偏移.相同的舞台数字然后对任何角色工作.省略 `x` 和 `y` 以将当前舞台点读作 `{x, y}`.省略其中一个以仅更改另一个.在 funkin 风格歌曲中工作,角色存在的地方.

```lua
function onCreate()
    stage:position('bf', 930, 100)   -- 来自舞台 JSON "boyfriend": [930, 100]
    stage:position('dad', 150, 260)
    game:set('gf.visible', false)
end

local p = stage:position('bf')
print(p.x, p.y)
```

### stage:zoom(value)
*自 v0.7.3*

参数：
- `value`(Number)——舞台的相机缩放

返回：Bool

设置舞台的相机缩放并立即应用.与设置 `defaultGameZoom` 不同,它在歌曲重启中存活,因为舞台脚本的 `onCreate` 不在重启时再次运行.

```lua
function onCreate()
    stage:zoom(0.7)
end
```

### stage:build(name, data)
*自 v0.7.7*

参数：
- `name`(String)——舞台文件名称,不带 `.json`
- `data`(Table?)——来自 `stage:data` 的更改副本,以构建而不是文件 [可选]

返回：Bool

现在在任何场景中构建舞台文件：菜单预览,或谱面命名另一个舞台的歌曲.在歌曲中它也放置角色.再次构建替换同标签的精灵.要在构建前从脚本更改舞台,用 `stage:data` 读取它,编辑表并传递到这里.

```lua
function onCreate()
    local s = stage:data('street')
    s.zoom = 0.8
    s.characters.bf.position = {1000, 120}
    table.insert(s.sprites, {tag = 'rain', image = 'effects/rain', position = {0, 0}, layer = 'front'})
    stage:build('street', s)
end

-- 构建后每个精灵是普通标签
game:set('sky.alpha', 0.5)
```

### stage:data(name)
*自 v0.7.7*

参数：
- `name`(String)——舞台文件名称

返回：Table

将舞台文件读作表,所以脚本可以使用其中的你自己的字段.如果没有这样的文件则为 `nil`.

```lua
local s = stage:data('street')
print(s.zoom, #s.sprites)
```

---

## 音乐函数

`music` 命名空间播放背景音乐轨道——菜单主题和舞台氛围和胜利音效——按标签寻址,独立于谱面驱动的歌曲管道.每个标签拥有自己的 `FlxSound` 实例,所以你可以同时分层几个轨道(例如基础循环 + 更高层叠加)和淡入/淡出它们,并在不触及游戏玩法 `inst`/`vocals` 的情况下切换它们.文件通过 `Paths.music` 解析——将它们放在 `assets/audio/music/<name>.ogg`.

### 播放音乐

### music:preload(name, ?native)
*自 v0.6.9*

参数：
- `name`(String)——轨道名称,如 `music:play` 中
- `native`(Bool?)——直接解码到 OpenAL 而不在 Haxe 内存中保留样本.更轻,无 GC 负载,但 `music:spectrum` 对此轨道返回零(amplitude 和 level 仍然工作)[默认 false]

返回：Bool

在后台线程加载并解码轨道,所以之后的 `music:play` 立即开始而不是在主线程解码整个文件.

```lua
music:preload('menuTheme', true)
-- 之后
music:play('music', 'menuTheme', 1)
```

### music:play(tag, name, volume, looped, group, native)

参数：
- `tag`(String)——音乐标签(你对此轨道的句柄)
- `name`(String)——`audio/music/` 下的路径(无扩展名)
- `volume`(Float)——播放音量 `0`–`1`.这成为轨道自己的 100% 参考用于 `music:groupVolume`.[默认 1]
- `looped`(Bool)——轨道结束时是否循环 [默认 true]
- `group`(String)——立即加入的音量组,与之后调用 `music:group(tag, group)` 相同 [可选]
- `native`(Bool?)——直接解码到 OpenAL 而不在 Haxe 内存中保留样本 v0.6.8.更轻,无 GC 负载,但 `music:spectrum` 对此轨道返回零(amplitude 和 level 仍然工作)[默认 false]

返回：Bool

加载 `name` 并在 `tag` 下播放它.重用标签先停止并销毁其前一个轨道.文件缺失或空标签时返回 `false`.v0.7.3 除了位置参数,你可以传递一个表作为第三个参数：`{volume, looped, group, native, time, persist}`,其中 `time` 是起始位置(毫秒).你省略的字段保持其默认值.`persist = true` 使轨道在状态变化中保持播放,像 `music:persist`.

```lua
music:play('menu', 'menuTheme', 0.7, true)

-- 命名选项,包括起始位置
music:play('theme', 'menuTheme', {volume = 0.7, looped = true, time = 0})
```

### music:persist(tag, on)
*自 v0.7.3*

参数：
- `tag`(String)——音乐标签
- `on`(Bool?)——`false` 让轨道在下次状态变化时再次被停止 [默认 true]

返回：Bool

每个音乐轨道在状态变化时被停止.持久轨道继续播放并保留其标签,所以下一状态可以检查 `music:playing(tag)` 并离开它——在标题和主菜单和故事屏幕之间携带菜单音乐的通常方式.在歌曲开始前自己停止它,否则它会盖过歌曲.

```lua
if not music:playing('theme') then
    music:play('theme', 'menuTheme', 0.7)
    music:persist('theme')
end

-- 或一次调用
music:play('theme', 'menuTheme', {volume = 0.7, persist = true})

-- 在开始歌曲之前
music:stop('theme')
```

### music:stop(tag)

参数：
- `tag`(String)——音乐标签

返回：Bool

停止轨道并释放其 `FlxSound`.标签被注销.如果标签未知则返回 `false`.

```lua
music:stop('menu')
```

### music:stopAll()

返回：Bool

停止并销毁每个注册的音乐轨道.总是返回 `true`.

```lua
music:stopAll()
```

### music:pause(tag)

参数：
- `tag`(String)——音乐标签

返回：Bool

就地暂停轨道而不销毁它.用 `music:resume` 继续.如果标签未知则返回 `false`.

```lua
music:pause('menu')
```

### music:resume(tag)

参数：
- `tag`(String)——音乐标签

返回：Bool

从暂停位置恢复暂停的轨道.如果标签未知则返回 `false`.

```lua
music:resume('menu')
```

### music:exists(tag)

参数：
- `tag`(String)——音乐标签

返回：Bool

如果此标签下注册了轨道则返回 `true`,即使暂停或停止(但尚未销毁).用其他调用保护它以避免缺失标签错误日志.

```lua
if music:exists('menu') then music:fadeOut('menu', 1) end
```

### music:onComplete(tag, cb)

参数：
- `tag`(String)——音乐标签
- `cb`(Function)——轨道完成后调用一次的回调(仅在非循环轨道上触发).传递 `nil` 以清除.

返回：Bool

注册一个 Lua 回调在轨道完成时运行.回调不接收参数.循环轨道永不完成,所以永不回调.

```lua
music:play('stinger', 'victory', 1, false)
music:onComplete('stinger', function()
    music:play('menu', 'menuTheme', 0.7, true)
end)
```

### 音量和组和淡出

### music:volume(tag, v)

参数：
- `tag`(String)——音乐标签
- `v`(Float)——目标音量 `0`–`1`(钳制)

返回：Bool

立即设置轨道的播放音量.此 `v` 成为轨道自己的 100% 参考——如果标签在组中,可听音量是 `v * music:getGroupVolume(group)`.对于平滑斜坡使用 `music:fadeIn` / `music:fadeOut` 代替.如果标签未知则返回 `false`.

```lua
music:volume('menu', 0.4)
```

### music:group(tag, group)
*自 v0.6.6*

参数：
- `tag`(String)——音乐标签
- `group`(String)——要加入的组名称

返回：Bool

将轨道放入命名音量组,像 `sound:group` 但用于 `music:play` 轨道.轨道当前音量成为其自己的 100%,`music:groupVolume` 从那里缩放每个成员.

```lua
music:play('ambience', 'rain', 0.8)
music:group('ambience', 'bg')
```

### music:ungroup(tag)
*自 v0.6.6*

参数：
- `tag`(String)——音乐标签

返回：Bool

将轨道从其音量组中取出.它回到自己的音量.

```lua
music:ungroup('ambience')
```

### music:groupVolume(group, v)
*自 v0.6.6*

参数：
- `group`(String)——组名称
- `v`(Float)——每个成员自己音量的乘数 `0` 到 `1`

返回：Bool

设置整组轨道的音量并立即应用.每个成员保持与其他成员的平衡.

```lua
music:play('ambience', 'rain', 0.8, true, 'bg')
music:play('drone', 'hum', 0.5, true, 'bg')
music:groupVolume('bg', 0.5)   -- ambience 0.4,drone 0.25
```

### music:getGroupVolume(group)
*自 v0.6.6*

参数：
- `group`(String)——组名称

返回：Float

`music:groupVolume` 设置的乘数,或从未设置的组为 `1`.

```lua
text:set('musicVol', math.floor(music:getGroupVolume('bg') * 100)..'%')
```

### music:pitch(tag, p)

参数：
- `tag`(String)——音乐标签
- `p`(Float)——音高乘数(`1` = 正常,`2` = 高八度,`0.5` = 低八度).必须 > 0.

返回：Bool

实时重新调整轨道音高.如果标签未知或 `p <= 0` 则返回 `false`.

```lua
music:pitch('menu', 1.25)
```

### music:mute(tag, on)
*自 v0.5.6*

参数：
- `tag`(String)——音乐标签
- `on`(Bool?)——`false` 取消静音 [默认 true]

返回：Bool

静音轨道并记住其音量,所以取消静音恢复到相同电平.静音轨道上的 music:volume 存储值供稍后.停止或重放标签清除静音.

```lua
music:mute('menuTheme')
```

### music:unmute(tag)
*自 v0.5.6*

参数：
- `tag`(String)——音乐标签

返回：Bool

将静音轨道带回其有的音量.与 `music:mute(tag, false)` 相同.

```lua
music:unmute('menuTheme')
```

### music:muted(tag)
*自 v0.5.6*

参数：
- `tag`(String)——音乐标签

返回：Bool

如果轨道静音则为 `true`.

```lua
text:set('muteBtn', music:muted('menuTheme') and 'Unmute' or 'Mute')
```

### music:muteAll(on)
*自 v0.5.6*

参数：
- `on`(Bool?)——`false` 取消静音每个轨道 [默认 true]

返回：Bool

一次静音(或取消静音)每个播放轨道.

```lua
function onFocusLost() music:muteAll() end
function onFocus() music:muteAll(false) end
```

### music:fadeIn(tag, duration, from, to)

参数：
- `tag`(String)——音乐标签
- `duration`(Float)——淡出持续时间(秒,必须 > 0)
- `from`(Float)——起始音量 [默认 0]
- `to`(Float)——结束音量 [默认 1]

返回：Bool

在 `duration` 秒内将轨道音量从 `from` 补间到 `to`.如果标签未知则返回 `false`.

```lua
music:play('menu', 'menuTheme', 0)
music:fadeIn('menu', 1.5, 0, 0.8)
```

### music:fadeOut(tag, duration, to)

参数：
- `tag`(String)——音乐标签
- `duration`(Float)——淡出持续时间(秒,必须 > 0)
- `to`(Float)——结束音量 [默认 0]

返回：Bool

在 `duration` 秒内将轨道音量补间到 `to`.轨道继续播放——与计时器 / `tw` 回调中的 `music:stop` 配对,如果你想在淡出后释放它.

```lua
music:fadeOut('menu', 2)
timer:wait('menuFadeStop', 2, function() music:stop('menu') end)
```

### 位置

### music:time(tag, ms)

参数：
- `tag`(String)——音乐标签
- `ms`(Float)——目标播放位置(毫秒)

返回：Bool

将轨道跳到 `ms` 毫秒.如果标签未知则返回 `false`.

```lua
music:time('menu', 10000)  -- 跳到 10s
```

### music:length(tag)

参数：
- `tag`(String)——音乐标签

返回：Float

轨道总长度(毫秒),或如果标签未知则为 `0`.

```lua
print(music:length('menu'))
```

### music:progress(tag)

参数：
- `tag`(String)——音乐标签

返回：Float

归一化播放位置,`0`–`1`.

```lua
sprite:scale('bar', music:progress('menu'), 1, true)
```

### music:playing(tag)

参数：
- `tag`(String)——音乐标签

返回：Bool

如果轨道存在且当前正在播放(未暂停和未停止和未完成)则返回 `true`.

```lua
if not music:playing('menu') then music:play('menu', 'menuTheme') end
```

### 可视化器

可视化器表面镜像 sound:* 的——每通道电平和平滑 VU 电平和峰值保持和滚动历史缓冲区——按音乐标签而不是声音标签寻址.相同单位和相同调用模式.选择拥有你试图可视化轨道的命名空间；对于谱面伴奏使用 song:*.

读取器返回源音频的平滑 RMS,`0`–`1`.它在音量和声像之前测量,所以声音托盘和静音和轨道自己的音量不改变它——它是绝对的,对母带音乐坐在约 `0.1`–`0.3` 而不是达到 `1`.乘以固定增益(约 3–4)并钳制.见 song:* 可视化器注释了解完整规则.

### music:amplitude(tag)

参数：
- `tag`(String)——音乐标签

返回：Float

音乐轨道当前平均振幅(左右通道峰值的均值),范围 `0`–`1`.如果标签未知或轨道未播放则返回 `0`.

```lua
sprite:scale('icon', 1 + music:amplitude('menu') * 0.3, 1 + music:amplitude('menu') * 0.3, true)
```

### music:amplitudeLeft(tag)

参数：
- `tag`(String)——音乐标签

返回：Float

仅左通道振幅.与 `music:amplitudeRight` 一起用于立体声分离可视化器.

```lua
print(music:amplitudeLeft('menu'))
```

### music:amplitudeRight(tag)

参数：
- `tag`(String)——音乐标签

返回：Float

仅右通道振幅.

```lua
print(music:amplitudeRight('menu'))
```

### music:level(tag, attack, decay)

参数：
- `tag`(String)——音乐标签
- `attack`(Float)——每个 60-fps 滴答的上升系数(更高 = 更灵敏上升)[默认 0.6]
- `decay`(Float)——每个 60-fps 滴答的下降系数(更高 = 更慢下降)[默认 0.15]

返回：Float

平滑振幅(VU 风格)带独立攻击和衰减率.内部状态每标签并使用调用之间的真实时间,所以曲线帧率无关.

```lua
sprite:scale('vu', 1, music:level('menu'), true)
```

### music:peak(tag, decay)

参数：
- `tag`(String)——音乐标签
- `decay`(Float)——每个 60-fps 滴答的下降 [默认 0.04]

返回：Float

峰值保持振幅带缓慢衰减.弹到任何新最大值,然后漂移回来.

```lua
sprite:position('peakTick', 100, 400 - music:peak('menu') * 200)
```

### music:history(tag, count)

参数：
- `tag`(String)——音乐标签
- `count`(Int)——缓冲区长度

返回：Table

最后 `count` 个振幅样本的滚动表(最旧在前).每次调用推入一个样本——每帧从 `onUpdate` 调用一次获得每帧波形.通过传递不同 `count` 调整大小；缓冲区被修剪.

```lua
function onUpdate()
    local hist = music:history('menu', 64)
    for i, v in ipairs(hist) do
        sprite:scale('bar' .. i, 1, math.max(v, 0.01), true)
    end
end
```

### music:resetHistory(tag)

参数：
- `tag`(String)——音乐标签

返回：Bool

清空标记轨道的滚动历史缓冲区.

```lua
music:resetHistory('menu')
```

### music:spectrum(tag, bands)

参数：
- `tag`(String)——音乐标签
- `bands`(Int)——对数间隔频带数 [默认 16]

返回：Table

通过 FFT 的每频带频率幅度(`0`–`1`)——`music:level` / `music:history` 的频域兄弟.频带约 20Hz–16kHz 对数间隔：`3` 读作低音/中音/高音,`16`–`32` 制作条式可视化器.轨道未播放时全零.歌曲和音乐直接加载到音频设备,所以第一次调用会在后台再次解码文件一次：频带保持零约一秒,然后跟随音乐.

```lua
local b = music:spectrum('menu', 8)
local bass = math.max(b[1] or 0, b[2] or 0)
sprite:scale('logo', 1 + bass * 0.3, 1 + bass * 0.3)
```

---

## 声音函数

`sound` 命名空间用于一次性 SFX——UI 点击和命中反馈和脚步和拾取.最简单形式,`sound:play(name)` 触发效果并忘记它(完成时自动销毁,无标签簿记).对于你需要在之后控制的 SFX(循环环境音和可停止的激光充电等),使用 `sound:playTag` 和下面按 `tag` 键控的访问器.文件通过 `Paths.sound` 解析——将它们放在 `assets/audio/sounds/<name>.ogg`.

### 播放声音

### sound:preload(name)
*自 v0.6.9*

参数：
- `name`(String)——声音名称,如 `sound:play` 中

返回：Bool

在后台线程加载音效,所以其第一次 `sound:play` 不卡顿.

```lua
sound:preload('ui/click')
```

### sound:play(name, volume, pitch)

参数：
- `name`(String)——`audio/sounds/` 下的路径(无扩展名)
- `volume`(Float)——播放音量 `0`–`1` [默认 1]
- `pitch`(Float)——音高乘数(`1` = 正常)[默认 1]

返回：Bool

即发即忘一次性 SFX.首次使用时缓存,之后回收,完成时自动销毁——从输入/碰撞处理程序调用便宜.不存储标签；如果你需要停止或飞行中修改声音,使用 `sound:playTag` 代替.

```lua
sound:play('ui/confirm')
sound:play('hit', 0.8, 1.2)  -- 更安静,稍高音高
```

### sound:playTag(tag, name, volume, looped, pitch, group)

参数：
- `tag`(String)——声音标签
- `name`(String)——`audio/sounds/` 下的路径(无扩展名)
- `volume`(Float)——播放音量 `0`–`1`.注意：`0` 是静音——保持 `1` 除非你想静音它.这成为声音自己的 100% 参考用于 `sound:groupVolume`.[默认 1]
- `looped`(Bool)——是否循环 [默认 false]
- `pitch`(Float)——初始播放音高(`1` = 正常,`2` = 高一个八度).之后用 `sound:pitch(tag, p)` 实时调整.[默认 1]
- `group`(String)——立即加入的音量组,与之后调用 `sound:group(tag, group)` 相同 [可选]

返回：Bool

播放 SFX 并在 `tag` 下保留其句柄,所以 `sound:*` 函数其余部分可以寻址它.用于你可能需要在播放中途停止和暂停和淡出或调整音高的声音(循环引擎嗡嗡声和充电).重用现有标签停止并销毁前一个句柄.

```lua
-- 全音量的循环引擎嗡嗡声,稍低音高
sound:playTag('engine', 'ship-engine', 1, true, 0.85)

-- 每帧随速度提高音高
sound:pitch('engine', 0.85 + speed * 0.0008)

-- 你稍后可以停止的一次性
sound:playTag('laser', 'laserCharge', 1, true)
sound:stop('laser')
```

### sound:stop(tag)

参数：
- `tag`(String)——声音标签

返回：Bool

停止标记的 SFX,释放其 `FlxSound`,并注销标签.如果标签未知则返回 `false`.

```lua
sound:stop('laser')
```

### sound:stopAll()

返回：Bool

停止每个标记的 SFX.`sound:play` 的即发即忘播放不受影响(它们没有标签).总是返回 `true`.

```lua
sound:stopAll()
```

### sound:pause(tag)

参数：
- `tag`(String)——声音标签

返回：Bool

就地暂停标记的 SFX.如果标签未知则返回 `false`.

```lua
sound:pause('laser')
```

### sound:resume(tag)

参数：
- `tag`(String)——声音标签

返回：Bool

恢复暂停的 SFX.如果标签未知则返回 `false`.

```lua
sound:resume('laser')
```

### sound:onComplete(tag, cb)

参数：
- `tag`(String)——声音标签
- `cb`(Function)——SFX 完成时触发的回调.传递 `nil` 以清除.

返回：Bool

注册 Lua 回调在标记的 SFX 完成时运行.循环 SFX 永不完成,所以永不回调.

```lua
sound:playTag('reload', 'gunReload')
sound:onComplete('reload', function()
    print('reload complete')
end)
```

### 音量和组和淡出

### sound:volume(tag, v)

参数：
- `tag`(String)——声音标签
- `v`(Float)——目标音量 `0`–`1`(钳制)

返回：Bool

立即设置标记 SFX 的播放音量.此 `v` 成为声音自己的 100% 参考——如果标签在组中,可听音量是 `v * sound:getGroupVolume(group)`.对于平滑斜坡使用 `sound:fadeIn` / `sound:fadeOut`.

```lua
sound:volume('laser', 0.5)
```

### sound:masterVolume(v)

参数：
- `v`(Float)——0(静音)到 1(满)

返回：Bool

游戏的整体音量,在每个声音和轨道自己的音量之上.舍入到 3 位小数,所以滑块值 0.29 读回 0.29.

```lua
sound:masterVolume(0.8)
```

### sound:getMasterVolume()

返回：Float

用 `sound:masterVolume` 或音量键设置的整体音量.

```lua
text:set('vol', math.floor(sound:getMasterVolume() * 100)..'%')
```

### sound:group(tag, group)
*自 v0.6.6*

参数：
- `tag`(String)——声音标签
- `group`(String)——要加入的组名称

返回：Bool

将标记声音放入命名音量组.当时它的音量成为其自己的 100%,`sound:groupVolume` 从那里缩放它.所以 1.0 的声音和 0.7 的声音在组推子移动时保持平衡.

```lua
sound:playTag('hit1', 'hits/hit1', 1.0)
sound:group('hit1', 'sfx')
```

### sound:ungroup(tag)
*自 v0.6.6*

参数：
- `tag`(String)——声音标签

返回：Bool

从音量组中取出声音.

```lua
sound:ungroup('hit1')
```

### sound:groupVolume(group, v)
*自 v0.6.6*

参数：
- `group`(String)——组名称
- `v`(Float)——每个成员自己音量的乘数 `0` 到 `1`

返回：Bool

立即设置整组声音的音量.之后加入的声音也拾取它.制作 SFX 音量滑块的通常方式.

```lua
sound:playTag('hit1', 'hits/hit1', 1.0, false, 1, 'sfx')
sound:playTag('hit2', 'hits/hit2', 0.7, false, 1, 'sfx')
sound:groupVolume('sfx', 0.5)   -- hit1 0.5,hit2 0.35
```

### sound:getGroupVolume(group)
*自 v0.6.6*

参数：
- `group`(String)——组名称

返回：Float

`sound:groupVolume` 设置的乘数,或从未设置的组为 `1`.

```lua
local sfx = sound:getGroupVolume('sfx')
```

### sound:mute(tag, on)
*自 v0.5.6*

参数：
- `tag`(String)——声音标签
- `on`(Bool?)——`false` 取消静音 [默认 true]

返回：Bool

静音标记声音并记住其音量,所以取消静音恢复到相同电平.静音声音上的 `sound:volume` 存储值供稍后.停止或重放标签清除静音.

```lua
sound:mute('footsteps')
```

### sound:unmute(tag)
*自 v0.5.6*

参数：
- `tag`(String)——声音标签

返回：Bool

将静音声音带回其有的音量.与 `sound:mute(tag, false)` 相同.

```lua
sound:unmute('footsteps')
```

### sound:muted(tag)
*自 v0.5.6*

参数：
- `tag`(String)——声音标签

返回：Bool

如果声音静音则为 `true`.

```lua
if not sound:muted('amb') then sound:mute('amb') end
```

### sound:muteAll(on)
*自 v0.5.6*

参数：
- `on`(Bool?)——`false` 取消静音每个声音 [默认 true]

返回：Bool

一次静音(或取消静音)每个标记声音.

```lua
sound:muteAll()
sound:muteAll(false)
```

### sound:pitch(tag, p)

参数：
- `tag`(String)——声音标签
- `p`(Float)——音高乘数(必须 > 0)

返回：Bool

实时重新调整标记 SFX 的音高——经典用途是倒回时反转和充电时上升和低通感觉的减速.如果标签未知或 `p <= 0` 则返回 `false`.

```lua
sound:playTag('charge', 'laserCharge', 1, true)
sound:pitch('charge', 1.5)
```

### sound:spatial(tag, x, y, listener, radius, pan)

参数：
- `tag`(String)——已播放声音的标签(见 `sound:playTag`)
- `x`(Float)——世界中的源 X 位置
- `y`(Float)——世界中的源 Y 位置
- `listener`(String)——声音相对于其听到的精灵标签(玩家 / 相机目标)
- `radius`(Float)——声音淡到静音的距离 [默认 600]
- `pan`(Bool)——按源的水平偏移左右平移 [默认 true]

返回：Bool

将播放的标记声音变成世界定位源：音量跟随 `(x, y)` 和 `listener` 精灵之间的距离(近处满,超过 `radius` 静音),并按源的水平偏移左右平移.对于固定发射器,一次调用后每帧自动跟踪；对于移动源,每帧用新 `x, y` 重新调用.传递 `pan = false` 仅距离衰减.如果标签未播放或监听精灵不存在则返回 `false`.

立体声源也自动平移.原生平移在 OpenAL 中 3D 定位源,只空间化单声道——所以立体声 SFX 在你第一次调用此函数时透明地下混为单声道(缓存,每个资产转换一次),并播放该副本.原始立体声资产保持不变,供非空间使用(`sound:play`和`sound:playTag` 等).

自 v0.4.1(2026-06-20).

```lua
sound:playTag('engine', 'rivalEngine', 1, true)

function onUpdate(elapsed)
  sound:spatial('engine', game:get('rival.x'), game:get('rival.y'), 'player', 800)
end
```

### sound:fadeIn(tag, duration, from, to)

参数：
- `tag`(String)——声音标签
- `duration`(Float)——淡入持续时间(秒,必须 > 0)
- `from`(Float)——起始音量 [默认 0]
- `to`(Float)——结束音量 [默认 1]

返回：Bool

在 `duration` 秒内淡入标记的 SFX.

```lua
sound:playTag('amb', 'wind', 0, true)
sound:fadeIn('amb', 2, 0, 0.6)
```

### sound:fadeOut(tag, duration, to)

参数：
- `tag`(String)——声音标签
- `duration`(Float)——淡出持续时间(秒,必须 > 0)
- `to`(Float)——结束音量 [默认 0]

返回：Bool

将标记的 SFX 淡出到 `to`.声音继续播放——与计时器组合,如果你想在淡出后停止它.

```lua
sound:fadeOut('amb', 1.5)
```

### sound:fadeOutAll(duration, to)
*自 v0.5.6*

参数：
- `duration`(Float)——秒,高于 0
- `to`(Float?)——结束音量 [默认 0]

返回：Bool

一次降低每个标记声音,用于在过场动画或暂停菜单下使所有效果安静.声音在结束音量继续播放.

```lua
sound:fadeOutAll(0.4)
```

### sound:fadeInAll(duration, from, to)
*自 v0.5.6*

参数：
- `duration`(Float)——秒,高于 0
- `from`(Float?)——起始音量 [默认 0]
- `to`(Float?)——结束音量 [默认 1]

返回：Bool

一次提高每个标记声音.

```lua
sound:fadeInAll(0.4, 0, 1)
```

### 位置

### sound:time(tag, ms)

参数：
- `tag`(String)——声音标签
- `ms`(Float)——目标播放位置(毫秒)

返回：Bool

将标记的 SFX 跳到 `ms` 毫秒.

```lua
sound:time('amb', 500)
```

### sound:length(tag)

参数：
- `tag`(String)——声音标签

返回：Float

标记 SFX 的总长度(毫秒),或如果标签未知则为 `0`.

```lua
print(sound:length('amb'))
```

### sound:playing(tag)

参数：
- `tag`(String)——声音标签

返回：Bool

如果标记的 SFX 存在且当前正在播放则返回 `true`.

```lua
if sound:playing('laser') then print('still charging') end
```

### 可视化器

这些读取器暴露标记 SFX 的实时峰值振幅(由 Flixel 的每通道 `leftPeak` / `rightPeak` 驱动).从 `onUpdate` 驱动它们构建 VU 表条和弹跳图标和节拍反应闪光——任何需要反应"现在响吗？"的东西.相同的表面存在于 `music:*` 和 `song:*`——选择拥有你想可视化源的命名空间.

### sound:amplitude(tag)

参数：
- `tag`(String)——声音标签

返回：Float

标记 SFX 的当前平均振幅(左右通道峰值的均值),范围 `0`–`1`.标签未知或声音未播放时返回 `0`.这是原始信号——对于更平滑的条,使用 `sound:level`.

```lua
function onUpdate()
    sprite:scale('bar', 1, sound:amplitude('amb'), true)
end
```

### sound:amplitudeLeft(tag)

参数：
- `tag`(String)——声音标签

返回：Float

仅左通道振幅.与 `sound:amplitudeRight` 一起用于立体声分离可视化器.

```lua
sprite:scale('leftBar', 1, sound:amplitudeLeft('amb'), true)
sprite:scale('rightBar', 1, sound:amplitudeRight('amb'), true)
```

### sound:amplitudeRight(tag)

参数：
- `tag`(String)——声音标签

返回：Float

仅右通道振幅.

```lua
print(sound:amplitudeRight('amb'))
```

### sound:level(tag, attack, decay)

参数：
- `tag`(String)——声音标签
- `attack`(Float)——每个 60-fps 滴答的上升系数(更高 = 更灵敏上升)[默认 0.6]
- `decay`(Float)——每个 60-fps 滴答的下降系数(更高 = 更慢下降,更低 = 更灵敏下降)[默认 0.15]

返回：Float

平滑振幅带独立攻击和衰减率——经典 VU 表响应.内部状态每标签并根据调用之间的真实时间更新,所以帧率波动时曲线不变.用一个速率驱动单个值；提高 `attack` 获得更灵敏上升,降低 `decay` 获得更长衰减.

```lua
sprite:scale('bar', 1, sound:level('amb'), true)
```

### sound:peak(tag, decay)

参数：
- `tag`(String)——声音标签
- `decay`(Float)——每个 60-fps 滴答的下降(更低 = 更快下降)[默认 0.04]

返回：Float

峰值保持值.弹到任何超过当前峰值的新样本,然后缓慢衰减回来.与 `sound:level` 配对获得电平条加滑动峰值刻度.

```lua
sprite:position('peakTick', 100, 400 - sound:peak('amb') * 200)
```

### sound:leftPeak(tag, decay?)

参数：
- `tag`(String)——声音标签
- `decay`(Float)——每个 60-fps 滴答的下降(更低 = 更快下降)[默认 0.04]

返回：Float

像 `sound:peak`,但仅左扬声器.考虑声像,所以右平移的声音显示低左峰值.未知标签返回 0.

```lua
bar:value('meterL', sound:leftPeak('music'))
bar:value('meterR', sound:rightPeak('music'))
```

### sound:rightPeak(tag, decay?)

参数：
- `tag`(String)——声音标签
- `decay`(Float)——每个 60-fps 滴答的下降(更低 = 更快下降)[默认 0.04]

返回：Float

像 `sound:peak`,但仅右扬声器.考虑声像.未知标签返回 0.

```lua
bar:value('meterL', sound:leftPeak('music'))
bar:value('meterR', sound:rightPeak('music'))
```

### sound:history(tag, count)

参数：
- `tag`(String)——声音标签
- `count`(Int)——缓冲区长度

返回：Table

返回最后 `count` 个振幅样本的滚动表(最旧在前).每次调用推入一个样本——每帧从 `onUpdate` 调用一次.传递不同 `count` 调整缓冲区大小,将其修剪到新大小.

```lua
function onUpdate()
    local hist = sound:history('amb', 64)
    for i, v in ipairs(hist) do
        sprite:scale('bar' .. i, 1, math.max(v, 0.01), true)
    end
end
```

### sound:resetHistory(tag)

参数：
- `tag`(String)——声音标签

返回：Bool

清空标记 SFX 的滚动历史缓冲区.

```lua
sound:resetHistory('amb')
```

### sound:spectrum(tag, bands)

参数：
- `tag`(String)——声音标签(来自 `sound:playTag`)
- `bands`(Int)——对数间隔频带数 [默认 16]

返回：Table

通过 FFT 的标记 SFX 每频带频率幅度(`0`–`1`)——`sound:level` / `sound:history` 的频域兄弟.频带约 20Hz–16kHz 对数间隔.声音未播放时全零.歌曲和音乐直接加载到音频设备,所以第一次调用会在后台再次解码文件一次：频带保持零约一秒,然后跟随音乐.

```lua
local b = sound:spectrum('amb', 16)
for i = 1, 16 do sprite:scale('bar' .. i, 1, math.max(b[i] or 0, 0.02), false) end
```

### 输出设备

### sound:listDevices()

返回：Table

此计算机上音频输出的名称(仅桌面).

```lua
for _, d in ipairs(sound:listDevices()) do print(d) end
```

### sound:currentDevice()

返回：String

游戏现在通过其播放的输出,或如果不知道则为 `''`.

```lua
text:set('device', 'Output: '..sound:currentDevice())
```

### sound:setDevice(name)

参数：
- `name`(String)——来自 `sound:listDevices()` 的精确名称

返回：Bool

将所有声音移动到另一个输出.如果名称错误或切换失败则返回 `false` 并报错.

```lua
sound:setDevice('Headphones (USB Audio)')
```

---

## 声音滤镜函数

`filters` 命名空间将音频通过 OpenAL 滤镜——低通 / 高通 / 带通截止加可选混响 / 回声 / 失真 / 合唱 / 镶边效果.它附加到播放中的活动通道并跟随它,每当通道变化时重新应用.这是音频；同名的 `filter:*` 命名空间是屏幕着色器——无关.

### 目标

每个函数接受一个 `target` 字符串命名要过滤什么：

- `'inst'`(别名 `'instrumental'`和`'song'`和`'music'`)——播放的伴奏

- `'player'`(`'bf'`和`'boyfriend'`)——玩家声乐

- `'opponent'`(`'dad'`和`'enemy'`)——对手声乐

- 一个 `sound:` 标签——用 `sound:playTag` 开始的一次性

- 一个 `music:` 标签——用 `music:play` 开始的轨道

- `'sfx'`(别名 `'sounds'`)——组：每个播放的一次性 SFX 一次

目标的第一次调用创建其滤镜条目；声音播放时每帧自动重新应用,并在下次状态切换时拆除.声音开始前设置的值在它开始时应用.

### filters:set(target, type)

参数：
- `target`(String)——见目标
- `type`(String)——`'lowpass'`/`'low'`和`'highpass'`/`'high'`和`'bandpass'`/`'band'` 或 `'none'`

返回：Bool

设置滤镜类型.与 `filters:gainHF` / `filters:gainLF` 组合控制它切多狠.`'none'` 保留条目(和任何效果)但停止频率切割.

```lua
-- 闷住歌曲(经典"水下"/暂停感)
filters:set('inst', 'lowpass')
filters:gainHF('inst', 0.1)

-- 薄和锡的收音机声乐
filters:set('player', 'highpass')
filters:gainLF('player', 0.2)
```

### filters:type(target)

参数：
- `target`(String)——见目标

返回：String

当前滤镜类型——`'lowpass'`和`'highpass'`和`'bandpass'` 或 `'none'`(没有条目时也是 `'none'`).

```lua
if filters:type('inst') == 'none' then filters:set('inst', 'lowpass') end
```

### filters:has(target)

参数：
- `target`(String)——见目标

返回：Bool

此目标是否存在滤镜条目(由任何 `filters:set` / `filters:gain*` / `filters:effect` 调用创建,由 `filters:remove` 移除).

```lua
print(filters:has('inst'))
```

### filters:gain(target, value)

参数：
- `target`(String)——见目标
- `value`(Float)——整体输出增益.`1` = 单位,`0` = 静音,`>1` 提升

返回：Bool

过滤信号的主增益.如需要创建条目.

```lua
filters:gain('sfx', 0.6)   -- 在过场动画下压低所有 SFX
```

### filters:gainHF(target, value)

参数：
- `target`(String)——见目标
- `value`(Float)——高频增益,`0`–`1`(`1` = 不切)

返回：Bool

高频带多少存活——`lowpass` 的深度.更低 = 更闷.

```lua
filters:set('inst', 'lowpass')
filters:gainHF('inst', 0.05)   -- 严重闷住
```

### filters:gainLF(target, value)

参数：
- `target`(String)——见目标
- `value`(Float)——低频增益,`0`–`1`(`1` = 不切)

返回：Bool

低频带多少存活——`highpass` 的深度.更低 = 更薄 / 更锡.

```lua
filters:set('player', 'highpass')
filters:gainLF('player', 0.15)   -- 电话声乐
```

### filters:getGain(target)

参数：
- `target`(String)——见目标

返回：Float

当前主增益(如果没有条目则为 `1.0`).

```lua
local g = filters:getGain('inst')
filters:gain('inst', g * 0.5)
```

### filters:apply(target)

参数：
- `target`(String)——见目标

返回：Bool

强制立即(重新)绑定滤镜到活动通道.很少需要——滤镜每帧自行同步——但在开始声音的同一帧你希望它被过滤时有用.如果目标未播放或没有条目则返回 `false`.

```lua
sound:playTag('door', 'sfx/door')
filters:set('door', 'lowpass')
filters:apply('door')
```

### filters:remove(target)

参数：
- `target`(String)——见目标

返回：Bool

从此目标分离滤镜及其所有效果并丢弃条目.之后干声音正常播放.

```lua
filters:remove('inst')   -- 回到正常
```

### filters:removeAll()

返回：Bool

移除每个滤镜条目(与对每个调用 `filters:remove` 相同).在状态切换时也自动运行.

```lua
filters:removeAll()
```

### 效果

在频率切割之上,目标可以携带命名效果.用 `filters:effect` 添加一个,然后用 `filters:effectSet(target, kind, param, value)` 塑造它.参数直接去底层 Flixel/OpenAL EFX 效果——见 OpenAL EFX 指南了解精确范围.

- `'reverb'`——`decayTime`和`decayHFRatio`和`reverbGain`和`reverbGainHF`和`density`和`diffusion`和`reflectionsGain`和`reflectionsDelay`和`lateGain`和`lateDelay`

- `'echo'`——`delay`和`lrDelay`和`damping`和`feedback`和`spread`

- `'distortion'`——`edge`和`distortionGain`和`lowpassCutoff`和`eqCenter`和`eqBandwidth`

- `'chorus'`——`waveform`(int)和`phase`(int)和`rate`和`depth`和`feedback`和`delay`

- `'flanger'`——`waveform`(int)和`phase`(int)和`rate`和`depth`和`feedback`和`delay`

目标可以同时持有多个效果类型.每种类型最多添加一次——第二次 `filters:effect(target, 'reverb')` 是无操作.

### filters:effect(target, kind)

参数：
- `target`(String)——见目标
- `kind`(String)——`'reverb'`和`'echo'`和`'distortion'`和`'chorus'`和`'flanger'`

返回：Bool

将效果附加到目标的滤镜(如需要创建条目).如果该类型已存在则无操作；未知类型失败.

```lua
filters:effect('inst', 'reverb')
filters:effectSet('inst', 'reverb', 'decayTime', 3.0)
filters:effectSet('inst', 'reverb', 'reverbGainHF', 0.6)
```

### filters:effectGain(target, kind, value)

参数：
- `target`(String)——见目标
- `kind`(String)——已用 `filters:effect` 添加的效果类型
- `value`(Float)——效果输出(湿)增益,通常 `0`–`1`

返回：Bool

一个效果的湿电平.如果该效果不在目标上则返回 `false`.

```lua
filters:effect('player', 'echo')
filters:effectGain('player', 'echo', 0.35)
```

### filters:effectSet(target, kind, param, value)

参数：
- `target`(String)——见目标
- `kind`(String)——已用 `filters:effect` 添加的效果类型
- `param`(String)——该类型的参数名——见效果(不区分大小写)
- `value`(Float)——新值(`waveform` / `phase` 舍入为 int)

返回：Bool

在效果上设置一个参数.如果效果不在目标上或参数名对该类型无法识别则失败.

```lua
filters:effect('inst', 'echo')
filters:effectSet('inst', 'echo', 'delay', 0.25)
filters:effectSet('inst', 'echo', 'feedback', 0.4)
filters:effectSet('inst', 'echo', 'damping', 0.5)
```

### filters:effectRemove(target, kind)

参数：
- `target`(String)——见目标
- `kind`(String)——要移除的效果类型

返回：Bool

从目标移除一个效果,保留滤镜和任何其他效果.如果它不在那里则返回 `false`.

```lua
filters:effectRemove('inst', 'reverb')
```

### filters:effectsClear(target)

参数：
- `target`(String)——见目标

返回：Bool

从目标移除每个效果但保留条目和其滤镜类型和其增益设置.

```lua
filters:effectsClear('inst')
```

---

## 状态函数

`state` 命名空间控制 FlxState / FlxSubState 过渡.引擎附带内置状态名称——`play`和`loading`和`boot` 和 `chart`(谱面编辑器)——其他任何东西被当作 Lua 脚本 id 并创建限定到该脚本的自定义 `LuaState`.

### state:change(name, arg?)

参数：
- `name`(String)——状态名称.内置：`'play'`和`'loading'`和`'chart'`.其他任何东西被当作 Lua 脚本 id.
- `arg`(any)——可选.由内置状态消耗；自定义 Lua 状态忽略它.[可选]

返回：Bool

切换当前状态.成功时返回 `true`,如果 `name` 为空或没有这样的场景脚本则返回 `false`(游戏运行时添加的脚本先加载)v0.7.2.

| `name` | 行为 | `arg` |
|---|---|---|
| `'play'` | 切换到 `PlayState` | 可选 `songName`(默认 `"test"`) |
| `'loading'` | 切换到 `LoadingState` | 可选 `songName` |
| `'chart'` | 打开谱面编辑器(也 `'editor'`和`'charteditor'`) | 可选 `songName`；没有它歌曲选择器打开 |
| 其他任何东西 | 切换到限定到该 id 脚本的 `LuaState` | (忽略) |

谱面编辑器.`state:change('chart', 'song-name')` 在该歌曲上打开编辑器,`state:change('chart')` 用歌曲选择器打开它.在它内按 F3 获得完整指南(快捷键和音符线和速度和事件和测试和主题和保存)；指南是 `assets/ui/help/chart-editor.json` 并可以无需重建编辑.Enter 在游戏中测试谱面,从播放头 Shift+Enter.测试期间 `game:get('testing')` 为 `true`,`song:play()` 被跳过,gui 窗口隐藏.自定义谱面事件：谱面事件.

```lua
state:change('play')                 -- 默认歌曲的 PlayState
state:change('play', 'your-song')      -- "your-song" 的 PlayState
state:change('loading', 'your-song')   -- 先显示加载条
state:change('menu')                 -- 限定到 scripts/menu.lua 的 LuaState
state:change('chart', 'your-song')     -- "your-song" 上的谱面编辑器
state:change('chart')                -- 谱面编辑器,先歌曲选择器
```

### state:restart()
*自 v0.3.2*

返回：Bool

重启当前状态.在 `PlayState` 内这现在与 `song:restart()` 相同的安全就地重置——谱面和音符和事件保持完整.在其他地方它从头重建状态(`FlxG.resetState()`)：相同状态类用新值重建,对于 `LuaState`,拥有的脚本的 `onCreate` 从头再次运行.仅在没有活动状态时返回 `false`.

与 `state:change(state:current())` 不同,这重新运行确切当前状态而无需知道其名称,也适用于内置状态.

```lua
-- 重试当前歌曲 / 屏幕
if input:keyJustPressed('R') then
    state:restart()
end
```

### state:open(name)

参数：
- `name`(String)——子状态的脚本 id(匹配 `scripts/` 下的 `.lua` 文件主干或完整路径).

返回：Bool

打开限定到 `scripts/<name>.lua` 的子状态.成功时返回 `true`,如果没有活动状态可打开则返回 `false`.子状态打开期间,父状态的脚本回调(`onUpdate`和`onStepHit`和`onBeatHit`和`onSectionHit`)被抑制——只有子状态的拥有脚本接收它们.

```lua
state:open('pause')   -- 将 scripts/pause.lua 作为 LuaSubstate 打开
```

### state:close()

返回：Bool

关闭当前打开的子状态.成功时返回 `true`,如果没有子状态打开则返回 `false`.父状态脚本回调在下一帧恢复.

```lua
state:close()
```

### state:current()

返回：String

返回当前活动状态的名称.对于 Lua 状态这是拥有脚本 id(`'boot'`和`'menu'` 等)；对于内置状态返回 `'play'` 或 `'loading'`；否则返回完全限定的 Haxe 类名作为回退.

```lua
print(state:current())
-- [scripts/menu:1] menu
```

---

## JSON 函数

在内存中将 Lua 表与 JSON 来回转换(`encode` / `decode`)或直接按路径到文件(`save` / `load`).Lua 表映射到 JSON 对象(字符串键)或数组(数字列表)；原始类型按原样映射.与 file:* 和线上的 JSON 网络 net:* 自然配对.读取也接受 JSON5：无引号键和`//` 和 `/* */` 注释和尾随逗号和单引号和十六进制数字和 `Infinity`/`NaN`.解析错误命名行和列.

### json:encode(value, pretty, json5)
*自 v0.7.1*

参数：
- `value`(Table | String | Number | Bool)——要序列化的值.表变成 JSON 对象(字符串键)或数组(数字列表).
- `pretty`(Bool)——如果 `true`,跨多行缩进；否则紧凑单行 JSON [默认 false]
- `json5`(Bool)——写 JSON5：无引号键,每行一个短对象.总是缩进.[默认 false]

返回：String

将 Lua 值序列化为 JSON 字符串.嵌套表和数组递归处理.

```lua
local s = json:encode({ name = 'player', score = 1200, items = {'sword', 'shield'} })
print(s)   -- {"name":"player","score":1200,"items":["sword","shield"]}

print(json:encode({ x = 1, y = 2 }, true))   -- 漂亮,多行
```

### json:decode(str)
*自 v0.7.1*

参数：
- `str`(String)——要解析的 JSON 或 JSON5 字符串

返回：Table | nil

将 JSON 字符串解析为 Lua 表(对象 → 字符串键表,数组 → 1 基列表,原始类型按原样).无效或空输入时返回 `nil`,所以索引前保护结果.

```lua
local data = json:decode('{"name":"player","score":1200}')
if data then print(data.name, data.score) end   -- player  1200
```

### json:load(path)
*自 v0.7.1*

参数：
- `path`(String)——要读取的文件路径.没有扩展名时先尝试 `.json`,然后 `.json5`

返回：Table | nil

读取 `path` 处的 JSON 文件并一步解码为 Lua 表——`json:decode(file:read(path))` 的简写.如果文件缺失或 JSON 无效则返回 `nil`.

```lua
local chart = json:load('assets/data/song.json')
if chart then
    print(chart.bpm, #chart.notes)
end
```

### json:save(path, value, pretty, json5)
*自 v0.7.1*

参数：
- `path`(String)——目标路径(缺失的父文件夹被创建)
- `value`(Table | String | Number | Bool)——要序列化并写入的值
- `pretty`(Bool)——缩进写入的 JSON [默认 true]
- `json5`(Bool)——写 JSON5.以 `.json5` 结尾的路径自行打开这个.[默认 false]

返回：Bool

将 Lua 值编码为 JSON 并一步写入 `path`——`file:write(path, json:encode(value, pretty))` 的简写.失败时返回 `false`.

```lua
json:save('data/config.json', { volume = 0.8, name = 'player1' })
```

### JSON5 和谱面文件

引擎读取的每个 JSON(谱面和`events.json`和事件类型和音符皮肤配置和编辑器主题和帮助和`json:*`)都通过相同的 JSON5 读取器,所以你可以手写它们带注释和无引号.纯 JSON 仍然是有效 JSON5,旧文件加载不变.

谱面编辑器的 Save as 窗口提供 Freak Engine chart(JSON)和Freak Engine chart(JSON5)和 Psych Engine chart.两种 Freak 格式每行写一个音符并跳过默认值(`l: 0`和空音符类型).当其他工具(Psych和在线验证器)必须打开文件时选择 JSON；JSON5 约小 15% 且更易读.Ctrl+S 重用最后选择.

---

## 存档函数

由 HaxeFlixel 的 FlxSave 支持的持久键值存储——设置和进度和高分的正确地方.值在会话之间存活并住在平台存档槽中(无需管理文件路径).表通过 JSON 转换存储和读回,所以嵌套表和数组往返.调用 `save:flush()` 将更改写入磁盘.对于路径上的原始文件,使用 file:* 或 json:save 代替.

### save:bind(name)

参数：
- `name`(String)——存档槽名称.不同名称保持单独数据(例如 `'settings'` vs `'progress'`).

返回：Bool

打开(或创建)命名存档槽并使其对之后的 `set`/`get` 调用活动.可选——如果你从不调用 `bind`,使用默认槽 `"freak"`.再次调用 `bind` 关闭前一个槽并切换.

名称不能匹配项目自己的 `<app file>` 除了大小写.Flixel 自己的内部存档(音量/静音/历史)自动绑定到那个确切名称；在 Windows/macOS 上仅大小写不同的名称解析到磁盘上相同文件,同时在内存中作为单独和未同步的存档跟踪——最后刷新的那个静默覆盖另一个.`bind` 直接拒绝冲突名称并报错.

```lua
save:bind('progress')
save:set('level', 5)
save:flush()
```

### save:set(key, value)

参数：
- `key`(String)——存储值的名称
- `value`(Any)——要存储的值——字符串和数字和布尔或表(通过 JSON 存储)

返回：Bool

在活动存档槽中将值写入 `key` 下.表被转换,所以嵌套数据往返.更改保存在内存中直到你调用 `save:flush()`.

```lua
save:set('volume', 0.8)
save:set('player', { name = 'p1', score = 1200 })
save:flush()
```

### save:get(key, default)

参数：
- `key`(String)——存储值的名称
- `default`(Any?)——键从未设置时返回而不是 `nil` [默认 nil]

返回：Any | nil

从活动存档槽读回值.存储的表回来为 Lua 表.键从未设置时返回 `default`(或如果省略则为 `nil`)——default 参数自 v0.6.0.

```lua
local vol = save:get('volume', 1.0)   -- 不再需要 "or 1.0"
local player = save:get('player')
if player then print(player.name, player.score) end
```

### save:has(key)

参数：
- `key`(String)——要检查的名称

返回：Bool

如果活动存档槽包含 `key` 下的值则返回 `true`.便于首次运行默认值.

```lua
if not save:has('volume') then
    save:set('volume', 1.0)
    save:flush()
end
```

### save:flush()

返回：Bool

现在将所有待定 `set`/`erase` 更改提交到磁盘.不再严格需要——自 v0.6.0 起活动存档在窗口关闭和每次 `state:change()` 时也自动刷新——但对于"现在保存并确定"时刻有用,像在大解锁后立即.

```lua
save:set('score', 9999)
save:flush()   -- 现在持久化
```

### save:keys()
*自 v0.6.0*

返回：Array

列出活动存档槽中当前存储的每个键.便于"清除此特定设置"调试工具,或健全检查实际写入了什么.

```lua
for i, key in ipairs(save:keys()) do
    print(key, save:get(key))
end
```

### save:erase(key)

参数：
- `key`(String)——要移除的值的名称

返回：Bool

从活动存档槽移除单个键.如果键存在则返回 `true`.之后调用 `save:flush()` 持久化移除.

```lua
save:erase('player')
save:flush()
```

### save:clear()

返回：Bool

清除整个活动存档槽——每个键被移除并立即写入更改.小心使用.

```lua
save:clear()   -- 重置此槽中所有存储数据
```

---

## 文件函数

在任何路径读取和写入文本文件(JSON和CSV和纯文本和关卡数据)——不像 save:*,它锁定到经过清理的 `save/` 文件夹.你可以做快速一次性读/写,或将文件加载到标记句柄并通过 game:get 检查它——其路径和内容和行数和字符长度.

### 文件句柄和 game:get

`file:load` 和 `file:save` 在标签下注册句柄,game:get 上的类型化 `file.<tag>` 路径可以读取：

| 路径 | 返回 |
|---|---|
| `game:get('file.<tag>.path')` | String——文件路径 |
| `game:get('file.<tag>.content')` | String——完整文本 |
| `game:get('file.<tag>.lines')` | Int——行数 |
| `game:get('file.<tag>.length')` | Int——字符数 |

对于 JSON 文件有一个快捷方式——`json:load(path)` 一步读取 + 解码,`json:save(path, table)` 编码 + 写入(如需要创建文件夹),所以你很少需要手工组合 `file:*` 与 `json:*`.

### file:save(tag, path, content)

参数：
- `tag`(String)——注册文件的句柄标签(用于 `game:get`)
- `path`(String)——目标路径(缺失的父文件夹被创建)
- `content`(String)——要写入的文本(JSON 使用 `json:encode`)

返回：Bool

将文本写入 `path` 并在 `tag` 下注册句柄.创建任何缺失的父目录.失败时返回 `false`(带错误控制台说明).

```lua
file:save('cfg', 'data/config.json', json:encode({ volume = 0.8, name = 'p1' }))
print(game:get('file.cfg.lines'))
```

### file:load(tag, path)

参数：
- `tag`(String)——注册加载文件的句柄标签
- `path`(String)——要读取的文件路径

返回：Bool

将 `path` 处的文件读入 `tag` 下的句柄,捕获其内容和行数和长度.如果文件不存在或无法读取则返回 `false`.之后用 `game:get('file.<tag>.…')` 读取其数据.

```lua
if file:load('save1', 'data/save1.json') then
    local data = json:decode(game:get('file.save1.content'))
    print('loaded', game:get('file.save1.lines'), 'lines')
end
```

### file:read(path)

参数：
- `path`(String)——要读取的文件路径

返回：String | nil

快速一次性读取——直接返回文件文本(无句柄),或如果不存在则为 `nil`.当你只想要内容且不需要 `game:get` 元数据时使用.

```lua
local txt = file:read('data/notes.txt')
local cfg = json:decode(file:read('data/config.json'))
```

### file:write(path, content)

参数：
- `path`(String)——目标路径(缺失的父文件夹被创建)
- `content`(String)——要写入的文本

返回：Bool

快速一次性写入——将文本写入 `path` 而不注册句柄.创建缺失的父目录.

```lua
file:write('data/log.txt', 'started at ' .. game:get('songTime'))
file:write('data/config.json', json:encode(settings))
```

### file:exists(path)

参数：
- `path`(String)——要检查的路径

返回：Bool

如果该路径存在文件则返回 `true`.

```lua
if file:exists('data/config.json') then ... end
```

### file:remove(tag)

参数：
- `tag`(String)——要丢弃的句柄标签

返回：Bool

丢弃加载的文件句柄(释放缓存内容,所以 `game:get('file.<tag>')` 不再解析).这不删除磁盘上的文件——使用你的 OS 删除.

```lua
file:remove('chart')
```

---

## 语言函数

通过 `.lang` 文件本地化.按代码加载语言并按键查找翻译字符串,带 `{0}` 占位符替换和自动回退语言用于缺失键.

### .lang 格式

`.lang` 文件是纯 `key=value` 文本,每行一个条目——与 Minecraft 的语言文件相同的想法.第一个 `=` 分割键和值(所以值可以包含 `=`).以 `#` 开头的行是注释,空行被忽略,值内的 `\n` 变成真正换行.`{0}`和`{1}`……被传递给 `lang:get` 的参数替换.

### lang:set(code)
*自 v0.5.4*

参数：
- `code`(String)——语言代码——不带扩展名的文件名(例如 `'en'`和`'es'`)

返回：Bool

将该语言加载为活动.如果找不到文件则返回 `false`(并记录警告),所以你可以优雅回退.选择是全局的并在状态切换中存活.引擎不为你持久化它——如果你想它粘住,自己保存(见下面的示例).

```lua
-- 启动时：恢复保存的语言,默认英语
lang:set(save:get('language') or 'en')

-- 当玩家选择一个
lang:set('es')
save:set('language', lang:current()); save:flush()
```

### lang:get(key, args)
*自 v0.5.4*

参数：
- `key`(String)——翻译键
- `args`(Any?)——`{0}` 的单个值,或 `{0}`和`{1}`……的表

返回：String

返回 `key` 的翻译字符串,用 `args` 填充任何 `{n}` 占位符.如果键在当前语言中缺失则回退到回退语言；如果在那里也缺失,它返回键本身,所以未翻译字符串可见而不是空白.

```lua
lang:get('menu.play')            -- "Play"
lang:get('hud.score', 5000)      -- "Score: 5000"  (单参数 -> {0})
lang:get('greeting', {'World'})  -- 一个或多个参数的表
text:set('scoreLabel', lang:get('hud.score', game:get('score')))
```

### lang:has(key)
*自 v0.5.4*

参数：
- `key`(String)——翻译键

返回：Bool

键是否存在于当前语言或回退中.当翻译是可选时用它分支.

```lua
if lang:has('tutorial.hint') then text:set('hint', lang:get('tutorial.hint')) end
```

### lang:current()
*自 v0.5.4*

返回：String

当前活动语言的代码.

```lua
print(lang:current())  -- "es"
```

### lang:fallback(code)
*自 v0.5.4*

参数：
- `code`(String)——用于填充缺失键的语言代码

返回：Bool

设置回退语言(默认 `'en'`).活动语言中缺失的任何键在这里查找,所以部分翻译仍然工作.在 `lang:set` 之前或之后设置它——它立即重新加载.

```lua
lang:fallback('en')
lang:set('es')   -- 西班牙语,英语填充任何间隙
```

### lang:list()
*自 v0.5.4*

返回：Array

所有可用语言代码——嵌入的 `assets/lang/*.lang` 和磁盘上的任何外部 `lang/*.lang` 文件.便于构建语言选择菜单.

```lua
for _, code in ipairs(lang:list()) do print(code) end
```

### lang:reload()
*自 v0.5.4*

返回：Bool

从磁盘/资产重新读取当前语言文件——用于编辑外部 `.lang` 文件时热重载翻译.

```lua
lang:reload()
```

---

## 网络函数

`net` 命名空间让脚本上线——要么连接到服务器,要么自己托管——并实时交换消息.这是你在其上构建在线平台游戏(或任何多人模式)的层：每帧广播你的玩家位置,接收其他人的,同步世界事件.一个对等方可以托管内置中继服务器(见 Hosting),而其他所有人连接.

底层是讲换行分隔 JSON 的 TCP 客户端.每条消息是一行形式 `{"event": "<name>", "data": <anything>}`.套接字在后台线程运行,所以它永不阻塞游戏循环；接收的消息每帧在主线程排出和分发一次,所以你的 Lua 处理程序在与 `onUpdate` 相同的上下文中运行——安全触摸精灵和状态和任何东西.

### 如何工作

三个活动部分：

- 连接.`net:connect(host, port)` 启动打开 TCP 套接字的工作线程.它立即返回——观察 `onConnect()`(或轮询 `net:connected()`)获得实际结果.

- 发送.`net:send(event, data)` 排队消息.`data` 可以是表(`{x=1, y=2}`)和字符串和数字和布尔或无.表自动序列化为 JSON.

- 接收.每帧引擎读取套接字上的完整行,解析它们并分发.你以两种方式得到负载(使用任一或两者)：

- 每事件处理程序——`net:on('move', 'onPeerMove')` 每当 `move` 消息到达时调用你的全局 Lua 函数 `onPeerMove(data)`.

- 全局回调——在任何脚本中定义 `onNetMessage(event, data)` 捕获每条消息,加上 `onConnect()` / `onDisconnect(reason)` 用于连接生命周期.

入站 `data` 总是作为 Lua 表到达(或非对象负载的原始类型),所以你用正常字段访问读取它：`data.x`和`data.name`和数组的 `#data`.

### 连接

### net:connect(host, port)

参数：
- `host`(String)——服务器主机名或 IP.可以将端口嵌入为 `'host:port'`,在这种情况下 `port` 参数可选.
- `port`(Int)——TCP 端口.如果端口嵌入在 `host` 中则可选；没有端口时使用 `7777`.[默认 7777]

返回：Bool

在后台线程打开连接.如果尝试已开始(有效主机/端口)则返回 `true`,否则返回 `false`——不是连接本身的成功信号,连接异步完成.等待 `onConnect()` 回调或轮询 `net:connected()`.再次调用 `connect` 先拆除任何现有连接.如果连接失败,`onDisconnect` 和 `net:on('disconnect')` 获得可读原因：地址和经过哪个网络(例如 Radmin VPN)以及检查什么,如主机上的 Windows 防火墙.

```lua
net:connect('127.0.0.1', 8080)
-- 或端口嵌入：
net:connect('play.myserver.com:8080')

function onConnect()
    print('connected as ' .. net:id())
end
```

### net:join(target, name)
*自 v0.7.6*

参数：
- `target`(String | Table)——像 `'192.168.1.5'` 或 `'26.14.3.8:7777'` 的地址,或来自 `net:rooms()` 的房间
- `name`(String)——你的玩家名称,如 `net:setName` [可选]

返回：Bool

加入房间.端口默认为 `7777`.通过 Porthole,地址是 `'127.0.0.1'` 带 Porthole 显示的端口.

```lua
local found = net:rooms()
if #found > 0 then net:join(found[1], 'Guest') end

net:join('26.14.3.8:7777')
```

### net:rooms()
*自 v0.7.6*

返回：Table

你的网络上现在打开的房间.第一次调用启动每秒重复的搜索,只要你继续调用它,所以从 `onUpdate` 或计时器调用它.每个房间有 `name`和`address`和`port`和`players`和`ping` 和 `network`.它搜索计算机所在的每个网络,包括 VPN 如 Radmin VPN 和 ZeroTier；通过 Porthole 共享的房间在其 UDP 端口 7778 也共享时显示.

```lua
for _, room in ipairs(net:rooms()) do
    print(room.name, room.network, room.players .. ' players', room.ping .. ' ms')
end
```

### net:players()
*自 v0.7.6*

返回：Table

房间中的每个人,包括你和主机.每个条目有 `id`和`name`和`ping`和`host`和`me`和`network`(连接如何到达它们,例如 `Wi-Fi`和`Radmin VPN`和`Porthole (Steam)`)和 `shared`(它们的共享值).

```lua
for _, p in ipairs(net:players()) do
    print(p.name, p.ping .. ' ms', p.network)
end
```

### net:player(id)
*自 v0.7.6*

参数：
- `id`(String | Table)——玩家 id 或玩家表 [可选]

返回：Table

按 id 的一个玩家,或如果它们不在房间中则为 `nil`.没有参数时是你.

```lua
local p = net:player('host')
if p then print(p.name) end
```

### net:me()
*自 v0.7.6*

返回：Table

你自己的玩家表.连接有 id 之前为 `nil`,所以在 `net:on('connect')` 或之后读取它.

```lua
net:on('connect', function()
    print('I am ' .. net:me().id)
end)
```

### net:share(key, value)
*自 v0.7.6*

参数：
- `key`(String)——值的名称
- `value`(Any)——新值；`nil` 清除它

返回：Bool

设置你的共享值之一.每个人在 `player.shared` 中看到它并获得 `share` 事件.只有你可以更改你自己的值.

```lua
net:share('ready', true)

net:on('share', function(player, key, value)
    print(player.name .. ' set ' .. key)
end)
```

### net:shared(key, player)
*自 v0.7.6*

参数：
- `key`(String)——值的名称
- `player`(String | Table)——谁的值；省略时为你 [可选]

返回：Any

读取玩家的共享值.

```lua
if net:shared('ready', player) then print(player.name .. ' is ready') end
```

### net:info()
*自 v0.7.6*

返回：Table

连接现在看起来如何：`role`(`host`和`client`和`connecting`和`offline`)和`room`和`name`和`id`和`address`和`port`和`network` 和 `kind`(`lan`和`vpn`和`steam`和`internet`……)和`transport`(TCP)和`discovery`和`players`和`ping`和`upload` 和 `download` 以字节每秒为单位.主机还获得 `addresses`：玩家可以加入的每个地址及其网络.`debug:net(true)` 在屏幕上显示相同内容.

```lua
local i = net:info()
text:set('netInfo', i.role .. ' · ' .. i.network .. ' · ' .. i.ping .. ' ms')
```

### net:describe()

返回：String

`debug:net` 显示的连接摘要(角色和房间和地址和网络和玩家和ping),作为现成的文本行用于你自己的叠加层.

```lua
function onUpdate(dt)
    text:set('netInfo', net:describe())
end
```

### net:connected()

返回：Bool

一旦套接字打开且握手成功则为 `true`,连接中和断开后或从未开始连接时为 `false`.便宜——每帧安全轮询以门控仅在线 UI.

```lua
if net:connected() then
    net:send('move', {x = px, y = py})
end
```

### net:status()

返回：String

连接的当前阶段作为字符串：`'idle'`(从未连接)和`'connecting'`和`'connected'`和`'closed'`(干净断开)或 `'error'`(连接失败或链路断开).用它驱动比布尔 `net:connected()` 更细粒度的状态指示器.

```lua
local labels = { idle='offline', connecting='...', connected='online', closed='offline', error='failed' }
text:set('status', labels[net:status()])
```

### net:disconnect()

返回：Bool

关闭连接并停止工作线程.如果连接打开则返回 `true`.下一帧触发 `onDisconnect('closed')`.连接不会在状态切换时自行关闭,所以玩家离开在线会话时显式调用这个.

```lua
function onLeaveLobby()
    net:disconnect()
    state:change('mainmenu')
end
```

### net:id()

返回：String

你自己的玩家 id,由服务器分配.服务器发送保留的 `_id` 消息之前为空(`''`)(见上面的协议注释).经典用途是当服务器向所有人重新广播时过滤掉你自己广播的回声.

```lua
function onPeerMove(d)
    if d.id == net:id() then return end
    -- ... 渲染其他玩家 ...
end
```

### net:ping()

返回：Float

你到主机的往返延迟,毫秒——通过与主机约每秒交换一次的保留心跳自动测量,所以无需接线.第一次往返完成前和未连接时或主机上(它通过 `net:pingOf` 读取每个客户端的 ping)返回 `0`.

自 v0.4.0(2026-06-16).

```lua
function onUpdate(dt)
    text:set('pingLabel', math.floor(net:ping()) .. ' ms')
end
```

### net:setName(name)

参数：
- `name`(String)——附加到此连接的显示名称

返回：Bool

设置你的显示名称.任何时候都可以调用：在 `net:join` 或 `net:host` 之前它被保留并在你进入后发送,之后立即发送,每个人得到 `name` 事件.超过服务器限制的名称被截断.返回 `true`.

```lua
net:setName(text:inputGet('name'))
net:join('192.168.1.20')
```

### 发送消息

### net:send(event, data, to)

参数：
- `event`(String)——消息名称.另一边基于此路由(例如 `'move'`和`'chat'`和`'shoot'`).
- `data`(Table | String | Number | Bool)——负载.表序列化为 JSON 对象(字符串键)或数组.可选——省略为裸信号.[可选]
- `to`(Table | String)——玩家表或玩家 id.只有该玩家接收消息；省略以发送给每个人.[可选]

返回：Bool

排队消息.如果未连接或事件名称为空则返回 `false`(记录到错误控制台).非阻塞——负载交给工作线程写入——所以每帧调用安全,例如从 `onUpdate` 广播玩家状态.从主机也工作：那里它直接去玩家.任何语言的文本,包括西里尔文,完整到达.

```lua
net:send('move', {x = px, y = py})
net:send('chat', {text = 'gg'})
net:send('whisper', {text = 'hi'}, player)
```

### net:on(event, fn)

参数：
- `event`(String)——要监听的入站事件名称.
- `fn`(Function | String)——作为 `fn(player, data, info)` 调用的函数：`player` 是谁发送的,`data` 解码的负载,`info` 何时发送：`info.clock`(共享时钟,见 `net:clock`)和`info.age`(到达所用毫秒)和 `info.song`(发送者的歌曲时间).字符串仍然以旧方式工作：仅用 `data` 调用的全局函数名称.

返回：Bool

为一个事件注册处理程序.除了你自己的事件还有内置的：`join` 和 `leave` 获得玩家,`connect` 一旦连接有 id 触发,`disconnect` 获得原因,`name` 当某人更改名称时获得玩家,`share` 当某人更改共享值时获得 `(player, key, value)`.函数处理程序属于当前屏幕并在它变化时清除,像计时器,所以在 `onCreate` 中注册它们.重新注册相同事件替换前一个处理程序.

```lua
function onCreate()
    net:on('join', function(player)
        sprite:rec('p_' .. player.id, 620, 340, 40, 40, '33CCFF')
    end)

    net:on('move', function(player, data)
        sprite:position('p_' .. player.id, data.x, data.y)
    end)

    net:on('leave', function(player)
        sprite:remove('p_' .. player.id)
    end)
end
```

### net:clock()
*自 v0.7.8*

返回：Float

共享时钟(毫秒)：主机的定时,每个玩家相同数字.客户端自动测量它们到主机的偏移(加入后立即几个快速样本,然后每 2 秒,保留最快往返),所以准确到几毫秒.用它使某事对每个人在同一时刻发生：发送稍在未来的时间,当 `net:clock()` 达到它时行动.

```lua
-- 主机
net:broadcast('boom', {at = net:clock() + 500})

-- 每个人
local boomAt = nil
net:on('boom', function(p, d) boomAt = d.at end)
function onUpdate(dt)
    if boomAt and net:clock() >= boomAt then
        boomAt = nil
        camera:shake('game', 0.02, 0.3)
    end
end
```

### net:clockReady()
*自 v0.7.8*

返回：Bool

一旦共享时钟测量完成则为 `true`(主机上总是 `true`).在用它安排任何东西之前等待它.

```lua
if net:clockReady() then
    net:send('ready')
end
```

### net:syncSong(on)
*自 v0.7.8*

参数：
- `on`(Bool?)——`false` 关闭它 [默认 true]

返回：Bool

使歌曲跟随主机的歌曲时钟.在歌曲开始前在每个玩家上调用它.它开启且你连接或托管时,歌曲在加载后等待而不是自行开始,直到主机调用 `net:songStart`.倒计时提前开始,所以音乐对每个人在完全相同时刻开始.歌曲期间引擎保持每个玩家的音乐在主机几毫秒内,并跟随主机的暂停和恢复和跳转.你自己的暂停菜单只暂停你：关闭后你跳到其他人所在的位置.仅共享时机；音符和生命值和任何其他东西保持本地,自己用 `net:send` 发送那些.

```lua
function onCreate()
    net:syncSong(true)
    song:play('arena')
end
```

### net:songStart(delay)
*自 v0.7.8*

参数：
- `delay`(Number?)——从现在到音乐对每个人开始的毫秒数；为倒计时留空间 [默认 2000]

返回：Bool

仅主机.在共享时钟上从现在起 `delay` 毫秒时对每个玩家同时开始歌曲.晚加入的玩家直接跳到正确位置.

```lua
net:on('ready', function(player)
    readyCount = readyCount + 1
    if readyCount == net:clientCount() then net:songStart(2500) end
end)
```

### net:songPause()
*自 v0.7.8*

返回：Bool

仅主机.在当前歌曲时间为每个人暂停歌曲.

```lua
net:songPause()
```

### net:songResume(delay)
*自 v0.7.8*

参数：
- `delay`(Number?)——从现在到再次播放的毫秒数 [默认 1000]

返回：Bool

仅主机.在同一时刻为每个人恢复暂停的歌曲.

```lua
net:songResume(1000)
```

### net:songSeek(ms, delay)
*自 v0.7.8*

参数：
- `ms`(Number)——跳到的歌曲时间
- `delay`(Number?)——从现在到每个人跳转的毫秒数 [默认 500]

返回：Bool

仅主机.一起将歌曲移到 `ms` 给每个人.

```lua
net:songSeek(60000)
```

### net:songStop()
*自 v0.7.8*

返回：Bool

仅主机.丢弃共享歌曲时钟：歌曲回到自行播放.

```lua
net:songStop()
```

### net:songTime()
*自 v0.7.8*

返回：Float

歌曲现在在共享时钟上的位置,毫秒：每个玩家相同.主机开始歌曲之前它是本地歌曲时间.`net:on` 处理程序中的 `info.song` 是发送者处的这个值,所以你可以告诉某事发生在哪拍.

```lua
net:on('heal', function(player, d, info)
    local late = net:songTime() - info.song
    print(player.name .. ' healed ' .. math.floor(late) .. ' ms ago')
end)
```

### net:off(event)

参数：
- `event`(String)——应移除处理程序的事件名称.

返回：Bool

注销之前用 `net:on` 设置的处理程序.如果处理程序存在且被移除则返回 `true`.全局 `onNetMessage` 回调仍然为该事件触发——`off` 只分离每事件处理程序.

```lua
net:off('move')
```

### 连接回调

引擎广播到每个脚本的三个全局回调——在你处理网络的任何地方定义它们.像 `onUpdate`,它们在主线程运行.

| 回调 | 何时触发 |
|---|---|
| `onConnect()` | 套接字打开且连接活动.发送 `join` 消息的好地方. |
| `onDisconnect(reason)` | 连接结束.`reason` 是干净断开的 `'closed'` 或链路断开/从未打开的错误字符串. |
| `onNetMessage(event, data)` | 任何消息到达——捕获所有.除任何匹配的 `net:on` 处理程序之外运行.用于日志记录,或路由你没有单独注册的事件. |

### 托管服务器

脚本可以用 `net:host(port)` 自己托管一个——将那台机器变成其他所有人连接的中继.内置主机是中继：它接受客户端连接,为每个分配 id(通过保留的 `_id` 消息发送,所以每个客户端的 `net:id()` 工作),并自动将收到的每条消息重新广播给所有其他客户端.这正是在线平台游戏需要的——一个对等方托管,其余加入,每个人看到每个人.

主机也可以参与游戏本身：`net:broadcast(event, data)` 推送消息给每个客户端,`net:sendTo(id, event, data)` 定位一个,`onHostMessage` / `onClientJoin` / `onClientLeave` 回调报告客户端在做什么.

托管和连接是独立的——机器可以托管同时也是自己服务器的客户端(连接到 `127.0.0.1`),所以主机玩家经过与其他人相同的消息路径.

### net:host(room, port, bindHost)

参数：
- `room`(String)——其他玩家在 `net:rooms()` 中看到的房间名称.在这里传递数字以使用旧的 `net:host(port, bindHost)` 形式.[可选]
- `port`(Int)——要监听的 TCP 端口 [默认 7777]
- `bindHost`(String)——要绑定到的接口.默认 `'0.0.0.0'`(所有接口——可从其他机器到达).传递 `'127.0.0.1'` 仅接受本地连接.[可选]

返回：Bool

在 `port` 上启动中继服务器.与 `net:connect` 不同,绑定立即发生,所以返回值有意义：`true` 表示服务器正在监听；`false`(带错误控制台说明)表示绑定失败——几乎总是因为端口已在使用.再次调用 `host` 替换任何现有服务器.服务器在 `state:change` 中继续运行直到 `net:stopHost`.主机也是玩家,id 为 `'host'`：它获得每个人的 `join` 和 `leave`,用 `net:send` 发送并出现在 `net:players()` 中.房间打开时它在 UDP 端口 7778 上回答 `net:rooms()` 搜索.不要在同一游戏中 `net:host` 后调用 `net:join`：主机已在其房间中,再次加入使它出现两次.要检查你是否以任一方式在线,使用 `net:connected() or net:isHosting()`.

```lua
if net:host('Friday night') then
    print('room is open')
end

net:host(8080)
```

### net:portAvailable(port, bindHost)

参数：
- `port`(Int)——要测试的端口
- `bindHost`(String)——要测试的接口(默认 `'0.0.0.0'`)[可选]

返回：Bool

如果端口空闲可托管则返回 `true`(测试绑定成功),如果某些东西已绑定则返回 `false`.快速和本地和非阻塞检查——用它选择空闲端口或决定在调用 `net:host` 之前是否可以托管.

```lua
local port = 8080
if not net:portAvailable(port) then port = 8081 end
net:host(port)
```

### net:hostExists(host, port)

参数：
- `host`(String)——要探测的服务器 IP / 主机名.可以将端口嵌入为 `'ip:port'`.
- `port`(Int)——要探测的端口(如果嵌入在 `host` 中则可选)[默认 0]

返回：Bool

如果服务器已在 `host:port` 运行且可达则返回 `true`(测试连接成功),如果没有应答则返回 `false`(连接拒绝).这是"此 IP/端口上有主机吗？"检查.注意：它进行短暂的阻塞连接尝试——对被拒绝的本地端口立即,但如果地址不可达可能需要片刻,所以优先在已知 LAN/IP 上使用而不是任意互联网主机.

```lua
if net:hostExists('127.0.0.1', 8080) then
    net:connect('127.0.0.1', 8080)   -- 有人在托管；加入他们
else
    net:host(8080)                   -- 那里没人；托管它
end
```

### net:isHosting()

返回：Bool

此机器运行服务器期间(在 `net:host` 和 `net:stopHost` 之间)返回 `true`.用它分支仅主机逻辑,或显示"托管中"指示器.

```lua
if net:isHosting() then text:set('role', 'HOST') end
```

### net:stopHost()

返回：Bool

停止服务器并断开所有客户端(每个看到链路断开).如果服务器在运行则返回 `true`.托管在状态中持续,所以主机离开会话时调用这个.

```lua
net:stopHost()
```

### net:clientCount()

返回：Int

当前连接到你的服务器的客户端数.未托管时为 `0`.用它门控比赛开始("等待玩家……")或显示大厅计数.

```lua
text:set('lobby', net:clientCount() .. ' players connected')
```

### net:clients()

返回：Table

当前连接到你的服务器的每个客户端 id 的数组(主机侧；未托管时为空).列表在客户端加入和离开时自动维护(与 `onClientJoin` / `onClientLeave` 中获得的相同 id,并传递给 `net:sendTo`).迭代它构建记分板或玩家列表.

自 v0.4.0(2026-06-16).

```lua
for _, cid in ipairs(net:clients()) do
    print(net:nameOf(cid), net:pingOf(cid) .. 'ms')
end
```

### net:pingOf(id)

参数：
- `id`(String)——连接客户端的 id

返回：Float

到给定客户端的往返延迟,毫秒(主机侧)——主机心跳每个客户端并记录每个回复时自动测量.未知 id 或第一次往返之前返回 `0`.`net:ping` 的镜像(客户端对其到主机延迟的视图).

自 v0.4.0(2026-06-16).

```lua
for _, cid in ipairs(net:clients()) do
    if net:pingOf(cid) > 200 then
        print(net:nameOf(cid) .. ' has a high ping')
    end
end
```

### net:nameOf(id)

参数：
- `id`(String)——玩家 id,主机为 `'host'`

返回：String

任何玩家的显示名称,在主机和每个客户端上,包括主机自己的名称和你的.未知 id 或尚未设置名称的玩家返回 `''`.

```lua
net:on('join', function(player)
    print(net:nameOf(player.id) .. ' joined')
end)
```

### net:broadcast(event, data)

参数：
- `event`(String)——消息名称
- `data`(Table | String | Number | Bool)——负载(与 `net:send` 相同的编码)[可选]

返回：Bool

从主机向每个连接客户端发送消息.如果你不托管则返回 `false`.用于权威主机事件——比赛开始和世界状态和生成的拾取——所有玩家必须看到.

```lua
net:broadcast('matchStart', { seed = 12345 })
```

### net:sendTo(id, event, data)

参数：
- `id`(String)——目标客户端 id(来自 `onClientJoin` / `onHostMessage`)
- `event`(String)——消息名称
- `data`(Table | String | Number | Bool)——负载 [可选]

返回：Bool

从主机按 id 向一个特定客户端发送消息.如果你不托管则返回 `false`.用于私有回复——欢迎包和生成位置和"你是玩家 2"分配.

```lua
function onClientJoin(id)
    net:sendTo(id, 'welcome', { yourTeam = (net:clientCount() % 2) })
end
```

### net:rateLimit(perSec)
*自 v0.5.9*

参数：
- `perSec`(Int)——每秒接受的消息数,每客户端.0 = 无限制.默认 120

返回：Bool

限制主机每秒从任何单个客户端接受多少消息；其余被丢弃,每个触发 `onNetRejected(id, "rate", event)`.这是阻止损坏或恶意客户端淹没中继并盖过其他所有人的东西.从主机调用它,理想地在任何人连接之前.每帧发送的位置很快超过低限制,所以改为每秒约 20 次发送它们(`onUpdate` 中的小计时器就够).

```lua
net:rateLimit(60)   -- 为更健谈的游戏降低它,或 0 禁用
```

### 主机回调

托管时,引擎广播这些全局回调(与上面的客户端回调一起)以便你的脚本对客户端做出反应.像 `onUpdate`,它们在主线程运行.

| 回调 | 何时触发 |
|---|---|
| `onClientJoin(id)` | 客户端连接.`id` 是主机分配它的字符串 id(并作为其 `net:id()` 发送给该客户端). |
| `onClientLeave(id)` | 客户端断开或掉线. |
| `onHostMessage(id, event, data)` | 客户端发送消息.`id` 是哪个客户端；`event` / `data` 是其负载.(主机也自动中继它给其他客户端.) |
| `onNetRejected(id, reason, what)` | 主机拒绝客户端的某些东西.`reason` 是 `"state"`(试图写某人已拥有的键——`what` 是键)或 `"rate"`(发送太快——`what` 是它发送的事件). |

### 共享状态

### net:setState(key, value)

参数：
- `key`(String)——状态键
- `value`(Table | String | Number | Bool)——要存储和复制的值 [可选]

返回：Bool

将值写入共享和复制的状态存储并同步给每个人.主机权威：主机的写入本地设置并立即广播；客户端的写入先到主机,并在一个往返后落回调用者,不是立即.在任何地方用 `net:getState` 读取并在 `onStateChange` 中反应.稍后加入的客户端自动获得完整当前状态.值可以是表,所以整个记分板可以是一个键.如果你既不托管也不连接则返回 `false`.

每个键由首先写入它的人拥有——之后不同客户端写入该键被拒绝(`onNetRejected(id, "state", key)` 触发代替),所以一个玩家不能通过重用键名覆盖另一个玩家的数据.对于每玩家值,优先使用 `net:setMine` 完全避免这个.

自 v0.4.1(2026-06-20).键所有权自 v0.5.9.

```lua
-- 主机拥有 standings：
net:setState('lap', { p1 = 2, p2 = 1 })

function onStateChange(key, value)
  if key == 'lap' then text:set('hud', 'Lap '..value.p1) end
end
```

### net:getState(key)

参数：
- `key`(String)——状态键

返回：Table | String | Number | Bool | nil

读取 `net:setState` 写入的复制状态存储中的值.在主机和每个客户端上工作相同——引擎保持每侧的副本同步——所以它是任何时刻共享游戏状态的快照.如果键从未设置则返回 `nil`.

自 v0.4.1(2026-06-20).

```lua
local laps = net:getState('lap')
if laps ~= nil then print('P1 lap', laps.p1) end
```

### net:setMine(key, value)
*自 v0.5.9*

参数：
- `key`(String)——状态键,不带任何 id 前缀——那部分是自动的
- `value`(Table | String | Number | Bool)——要存储和复制的值 [可选]

返回：Bool

存储属于你的值并发送给每个人,像你的位置.它是 `net:setState`,为你将你的玩家 id 添加到键,所以两个玩家永不互相覆盖.其他人用 `net:getOf` 或 `net:shared` 读取它.

```lua
function onUpdate(dt)
    if net:connected() then
        net:setMine('x', game:get('me.x'))
        net:setMine('y', game:get('me.y'))
    end
end
```

### net:getMine(key)
*自 v0.5.9*

参数：
- `key`(String)——你与 `net:setMine` 使用的键

返回：Any

读回你自己用 `net:setMine` 设置的值,在托管和加入时都是.

```lua
local lastX = net:getMine('x')
```

### net:getOf(id, key)
*自 v0.5.9*

参数：
- `id`(String)——连接客户端的 id(来自 onClientJoin / onHostMessage),或 'host'
- `key`(String)——状态键,不带任何 id 前缀

返回：Table | String | Number | Bool | nil

读取另一个玩家用 `net:setMine` 写入的值——读取你自己用 `net:getMine` 的对应物.如果该玩家尚未写入该键则返回 `nil`.

```lua
function onUpdate(dt)
    for _, id in ipairs(net:clients()) do
        local x, y = net:getOf(id, 'x'), net:getOf(id, 'y')
        if x ~= nil and y ~= nil then drawPeer(id, x, y) end
    end
end
```

### net:ownerOf(key)
*自 v0.5.9*

参数：
- `key`(String)——一个复制的状态键

返回：String

哪个客户端 id 拥有复制的状态键——按 `net:setState` 的所有权规则,首先写入它的人.如果还没有人写入该键则为空字符串.主要是调试工具,用于弄清为什么写入被拒绝.

```lua
print('score_p1 belongs to', net:ownerOf('score_p1'))
```

### 复制状态回调

每当复制值改变时 `onStateChange(key, value)` 触发——通过 `net:setState` 写入.它在主机和每个客户端上运行：主机上它设置时立即(或应用客户端的请求时),每个客户端上权威值到达时.客户端加入时,它为每个现有键触发一次,当完整状态快照落地时,所以晚加入者被赶上.用它从共享状态刷新 UI 而不是每帧轮询 `net:getState`.

自 v0.4.1(2026-06-20).

### 流量和日志

### net:traffic()
*自 v0.6.0*

返回：Table

最近流量的有上限日志(500 条),两个方向和主机和客户端——每个条目有 `dir`(`"in"`/`"out"`)和`time`和`peer`和`event` 和 `data`.它用于调试,不是游戏玩法——除了你自己的脚本(和 inspector:netLog,它实时显示它)没有东西读它.它在断开或 `stopHost` 后继续记录,所以断开前发生什么的事后分析仍然在那里；调用 `clearTraffic` 清除它.

```lua
for i, entry in ipairs(net:traffic()) do
    print(entry.dir, entry.peer, entry.event)
end
```

### net:clearTraffic()
*自 v0.6.0*

返回：Bool

清空 `net:traffic` 返回的日志.

```lua
net:clearTraffic()
```

### net:serverLog()
*自 v0.6.0*

返回：Table

主机生命周期事件作为纯字符串的有上限日志(300 条)——托管启动/停止和客户端加入或离开和消息被拒绝——每个条目是一个 `{time, message}` 表.这是人类可读摘要；`net:traffic()` 是逐条消息原始日志.仅主机侧.

```lua
for i, entry in ipairs(net:serverLog()) do
    print(entry.message)
end
```

### net:clearServerLog()
*自 v0.6.0*

返回：Bool

清空 `net:serverLog` 返回的日志.

```lua
net:clearServerLog()
```

### 示例

### 示例——如果没人在那里则托管,否则加入

条件检查的实际应用：探测一个固定 LAN 地址；如果那里已有主机,作为客户端加入它；如果没有,成为主机.无论哪种方式你最终连接到同一中继,所以游戏代码其余部分(广播 `move`和渲染对等方)在两条路径上相同.

### 示例——在线平台游戏对等同步

完整循环：连接,每帧广播你的玩家位置,从他们的 `move` 消息渲染其他每个玩家.每个对等方是按服务器 id 键控的标记矩形,所以对等方自动出现和移动和消失.这假设一个微型中继服务器重新广播每条消息给所有连接客户端并在加入时向每个发送 `_id`.

---

## Discord 函数

驱动 Discord Rich Presence——你个人资料上的卡片.逐字段构建存在感,显示带运行进度条的音乐播放器卡片,并在玩家离开时变为空闲.

### 概述

引擎启动时存在感自动开始,所以卡片无需任何脚本就显示.有两种驱动方式：

1. 普通卡片.用 `discord:text`和`discord:assets` 和朋友设置字段,然后用 `discord:update` 推送它们.在你调用 `update` 之前什么都不发送,所以构建卡片没有成本.

2. 音乐卡片.`discord:musicPlay` 切换到带封面和进度条的收听风格卡片,进度条在 Discord 端继续运行.PlayState 已为你做这个——它在歌曲开始时启动卡片,在你暂停或 alt-tab 时暂停它,在你离开时回到普通卡片.

### v0.5.7 改变了什么

| 区域 | 你得到什么 |
|---|---|
| 音乐卡片 | `musicPlay` / `musicPause` / `musicSeek` 和真实进度条,自动接线到 PlayState. |
| 逐字段构建 | `text`和`assets`和`details`和`state`和`largeImage`和`smallImage`和`activityType`——然后一个 `update()`. |
| 空闲感知 | `idleTimeout` / `idleWhenUnfocused` 在玩家停止触摸键盘后换入空闲卡片. |
| 按钮和派对和秘密 | `button`和`party`和`secrets` 加上 `onDiscordJoin` / `onDiscordSpectate` / `onDiscordJoinRequest` 回调. |
| 验证 | `validate()` 告诉你 Discord 会静默修剪或拒绝哪些字段. |
| 线程安全 | 回调排队并在游戏线程分发,所以对 `onDiscordReady` 做出反应的脚本可以安全触摸精灵. |

### 构建卡片

下面每个设置器写一个存在感对象,直到你更改它.在你运行 `discord:update` 之前没有东西到达 Discord,所以设置任意多字段并一次推送.

### discord:text(details, state)
*自 v0.5.7*

参数：
- `details`(String?)——第一行,显示在应用名称正下方
- `state`(String?)——第二行,显示在 details 下方

返回：Bool

一次调用设置两个文本行——当一行还需要可点击链接时使用 `details` / `state` 代替.

```lua
discord:text('In the Menus', 'Picking a song')
discord:update()
```

### discord:details(text, url)
*自 v0.5.7*

参数：
- `text`(String)——卡片第一行
- `url`(String?)——使该行成为链接.必须是 http/https

返回：Bool

单独设置第一行,可选地使其成为可点击链接.

```lua
discord:details('Your Song', 'https://example.com/charts/your-song')
```

### discord:state(text, url)
*自 v0.5.7*

参数：
- `text`(String)——卡片第二行
- `url`(String?)——使该行成为链接.必须是 http/https

返回：Bool

单独设置第二行,可选地使其成为可点击链接.

```lua
discord:state('Hard — 98% FC')
```

### discord:assets(largeKey, largeText, smallKey, smallText)
*自 v0.5.7*

参数：
- `largeKey`(String?)——大图像的艺术资产名称
- `largeText`(String?)——悬停大图像时显示的工具提示
- `smallKey`(String?)——小角标艺术资产名称
- `smallText`(String?)——悬停角标时显示的工具提示

返回：Bool

一次调用填充两个图像和两个工具提示.任何你不想要的东西传递 `nil`——缺失的小键只是隐藏角标.

```lua
discord:assets('icon', 'Freak Engine', 'diff_hard', 'Hard')
discord:update()
```

### discord:largeImage(key, text, url)
*自 v0.5.7*

参数：
- `key`(String)——艺术资产名称,或来自 `assetKey` 的键
- `text`(String?)——悬停工具提示
- `url`(String?)——点击图像时打开

返回：Bool

设置大图像和其工具提示和其点击目标.

```lua
discord:largeImage('cover_your_song', 'Your Song', 'https://example.com')
```

### discord:smallImage(key, text, url)
*自 v0.5.7*

参数：
- `key`(String)——角标的艺术资产名称
- `text`(String?)——悬停工具提示
- `url`(String?)——点击角标时打开

返回：Bool

设置与大图像右下角重叠的小角标.便于难度图标或播放/暂停状态.

```lua
discord:smallImage('diff_hard', 'Hard')
```

### discord:activityType(kind)
*自 v0.5.7*

参数：
- `kind`(String)——`'playing'`(默认)和`'listening'`和`'watching'` 或 `'competing'`

返回：Bool

更改 Discord 在你应用名称前放的动词——Playing和Listening to和Watching 或 Competing in.未知值回退到 `'playing'`.

```lua
discord:activityType('competing')
discord:text('Weekly Tournament', 'Round 3')
discord:update()
```

### discord:statusDisplay(field)
*自 v0.5.7*

参数：
- `field`(String)——`'name'`(默认)和`'state'` 或 `'details'`

返回：Bool

选择在成员列表中玩家名字下的一行状态显示哪一行.默认是你的应用名称；指向 `'details'` 显示歌曲代替.

```lua
discord:statusDisplay('details')
```

### 计时器和进度条

Discord 从存在感时间戳绘制计时器.一个时间戳作为文本计数向上或向下；两个绘制填充进度条.时钟在 Discord 端运行,所以你设置一次而不是每帧.

### discord:elapsed(seconds)
*自 v0.5.7*

参数：
- `seconds`(Float?)——它已经运行了多久 [默认 0]

返回：Bool

显示计数向上的 `"03:41 elapsed"` 计时器.传递值以回溯开始——当你在事情实际开始后一段时间才设置存在感时有用.

```lua
-- "00:00 elapsed",从现在开始计数向上
discord:elapsed()

-- 好像 90 秒前开始
discord:elapsed(90)
```

### discord:remaining(seconds)
*自 v0.5.7*

参数：
- `seconds`(Float)——还剩多少秒

返回：Bool

显示计数向下的 `"01:12 left"` 计时器.

```lua
discord:remaining(120)
```

### discord:progress(elapsed, total)
*自 v0.5.7*

参数：
- `elapsed`(Float)——已经过去的秒数
- `total`(Float)——总长度(秒).`0` 使它开放式

返回：Bool

一次设置两个时间戳,这是使 Discord 绘制填充进度条而不是普通计时器的东西.这是音乐卡片底层使用的.

```lua
-- 3 分钟歌曲中的 30 秒
discord:progress(30, 180)
discord:update()
```

### discord:clearTimestamps()
*自 v0.5.7*

返回：Bool

移除两个时间戳,所以卡片完全不显示计时器和条.

```lua
discord:clearTimestamps()
discord:update()
```

### 按钮和派对和邀请

按钮在卡片上放最多两个链接.派对显示 `(2 of 4)` 计数器,秘密将那个派对变成其他玩家实际可以加入的东西——他们的答案通过回调到达.

### discord:button(label, url)
*自 v0.5.7*

参数：
- `label`(String)——按钮文本,最多 32 字节
- `url`(String)——它指向哪里.必须是 http/https

返回：Bool

向卡片添加按钮.Discord 最多显示两个,如果设置了任何秘密则完全忽略按钮——卡片要么可加入要么有按钮,从不同时.按钮堆叠,所以在重建前调用 `clearButtons`.

```lua
discord:clearButtons()
discord:button('Get the mod', 'https://gamebanana.com/mods/000000')
discord:button('Discord server', 'https://discord.gg/example')
discord:update()
```

### discord:clearButtons()
*自 v0.5.7*

返回：Bool

移除每个按钮.在重新添加前调用它,否则重复 `button` 调用继续增长列表,只有前两个显示.

```lua
discord:clearButtons()
```

### discord:party(id, size, max, isPublic)
*自 v0.5.7*

参数：
- `id`(String)——标识此大厅的任何稳定字符串
- `size`(Int)——现在其中有多少成员
- `max`(Int)——它容纳多少
- `isPublic`(Bool?)——`true` 让任何人请求加入 [默认 false]

返回：Bool

在卡片上显示 `(2 of 4)` 计数器.与 `secrets` 配对使 Join 按钮实际出现.

```lua
discord:party('lobby_' .. roomCode, 2, 4, true)
discord:secrets(nil, 'join_' .. roomCode)
discord:update()
```

### discord:clearParty()
*自 v0.5.7*

返回：Bool

丢弃派对信息,移除成员计数器.

```lua
discord:clearParty()
discord:update()
```

### discord:secrets(match, join, spectate)
*自 v0.5.7*

参数：
- `match`(String?)——标识比赛的不透明令牌
- `join`(String?)——当某人接受邀请时交回给 `onDiscordJoin`
- `spectate`(String?)——交回给 `onDiscordSpectate`

返回：Bool

将卡片变成可邀请的.字符串对 Discord 不透明——你放进去的任何东西直接回到另一台机器上的回调,所以把房间代码或服务器地址放进去.

地址放在第二个参数 `join`.引擎向 Discord 注册游戏,所以接受邀请会在游戏关闭时启动游戏 v0.7.7.

```lua
discord:secrets(nil, 'room:' .. roomCode, 'spec:' .. roomCode)

function onDiscordJoin(secret)
    net:connect(string.sub(secret, 6))
end
```

### 发送和检查

上面的任何东西都不自行触及 Discord.这四个函数是实际移动卡片的.

### discord:update(force)
*自 v0.5.7*

参数：
- `force`(Bool?)——即使什么都没变也发送 [默认 false]

返回：Bool

推送你构建的任何东西.相同存在感被跳过,Discord 的速率限制为你处理,所以每帧调用安全.如果显示的是音乐卡片,这会离开音乐模式——当你想刷新音乐卡片时使用 `musicSync` 代替.

```lua
discord:text('In the Menus', 'Freeplay')
discord:assets('icon', 'Freak Engine')
discord:update()
```

### discord:reset()
*自 v0.5.7*

返回：Bool

将每个字段擦回默认而不发送任何东西,并离开音乐模式.用这个开始新卡片,所以残留——过期按钮和旧派对和计时器——无法存活到下一屏幕.

```lua
function menuPresence()
    discord:reset()
    discord:text('In the Menus')
    discord:assets('icon', 'Freak Engine')
    discord:update()
end
```

### discord:clear()
*自 v0.5.7*

返回：Bool

完全从玩家个人资料移除卡片,保持连接打开.与 `reset` 不同,这立即生效.

```lua
discord:clear()
```

### discord:validate()
*自 v0.5.7*

返回：String

报告 Discord 会修剪或拒绝当前卡片中的什么,作为人类可读字符串(一切正常时为空).值得知道：一个过长字段使 Discord 静默丢弃整个存在感,这是卡片神秘不出现的通常原因.文本行上限 128 字节且至少需要 2 个字符；按钮标签上限 32.

```lua
discord:text(reallyLongSongName, difficulty)

local problems = discord:validate()
if problems ~= '' then print('presence:', problems) end

discord:update()
```

### discord:changePresence(details, state, largeImageKey, smallImageKey, showElapsed, durationSeconds)
*自 v0.5.4*

参数：
- `details`(String?)——第一行 [默认 'In the Menus']
- `state`(String?)——第二行
- `largeImageKey`(String?)——大图像的艺术资产名称 [默认 'icon']
- `smallImageKey`(String?)——角标的艺术资产名称 v0.5.7
- `showElapsed`(Bool?)——启动计时器 v0.5.7 [默认 false]
- `durationSeconds`(Float?)——与 `showElapsed` 一起,从此倒数而不是向上 v0.5.7 [默认 0]

返回：Bool

一键快捷方式：设置常见字段,离开音乐模式并立即发送.第三个参数之后的一切都是后来添加的,所以原始三参数形式行为与以前完全一样.大图像工具提示自动填充引擎版本.

```lua
-- 在菜单上
discord:changePresence('In the Menus')

-- 歌曲开始时,带倒计时
discord:changePresence('Your Song', 'Hard', 'song_your_song', nil, true, 148)
```

### 音乐播放器存在感

一种不同形状的卡片：标题和艺术家和专辑封面和进度条,在 Discord 端继续移动而无需你发送任何东西.PlayState 自动驱动这个——它在歌曲开始时用歌曲名称和长度调用 `musicPlay`,歌曲暂停时(包括 alt-tab)调用 `musicPause` / `musicResume`,你离开时调用 `musicStop`.这里的函数用于装饰它或在歌曲外自己驱动它.

### discord:musicPlay(title, artist, duration, album)
*自 v0.5.7*

参数：
- `title`(String)——曲目标题,显示在第一行
- `artist`(String?)——显示在第二行
- `duration`(Float?)——长度(秒).`0` 表示未知,隐藏条 [默认 0]
- `album`(String?)——作为 `Artist • Album` 附加到艺术家

返回：Bool

切换到音乐卡片并从零开始播放.从这里进度条自行运行——你只报告暂停和跳转和轨道变化.

```lua
discord:musicArtwork('cover_your_song')
discord:musicPlay('Your Song', 'Kawai Sprite', 148, 'Friday Night Funkin')
```

### discord:musicPause()
*自 v0.5.7*

返回：Bool

冻结进度条并换入暂停图标.没有活动音乐卡片时什么都不做.

```lua
discord:musicPause()
```

### discord:musicResume()
*自 v0.5.7*

返回：Bool

从暂停位置再次开始条移动——暂停期间花的时间不计算.

```lua
discord:musicResume()
```

### discord:musicSeek(seconds)
*自 v0.5.7*

参数：
- `seconds`(Float)——新播放位置,秒

返回：Bool

跳转进度条而不改变其他任何东西.在擦洗后使用,或在倒计时后将卡片与歌曲对齐.

```lua
discord:musicSeek(song:time() / 1000)
```

### discord:musicStop()
*自 v0.5.7*

返回：Bool

结束音乐卡片并将个人资料交回普通存在感——你上次用 `update` 构建的任何东西重新出现.你离开歌曲时 PlayState 调用这个.

```lua
discord:musicStop()
```

### discord:musicSync()
*自 v0.5.7*

返回：Bool

重建并重新发送音乐卡片.在已播放卡片上更改封面和图标或源名称后调用它——那些设置器只暂存值.

```lua
function onSongStart(song)
    discord:musicArtwork('cover_' .. string.lower(song))
    discord:musicSync()
end
```

### discord:musicMeta(title, artist, album)
*自 v0.5.7*

参数：
- `title`(String?)——曲目标题
- `artist`(String?)——艺术家名称
- `album`(String?)——专辑名称

返回：Bool

仅更新音乐卡片的文本——标题 / 艺术家 / 专辑——而不触及 `musicPlay` 设置的播放状态或进度时间戳.像其他设置器一样暂存——如果卡片已显示则跟随 `musicSync`.

```lua
discord:musicMeta('Your Song', 'Kawai Sprite', 'Friday Night Funkin\'')
discord:musicSync()
```

### discord:musicArtwork(key, url)
*自 v0.5.7*

参数：
- `key`(String?)——艺术资产名称,或来自 `assetKey` 的键
- `url`(String?)——点击封面时打开

返回：Bool

设置专辑封面.仅暂存——如果卡片已显示则跟随 `musicSync`.

```lua
discord:musicArtwork('cover_your_song')

-- 或从 Spotify 借用真实专辑封面
discord:musicArtwork(discord:assetKey('spotify', 'ab67616d0000b273...'))
```

### discord:musicIcons(playingKey, pausedKey)
*自 v0.5.7*

参数：
- `playingKey`(String?)——播放时显示的角标
- `pausedKey`(String?)——暂停时显示的角标

返回：Bool

封面角落的小角标,卡片暂停和恢复时自动交换.上传两个小艺术资产.

```lua
discord:musicIcons('playing', 'paused')
```

### discord:musicSource(source)
*自 v0.5.7*

参数：
- `source`(String?)——播放器名称,悬停角标时显示

返回：Bool

播放/暂停角标上的悬停文本——通常是你游戏或模组的名称.

```lua
discord:musicSource('Freak Engine')
```

### discord:musicUrls(trackUrl, artistUrl)
*自 v0.5.7*

参数：
- `trackUrl`(String?)——曲目标题上的链接
- `artistUrl`(String?)——艺术家行上的链接

返回：Bool

使标题和艺术家行可点击——将它们指向谱面页面和原曲或艺术家页面.

```lua
discord:musicUrls('https://youtu.be/xxxxxxxx', 'https://example.com/artist')
```

### discord:musicActive()
*自 v0.5.7*

返回：Bool

音乐卡片当前是否是显示的那个.`false` 表示普通存在感拥有个人资料.

```lua
if not discord:musicActive() then menuPresence() end
```

### discord:musicPaused()
*自 v0.5.7*

返回：Bool

音乐卡片的进度条当前是否冻结.

```lua
print(discord:musicPaused())
```

### discord:musicPosition()
*自 v0.5.7*

返回：Float

卡片的播放位置(秒),播放时按真实时间推进,暂停时冻结.这是 Discord 显示的,不一定是歌曲自己的时钟——如果你怀疑漂移,比较两者.

```lua
local drift = math.abs(discord:musicPosition() - song:time() / 1000)
if drift > 2 then discord:musicSeek(song:time() / 1000) end
```

### 变为空闲

一个卡片在没人坐在机器前时继续计数八小时看起来很傻.一旦玩家停止触摸任何东西,客户端可以换入更安静的卡片——空闲时间系统范围读取,所以切到浏览器不算离开,只有实际离开才算.

### discord:idleTimeout(seconds)
*自 v0.5.7*

参数：
- `seconds`(Float)——键盘或鼠标输入多少秒后变为空闲.`0` 禁用它

返回：Bool

设置离开计时器.默认关闭.检测在 Windows 和 macOS 上是原生的；其他地方回退到引擎报告的窗口焦点.

```lua
discord:idleTimeout(300)  -- 五分钟
```

### discord:idleWhenUnfocused(on)
*自 v0.5.7*

参数：
- `on`(Bool?)——失去窗口焦点是否单独算空闲 [默认 true]

返回：Bool

比 `idleTimeout` 更严格的规则：游戏不再是焦点窗口的瞬间变为空闲,无宽限期.默认关闭,通常太激进——大多数模组想要计时器代替.

```lua
discord:idleWhenUnfocused(true)
```

### discord:idlePresence(details, state, largeImageKey)
*自 v0.5.7*

参数：
- `details`(String?)——空闲卡片的第一行
- `state`(String?)——第二行
- `largeImageKey`(String?)——艺术资产名称 [默认 'icon']

返回：Bool

空闲时显示的卡片.无参数调用它完全移除空闲卡片,所以空闲时隐藏存在感而不是替换它.

```lua
discord:idlePresence('Away from keyboard', 'Freak Engine', 'icon')

-- 或离开时完全隐藏存在感
discord:idlePresence()
```

### discord:idle()
*自 v0.5.7*

返回：Bool

客户端当前是否认为玩家离开.

```lua
if discord:idle() then song:pause() end
```

### 连接和账户

引擎在启动时打开连接并在窗口关闭时关闭它,所以大多数模组只触及 `clientId`.

### discord:clientId(id)
*自 v0.5.4*

参数：
- `id`(String)——你来自 Developer Portal 的 Discord 应用(客户端)ID

返回：Bool

将 Rich Presence 指向你自己的 Discord 应用,所以卡片显示你的应用名称和你上传的艺术资产.已连接时自行在新 id 上重新连接,传递已在使用中的 id 是无操作——从每个状态运行的函数调用安全.空 id 失败.

```lua
discord:clientId('123456789012345678')
discord:changePresence('Booting up')
```

### discord:resetClientId()
*自 v0.5.7*

返回：Bool

将应用 ID 放回引擎自己的.之后重新连接以生效.

```lua
discord:resetClientId()
discord:reconnect()
```

### discord:initialize()
*自 v0.5.4*

返回：Bool

如果连接尚未运行则启动它.引擎在启动时调用这个,所以你主要需要它在 `shutdown` 后,或更改客户端 ID 后带回存在感.

```lua
discord:initialize()
```

### discord:shutdown()
*自 v0.5.4*

返回：Bool

关闭连接并清除卡片.窗口关闭时自动调用；仅在你想要在会话中途隐藏存在感时手动调用.

```lua
discord:shutdown()
```

### discord:reconnect()
*自 v0.5.7*

返回：Bool

丢弃连接并再次打开它,之后放回当前卡片.切换客户端 ID 后有用.你很少仅仅因为 Discord 关闭就需要它——库自行重新连接.

```lua
discord:clientId(myAppId)
discord:reconnect()
```

### discord:connected()
*自 v0.5.7*

返回：Bool

与 Discord 应用的握手是否实际完成.这是真实连接状态,不只是"我们试过"——Discord 桌面应用未运行时它保持 `false`.

```lua
if discord:connected() then discord:update() end
```

### discord:supported()
*自 v0.7.1*

返回：Bool

此构建是否有 Discord.在 Android 和其他移动构建(以及 Linux 调试构建)上为 `false`,那里 Discord 不编译进去.每个其他 `discord:` 函数在那里仍然存在且调用安全：它只是什么都不做,`discord:connected()` 保持 `false`,用户字段保持 `nil`.你不需要保护你的调用；仅当你想要隐藏 Discord 相关 UI 时使用这个.

```lua
if discord:supported() then
    showDiscordButton()
end
```

### discord:check()
*自 v0.5.4*

返回：Bool

短暂打开然后关闭连接——轻量探测确认 Discord 可达而不留下存在感运行.当存在感已连接时什么都不做,所以它永远不会取下活动卡片.引擎不再在启动时调用这个,所以几乎每个脚本都想要 `initialize` 代替.

```lua
discord:check()
```

### discord:rateLimit(seconds)
*自 v0.5.7*

参数：
- `seconds`(Float)——两次存在感更新之间的最小间隙 [默认 4]

返回：Bool

更新被节流多激进.默认匹配 Discord 接受的；降低它冒更新被 Discord 自己丢弃的风险,而不是被引擎礼貌排队.

```lua
discord:rateLimit(6)
```

### discord:username()
*自 v0.5.7*

返回：String

连接账户的用户名,断开时为 `nil`.从 `onDiscordReady` 起可用.

```lua
function onDiscordReady(name)
    text:set('hello', 'Hey, ' .. discord:username())
end
```

### discord:globalName()
*自 v0.5.7*

返回：String

账户的显示名称,没有设置时回退到用户名.这是显示给玩家的那个.

```lua
print(discord:globalName())
```

### discord:userId()
*自 v0.5.7*

返回：String

账户的数字 ID 作为字符串,断开时为 `nil`.

```lua
local id = discord:userId()
```

### discord:discriminator()
*自 v0.5.7*

返回：Int

旧的 `#1234` 标签.在迁移到现代用户名系统的账户上返回 `0`,现在几乎都是.

```lua
print(discord:discriminator())
```

### discord:avatarUrl(id, hash, size)
*自 v0.5.7*

参数：
- `id`(String?)——用户 ID.默认为连接账户
- `hash`(String?)——头像哈希.默认为连接账户的
- `size`(Int?)——请求大小,16 到 4096 的 2 的幂 [默认 128]

返回：String

构建用户头像的 CDN URL,没有时回退到他们的默认头像.动画头像自动作为 `.gif` 返回.与 `file:download` 配对实际显示它.

```lua
local url = discord:avatarUrl(nil, nil, 256)
print(url)
```

### discord:assetKey(kind, id)
*自 v0.5.7*

参数：
- `kind`(String)——`'spotify'`和`'youtube'`和`'twitch'` 或 `'media'`
- `id`(String)——该服务上的 ID

返回：String

构建指向 Discord 自己服务托管的艺术的图像键,所以你可以显示封面或缩略图而不上传为艺术资产.将结果喂给 `largeImage` 或 `musicArtwork`.未知类型直接传递 id.

```lua
discord:musicArtwork(discord:assetKey('youtube', 'dQw4w9WgXcQ'))
discord:musicSync()
```

### 回调

广播到每个已加载脚本.`onDiscordJoin`和`onDiscordSpectate` 和 `onDiscordJoinRequest` 也到达未打开游戏模式的脚本,所以朋友可以从任何屏幕加入 v0.7.7.它们排队并在游戏线程传递,所以在它们内部触摸精灵和文本和状态安全——在 v0.5.7 之前它们在 RPC 自己的轮询线程触发.

| 回调 | 何时触发 |
|---|---|
| `onDiscordReady(username)` | 握手完成.账户获取器从这里有效. |
| `onDiscordDisconnected(code, message)` | 连接断开——通常玩家退出 Discord 应用. |
| `onDiscordIdle(idle)` | 玩家离开,以及他们回来时用 `false`.v0.5.7 |
| `onDiscordJoin(secret)` | 玩家接受邀请.`secret` 是你在 `secrets` 中放的任何东西. |
| `onDiscordSpectate(secret)` | 玩家接受观战邀请. |
| `onDiscordJoinRequest(id, username)` | 某人请求加入派对.用 `discord:respond` 回答. |

### discord:respond(userId, reply)
*自 v0.5.7*

参数：
- `userId`(String)——交给 `onDiscordJoinRequest` 的 id
- `reply`(String)——`'yes'` / `'accept'`和`'no'` 或 `'ignore'`

返回：Bool

回答加入请求.不是 `'yes'`和`'accept'` 或 `'ignore'` 的任何东西都算拒绝.不回答请求使它在另一端超时,所以总是回复.

```lua
function onDiscordJoinRequest(id, username)
    if partySize < 4 then
        discord:respond(id, 'yes')
    else
        discord:respond(id, 'no')
    end
end
```

### 在线游戏的加入按钮

合作模式需要的所有东西,以便朋友从 Discord 加入：
- 托管时主机在卡片上放派对及其地址.
- 当某人按 Ask to Join 时,主机用 `discord:respond` 回答；没有回答则什么都不发生.
- 接受的朋友在 `onDiscordJoin` 中获得地址并连接.如果他们在另一个屏幕上,先打开模式并在准备好后连接.
两个玩家必须使用相同的 `discord:clientId`,否则 Discord 将邀请发送到不同的应用.

### 完整示例

一个菜单卡片和一个空闲卡片和每首歌装饰的音乐卡片.作为 `scripts/examples/discord.lua` 发布.

---

## 检查器函数

`inspector` 命名空间打开一个实时和游戏内对象检查器——在屏幕上选择任何标记的东西并观察(或编辑)其真实属性就地更新,像浏览器的开发者工具检查 DOM 元素.它在发布构建中也运行,所以安全地在开发/作弊开关后面发布,而不是仅调试构建.

### 工作原理

`inspector:show()` 打开面板；`inspector:hide()` 和 `inspector:toggle()` 做它们说的.第一次调用之前不构建任何东西,所以让它接线到调试键在从未按下时没有成本.

有两种方式指向某物：

- `inspector:pick()` 武装点击选择——下一次鼠标点击检查光标下的任何东西.

- `inspector:target(tag)` 直接跳到你已知的标签,无需点击.

一旦目标选定,面板列出其实时字段：数字和颜色和点和数组都展开并每刷新滴答更新.拖动标题栏移动它,右下角调整大小,滚轮滚动长字段列表——全鼠标驱动,无额外 API 需要.

### 检查器面板

### inspector:show()
*自 v0.5.9*

返回：Bool

打开检查器面板.它记住上次检查了什么.

```lua
inspector:show()
```

### inspector:hide()
*自 v0.5.9*

返回：Bool

关闭面板而不忘记它正在看什么,所以 `inspector:show` 从它离开的地方继续.

```lua
inspector:hide()
```

### inspector:toggle()
*自 v0.5.9*

返回：Bool

如果面板关闭则打开,如果打开则关闭.

```lua
if input:keyJustPressed('F2') then inspector:toggle() end
```

### inspector:visible()
*自 v0.5.9*

返回：Bool

面板打开期间为 `true`.便于调试菜单中的复选框.

```lua
text:set('inspectorState', inspector:visible() and 'Inspector: on' or 'Inspector: off')
```

### inspector:pick(on)
*自 v0.5.9*

参数：
- `on`(Bool?)——武装(`true`,默认)或解除点击选择 [默认 true]

返回：Bool

打开面板并等待点击：下一次鼠标点击检查光标下的任何东西.一旦选中某些东西它就自行关闭.

```lua
if input:keyJustPressed('F3') then inspector:pick() end
```

### inspector:picking()
*自 v0.5.9*

返回：Bool

检查器仍在等待点击期间为 `true`.

```lua
text:set('hint', inspector:picking() and 'Click an object...' or '')
```

### inspector:target(tag)
*自 v0.5.9*

参数：
- `tag`(String)——已创建的精灵和组和相机等的标签.

返回：Bool

将面板直接指向已知标签并打开它,完全跳过 `inspector:pick()` 的点击步骤.如果标签不存在则失败.

```lua
inspector:target('player')
```

### inspector:state()
*自 v0.5.9*

返回：Bool

检查当前 Flixel 状态本身而不是标记对象——对于不住在任何单个精灵上的状态级字段有用.

```lua
inspector:state()
```

### inspector:clear()
*自 v0.5.9*

返回：Bool

清空面板而不关闭它——回到没有目标.与 `inspector:hide()` 不同,后者保留最后目标,所以面板重新打开时它仍然在那里.

```lua
inspector:clear()
```

### inspector:highlight(on)
*自 v0.5.9*

参数：
- `on`(Bool?)——在检查对象周围绘制轮廓,默认 `true` [默认 true]

返回：Bool

在屏幕上围绕正在检查的对象绘制轮廓,所以你可以从许多相似精灵中找到它.

```lua
inspector:highlight(true)
```

### inspector:highlighting()
*自 v0.5.9*

返回：Bool

高亮轮廓开启期间为 `true`.

```lua
inspector:highlight(not inspector:highlighting())
```

### inspector:size(width, height)
*自 v0.5.9*

参数：
- `width`(Number)——面板宽度(像素,钳制到合理最小值)
- `height`(Number)——面板高度(像素,钳制到合理最小值)

返回：Bool

调整面板大小并在新大小重建其字段列表.仅当默认大小不适合时重要——宽字段列表,或屏幕上留出的小角落.

```lua
inspector:size(420, 600)
```

### inspector:refresh(seconds)
*自 v0.5.9*

参数：
- `seconds`(Number)——值重新读取之间的最小时间.默认 `0.1`

返回：Bool

面板多久重新读取目标对象的字段.降低它以观察快速变化的东西；如果面板本身在非常大的对象上花费明显帧时间则提高它.

```lua
inspector:refresh(0.03)   -- 接近实时
inspector:refresh(0.5)    -- 更便宜,更卡
```

### 数据查看器

与对象检查器一起的第二个面板,用于查看原始 JSON 或自行更新的数据——谱面文件和存档数据或像网络流量的实时源.它在第一次调用时打开并保持直到 `jsonClose`,独立于对象检查器面板.

### inspector:json(path)

参数：
- `path`(String)——`.json` 文件的资产路径

返回：Bool

用 JSON 文件打开查看器,格式化并带可折叠部分.

```lua
inspector:json('data/config.json')
```

### inspector:jsonClose()

返回：Bool

关闭用 `inspector:json` 打开的 JSON 查看器.

```lua
inspector:jsonClose()
```

### inspector:netLog(intervalSeconds)
*自 v0.6.0*

参数：
- `intervalSeconds`(Number?)——视图重新读取流量日志的频率 [默认 0.5]

返回：Bool

在 `net:traffic()` 上而不是文件上打开同一查看器——每条发送或接收的消息,两个方向,主机和客户端,实时刷新.无需为每个 `net:send`/`net:on` 手工编写调试打印.

```lua
inspector:netLog()          -- 每秒刷新两次
inspector:netLog(0.1)       -- 接近实时
```

### inspector:serverLog(intervalSeconds)
*自 v0.6.0*

参数：
- `intervalSeconds`(Number?)——视图重新读取服务器日志的频率 [默认 0.5]

返回：Bool

改为在主机生命周期日志上打开查看器——托管启动/停止和客户端加入或离开和消息被拒绝(速率限制和键所有权).这是人类可读事件日志；`netLog` 是原始消息流量.

```lua
inspector:serverLog()
```

### inspector:eventLog(intervalSeconds)
*自 v0.6.0*

参数：
- `intervalSeconds`(Number?)——视图重新读取事件历史的频率 [默认 0.5]

返回：Bool

打开 Event History 窗口：引擎发送出的每个游戏玩法事件(`onEvent`和谱面事件和`events:trigger`),最新在后,按给定间隔刷新.像 `inspector:netLog`,但用于脚本事件.

```lua
inspector:eventLog()
inspector:eventLog(0.1)     -- 接近实时
```

### inspector:eventLogClear()
*自 v0.6.0*

返回：Bool

清空 `inspector:eventLog` 显示的事件历史.

```lua
inspector:eventLogClear()
```

### inspector:eventLogClose()
*自 v0.6.0*

返回：Bool

关闭 Event History 窗口.

```lua
inspector:eventLogClose()
```

---

## 调试叠加层

一次切换显示所有东西

### 工作原理

`debug:overlay(true)` 一次打开单个屏幕面板加上每个现有调试视觉,而不是手工切换每个.它描边每个当前标记的精灵/文本/背景和滚动条和组(已经使用自己 `hitboxDebug` 颜色的除外),描边每个 `text:marquee` 窗口,并显示一个小实时统计面板(FPS和相机数和活动跑马灯和注册键位和网络状态和绑定存档名称和Discord 连接).组和滚动条是"已经设置"检查的唯一例外——扫描总是重新着色那些,因为两者都不像单个精灵那样跟踪每成员颜色.`debug:overlay(false)` 还原所有,除了你自己用 `group:hitboxDebug`/`scrollbar:hitboxDebug` 设置的命中框颜色,覆盖层两种情况都不触及.

命中框/滚动调试切换以前住在自己的命名空间(`sprite:hitboxDebug`和`group:hitboxDebug`和`backdrop:hitboxDebug`和`scrollbar:hitboxDebug`和`text:scrollDebug`)——自 v0.6.1 起它们都住在这里,在 `debug:hitbox`/`debug:hitboxOff` 和 `debug:scroll` 下.旧调用消失了,不是别名；更新任何仍在使用它们的脚本.

### debug:overlay(enabled)
*自 v0.6.1*

参数：
- `enabled`(Bool?)——显示(true)或隐藏(false)覆盖层 [默认 true]

返回：Bool

打开或关闭上述整个调试覆盖层.每帧用相同值调用它没问题,它只在值变化时行动.

```lua
debug:overlay(true)
-- ...
debug:overlay(false)
```

### debug:overlayVisible()
*自 v0.6.1*

返回：Bool

调试覆盖层开启期间为 `true`.

```lua
if input:keyJustPressed('F3') then
    debug:overlay(not debug:overlayVisible())
end
```

### debug:renderStats()
*自 v0.7.5*

返回：Table

GPU 在上一帧做了什么：`drawCalls`和`shaderSwitches`和`textureBinds` 和 `textureBindsCached`(因纹理已绑定而跳过的绑定)和`targetSwitches`和`viewportChanges` 和 `viewportChangesCached`和`bufferUploads`和`bufferUploadBytes` 和 `frames`.更少的绘制调用和纹理绑定意味着更轻的帧.数字每帧刷新一次.

```lua
function onUpdate(dt)
    local s = debug:renderStats()
    if s.drawCalls > 300 then print('heavy frame: '..s.drawCalls..' draw calls') end
end
```

### debug:renderStatsText()
*自 v0.7.5*

返回：String

与 `debug:renderStats` 相同的数字,已经写成文本行,准备好放上屏幕.

```lua
function onCreate()
    text:add('gpu', '', 10, 120)
end

function onUpdate(dt)
    text:set('gpu', debug:renderStatsText())
end
```

### debug:net(enabled)
*自 v0.7.6*

参数：
- `enabled`(Bool)——显示或隐藏面板 [默认 true]

返回：Bool

右上角一个连接面板：角色和房间和地址和经过哪个网络和游戏用 TCP 和房间搜索用 UDP和上传和下载,以及每个玩家的地址和网络和 ping.离线时列出 `net:rooms()` 找到的房间.

```lua
debug:net(true)
```

### debug:hitbox(tag, color, thickness)
*自 v0.6.1*

参数：
- `tag`(String)——任何标签——精灵和文本和背景和组或滚动条
- `color`(String?)——轮廓颜色 [默认 00FF00]
- `thickness`(Float?)——轮廓厚度(px,仅精灵/文本/背景)[默认 2]

返回：Bool

围绕标签的任何东西绘制轮廓：精灵和文本和背景和组或滚动条.你不需要记住哪个命名空间有自己的命中框函数,这个自行算出类型.

```lua
debug:hitbox('player', 'FF0000', 2)
debug:hitbox('healthBarGroup', 'FFFF00')
debug:hitbox('volumeSlider')   -- 默认绿色
```

### debug:hitboxOff(tag)
*自 v0.6.1*

参数：
- `tag`(String)——你传递给 `debug:hitbox` 的相同标签

返回：Bool

移除用 `debug:hitbox` 添加的轮廓.

```lua
debug:hitboxOff('player')
```

### debug:clipBoxes(enabled)
*自 v0.7.5*

参数：
- `enabled`(Bool?)——显示或隐藏轮廓 [默认 true]

返回：Bool

在屏幕上每个裁剪区域上绘制轮廓,在所有东西之上：青色用于 `sprite:clipRound` / `sprite:clipTo`(带其圆角),橙色用于 `sprite:clipRect`.仅调试——轮廓每帧在 CPU 上重绘.

```lua
debug:clipBoxes()        -- 显示
debug:clipBoxes(false)   -- 隐藏
```

### debug:scroll(enabled)
*自 v0.6.1*

参数：
- `enabled`(Bool?)——显示(true)或隐藏(false)每个 `text:marquee` 的窗口轮廓 [默认 true]

返回：Bool

描边每个 `text:marquee` 窗口：文本太长并滚动时红色,适合时酸橙绿.`debug:overlay` 显示的相同轮廓,但没有覆盖层的其余部分.与 `text:marqueeDebug` 相同.

```lua
debug:scroll(true)
```

### debug:scrollVisible()
*自 v0.6.1*

返回：Bool

`debug:scroll` 的跑马灯轮廓开启期间为 `true`.

```lua
debug:scroll(not debug:scrollVisible())
```

---

## 触控函数

`touch` 命名空间添加移动支持：原始多点触控查询和屏幕虚拟按钮.触控真正多点——每个查询扫描所有活动触摸,所以两个按钮可以同时被两个手指按住.在桌面构建上鼠标代替按钮上的单指,所以触控 UI 无需手机即可测试.

### 读取触控的两种方式

1. 虚拟按钮——简单路径.`touch:button('jump', x, y, w, h, color)` 放置半透明屏幕按钮；用 `touch:held('jump')` / `touch:hit('jump')` / `touch:lift('jump')` 读取它.按钮跟踪自己的手指(多点正确)并在按下时变暗/变亮.非常适合 D-pad 或动作按钮.

| 步骤 | 调用 |
|---|---|
| 创建按钮 | `touch:button('jump', 1100, 560, 140, 140, 'FFCC33')` |
| 它按住吗？ | `if touch:held('jump') then ... end` |
| 本帧刚轻按？ | `if touch:hit('jump') then jump() end` |

2. 原始触摸——完全控制.`touch:count()`和每个手指的 `touch:x(i)` / `touch:y(i)`,加上区域助手(`touch:inArea`和`touch:pressedInArea`)和用于命中测试世界精灵的 `touch:overSprite`.用于轻扫和拖动或自定义手势.

按钮是屏幕固定(scrollFactor 0)并在状态变化时自动清理.

### 读取触摸

### touch:supported()

返回：Bool

触摸屏构建上为 `true`,桌面上的鼠标代替手指期间也为 `true`(默认,见 `touch:emulate`).要了解是否显示手机布局,使用 `touch:mobile()`.

```lua
if touch:supported() then
  -- 显示屏幕控制
  touch:button('jump', 1100, 560, 140, 140, 'FFCC33')
end
```

### touch:emulate(on)
*自 v0.7.6*

参数：
- `on`(Bool)——打开或关闭鼠标手指；省略以只读取它 [可选]

返回：Bool

桌面上鼠标是否代替手指.默认开启.手机上无效.

```lua
touch:emulate(false)
```

### touch:mobile()
*自 v0.7.6*

返回：Bool

手机上为 `true`,桌面上 `touch:preview(true)` 开启期间也为 `true`.用它决定是否构建屏幕控制.

```lua
if touch:mobile() then
    touch:joystick('stick', 170, 550, 90)
    touch:button('jump', 1040, 520, 110, 110, '33CCFF')
end
```

### touch:preview(on)
*自 v0.7.6*

参数：
- `on`(Bool)——打开或关闭预览；省略以只读取它 [可选]

返回：Bool

使桌面上 `touch:mobile()` 返回 `true`,所以你脚本的手机布局可以用鼠标尝试.在屏幕构建其控件之前打开它.

```lua
function onCreate()
    touch:preview(true)
end
```

### touch:count()

返回：Int

当前触摸屏幕的手指数量.用 `touch:x` / `touch:y` 索引它们 `0 .. count-1`.桌面上左鼠标按钮算作一根手指.

```lua
if touch:count() >= 2 then text:set('hud', 'pinch!') end
```

### touch:x(index)

参数：
- `index`(Int)——哪个手指,0 基 [默认 0]

返回：Float

`index` 处手指的屏幕 X,游戏像素(匹配 `game:get('screenWidth')` 空间),或如果没有这样的触摸则为 `-1`.与 `touch:y` 配对.桌面上左鼠标按钮算作一根手指.

```lua
local fx, fy = touch:x(0), touch:y(0)
if fx >= 0 then sprite:position('cursor', fx, fy) end
```

### touch:y(index)

参数：
- `index`(Int)——哪个手指,0 基 [默认 0]

返回：Float

`index` 处手指的屏幕 Y,游戏像素,或如果没有这样的触摸则为 `-1`.桌面上左鼠标按钮算作一根手指.

```lua
print(touch:x(0), touch:y(0))
```

### touch:pressed()

返回：Bool

如果本帧至少一根手指在屏幕上则为 `true`.桌面上左鼠标按钮算作一根手指.

```lua
if touch:pressed() then ... end
```

### touch:justPressed()

返回：Bool

新手指首次在屏幕任何地方触摸按下的帧为 `true`——任意位置轻按触发器.桌面上左鼠标按钮算作一根手指.

```lua
if touch:justPressed() then state:change('Game') end
```

### touch:justReleased()

返回：Bool

任何手指从屏幕抬起的那帧为 `true`.桌面上左鼠标按钮算作一根手指.

```lua
if touch:justReleased() then fire() end
```

### touch:inArea(x, y, w, h)

参数：
- `x`(Float)——矩形左(屏幕 px)
- `y`(Float)——矩形顶(屏幕 px)
- `w`(Float)——矩形宽度
- `h`(Float)——矩形高度

返回：Bool

如果任何手指当前在屏幕矩形内则为 `true`.无需按钮对象构建自定义热区的便宜方式.桌面上左鼠标按钮算作一根手指.

```lua
if touch:inArea(0, 0, 640, 720) then moveLeft() end
```

### touch:pressedInArea(x, y, w, h)

参数：
- `x`(Float)——矩形左(屏幕 px)
- `y`(Float)——矩形顶
- `w`(Float)——矩形宽度
- `h`(Float)——矩形高度

返回：Bool

手指首次落在矩形内的帧为 `true`(该区域中的轻按),与 `touch:inArea`(整个按住期间为 true)相对.桌面上左鼠标按钮算作一根手指.

```lua
if touch:pressedInArea(1040, 0, 240, 720) then pause() end
```

### touch:overSprite(tag, cam)

参数：
- `tag`(String)——要命中测试的精灵
- `cam`(String)——通过其解析世界位置的相机标签(默认为精灵的相机)[可选]

返回：Bool

如果任何手指在世界空间中在精灵盒子之上则为 `true`——通过精灵的相机转换每个触摸,所以它在滚动/缩放视图中对齐(不像屏幕空间区域助手).桌面上左鼠标按钮算作一根手指.

```lua
if touch:overSprite('chest') then openChest() end
```

### 屏幕按钮

### touch:button(tag, x, y, w, h, color)

参数：
- `tag`(String)——此按钮的名称(重用标签被替换)
- `x`(Float)——屏幕 X(px)
- `y`(Float)——屏幕 Y(px)
- `w`(Float)——宽度(px)
- `h`(Float)——高度(px)
- `color`(String)——十六进制填充颜色,例如 `'FFCC33'` [可选]

返回：Bool

在 `tag` 下注册的屏幕固定屏幕按钮：半透明彩色矩形,按住时变亮,跟踪自己的手指(多点安全),桌面上响应鼠标.用 `held` / `hit` / `lift` 读取状态；用 `buttonAlpha` / `buttonColor` 调整外观.

```lua
-- 简单的两按钮布局
touch:button('left',  60,  520, 140, 140, '4477FF')
touch:button('right', 240, 520, 140, 140, '4477FF')
touch:button('jump', 1080, 520, 160, 160, 'FFCC33')

function onUpdate(elapsed)
  local vx = (touch:held('right') and 220 or 0) - (touch:held('left') and 220 or 0)
  sprite:velocity('player', vx, game:get('player.velocity.y'))
  if touch:hit('jump') then sprite:velocity('player', vx, -600) end
end
```

### touch:held(tag)

参数：
- `tag`(String)——按钮标签

返回：Bool

按钮按住期间每帧为 `true`.

```lua
if touch:held('left') then moveLeft() end
```

### touch:hit(tag)

参数：
- `tag`(String)——按钮标签

返回：Bool

仅在按钮首次按下的帧为 `true`——离散"轻按" / 发射触发器.

```lua
if touch:hit('jump') then jump() end
```

### touch:lift(tag)

参数：
- `tag`(String)——按钮标签

返回：Bool

仅在按钮释放的帧为 `true`——用于充电和释放机制.

```lua
if touch:lift('charge') then releaseShot(touch:holdTime('charge')) end
```

### touch:holdTime(tag)

参数：
- `tag`(String)——按钮标签

返回：Float

按钮被按住的秒数(释放时重置为 `0`).在 `lift` 时读取它用于充电机制.

```lua
text:set('charge', string.format('%.1f', touch:holdTime('charge')))
```

### touch:buttonAlpha(tag, idle, held)

参数：
- `tag`(String)——按钮标签
- `idle`(Float)——未按住时不透明度 0–1
- `held`(Float)——按住时不透明度 0–1 [可选]

返回：Bool

设置按钮的空闲(和可选按住)不透明度.低空闲 alpha 获得微妙控制,或 `0` 空闲使不可见热区仍读轻按.

```lua
touch:buttonAlpha('jump', 0.25, 0.6)
touch:buttonAlpha('secret', 0, 0)   -- 不可见轻按区
```

### touch:buttonColor(tag, color)

参数：
- `tag`(String)——按钮标签
- `color`(String)——十六进制色调,例如 `'FF4444'`

返回：Bool

重新着色现有按钮.

```lua
touch:buttonColor('jump', touch:held('jump') and 'FFFFFF' or 'FFCC33')
```

### touch:moveButton(tag, x, y)

参数：
- `tag`(String)——按钮标签
- `x`(Float)——新屏幕 X
- `y`(Float)——新屏幕 Y

返回：Bool

重新定位按钮——例如为不同屏幕大小或惯用手布局控件.

```lua
touch:moveButton('jump', game:get('screenWidth') - 200, 540)
```

### touch:showButton(tag, on)

参数：
- `tag`(String)——按钮标签
- `on`(Bool)——显示 + 启用,或隐藏 + 禁用

返回：Bool

显示或隐藏按钮.隐藏按钮也被禁用(它们不注册触摸),所以这干净地切换控制开和关.

```lua
touch:showButton('jump', game:get('canJump'))
```

### touch:buttonMode(tag, mode)

参数：
- `tag`(String)——按钮标签
- `mode`(String)——`claim`(默认)和`slide` 或 `free`

返回：Bool

设置按钮如何认领手指：

- `claim`(默认)——从按钮上开始的手指拥有它直到释放,即使它滑出.最适合动作按钮(跳跃/发射).

- `slide`——由当前在其上的手指按住；在 D-pad 上滑动的拇指跟随,离开的瞬间释放.用于方向板.

- `free`——任何手指重叠时按下,无所有权跟踪.

每种模式仍然独立跟踪每个手指,所以另一个按钮上的第二根手指不受影响.

```lua
touch:button('left',  60, 430, 130, 130, '4477FF')
touch:button('right', 200, 430, 130, 130, '4477FF')
touch:buttonMode('left',  'slide')   -- 拇指可以左<->右滑动
touch:buttonMode('right', 'slide')

touch:button('jump', 1080, 470, 150, 150, 'FFCC33')  -- 保持 'claim'
```

### touch:removeButton(tag)

参数：
- `tag`(String)——按钮标签

返回：Bool

销毁按钮并释放它.(所有按钮在状态变化时也自动移除.)

```lua
touch:removeButton('jump')
```

### 虚拟摇杆

虚拟模拟摇杆——一个底座圆和一个可拖动旋钮.在底座内触摸(或拖动),旋钮跟随你的手指,钳制到半径,给出平滑方向向量.读取 `joyX` / `joyY`(每个 `-1..1`)和 `joyMag`(`0..1`,旋钮被推多远).它多点正确——摇杆认领自己的手指,所以摇杆上的拇指加按钮上的拇指同时工作.桌面上鼠标驱动它用于测试.死区(默认 0.12)零化微小推动,所以玩家不漂移.

### touch:joystick(tag, x, y, radius, baseColor, knobColor)

参数：
- `tag`(String)——此摇杆的名称(重用标签被替换)
- `x`(Float)——中心屏幕 X(px)
- `y`(Float)——中心屏幕 Y(px)
- `radius`(Float)——底座半径 = 最大旋钮行程(px)
- `baseColor`(String)——外环十六进制颜色 [可选]
- `knobColor`(String)——旋钮十六进制颜色 [可选]

返回：Bool

创建以 `(x, y)` 为中心的屏幕固定虚拟模拟摇杆.在 `radius` 内拖动,旋钮跟随；释放时重新居中到零.用 `joyX` / `joyY` 读取方向,用 `joyMag` 读取推动量——轴已经编码幅度,所以乘以速度免费获得模拟移动(半推 = 半速).

```lua
touch:joystick('move', 220, 500, 130, '38425C', '9DBBFF')

function onUpdate(elapsed)
  local spd = 320
  sprite:velocity('player', touch:joyX('move') * spd, touch:joyY('move') * spd)
end
```

### touch:joystickGraphic(tag, baseImage, knobImage)

参数：
- `tag`(String)——摇杆标签
- `baseImage`(String)——外环图像(`images/` 下路径,无扩展名)
- `knobImage`(String)——旋钮图像 [可选]

返回：Bool

将摇杆绘制的圆换成自定义艺术.图像以与 `sprite:add` 相同的方式解析(`assets/images/` 下).底座缩放到摇杆直径,旋钮到约 0.9×半径；触摸半径和读数不变,只是外观.只传递底座,或两者.

```lua
touch:joystick('move', 220, 500, 130)
touch:joystickGraphic('move', 'ui/stick-base', 'ui/stick-knob')
```

### touch:joyX(tag)

参数：
- `tag`(String)——摇杆标签

返回：Float

水平轴,`-1`(全左)到 `1`(全右),静止或死区内为 `0`.已经按旋钮推多远缩放.

```lua
sprite:velocity('player', touch:joyX('move') * 300, 0)
```

### touch:joyY(tag)

参数：
- `tag`(String)——摇杆标签

返回：Float

垂直轴,`-1`(全上)到 `1`(全下),静止为 `0`.Y 是屏幕空间(下为正),匹配精灵位置.

```lua
print(touch:joyX('move'), touch:joyY('move'))
```

### touch:joyMag(tag)

参数：
- `tag`(String)——摇杆标签

返回：Float

旋钮被推多远,`0`(中心)到 `1`(边缘).用它获得模拟油门,或检测硬推 vs 轻推.等于 (joyX, joyY) 向量的长度.

```lua
if touch:joyMag('move') > 0.9 then dash() end
```

### touch:joyAngle(tag)

参数：
- `tag`(String)——摇杆标签

返回：Float

摇杆被推的方向,度(`0` = 右,`90` = 下,屏幕空间).居中时返回 `0`.便于使精灵面向摇杆指向的方向.

```lua
if touch:joyMag('move') > 0 then game:set('player.angle', touch:joyAngle('move') + 90) end
```

### touch:joyActive(tag)

参数：
- `tag`(String)——摇杆标签

返回：Bool

手指(或鼠标)在摇杆上期间为 `true`,即使它被推回死区内的中心.用它区分"按住摇杆不动"和"不触摸它".

```lua
if not touch:joyActive('move') then idle() end
```

### touch:joyDeadzone(tag, dz)

参数：
- `tag`(String)——摇杆标签
- `dz`(Float)——死区 0–1(低于此的轴读为 0)

返回：Bool

设置死区——小于此的推动在两个轴上读为 `0`,防止漂移.默认 `0.12`.为抖动拇指提高它,为更精细控制降低它.

```lua
touch:joyDeadzone('move', 0.2)
```

### touch:moveJoystick(tag, x, y)

参数：
- `tag`(String)——摇杆标签
- `x`(Float)——新中心屏幕 X
- `y`(Float)——新中心屏幕 Y

返回：Bool

在新屏幕位置重新居中整个摇杆(并将其重置为零).为不同屏幕大小或惯用手布局它.

```lua
touch:moveJoystick('move', 220, game:get('screenHeight') - 200)
```

### touch:showJoystick(tag, on)

参数：
- `tag`(String)——摇杆标签
- `on`(Bool)——显示 + 启用,或隐藏 + 禁用

返回：Bool

显示或隐藏摇杆；隐藏也禁用它(读数保持 `0`).干净地切换控制开和关.

```lua
touch:showJoystick('move', game:get('canMove'))
```

### touch:removeJoystick(tag)

参数：
- `tag`(String)——摇杆标签

返回：Bool

销毁摇杆并释放它.(摇杆在状态变化时也自动移除.)

```lua
touch:removeJoystick('move')
```

---

## 变量如何工作

脚本通过 `game` 命名空间读写引擎状态.每次调用接受一个字符串 `path`.按此顺序可能发生四件事：

- 注册表命中——路径匹配像 `curBeat`和`score`和`downScroll` 的策划键.稳定和安全和推荐.

- 自定义变量——你之前用 `game:set("speed", 5)` 存储的单个键(无点).让你将自己的脚本值保存在一个共享位置.见下面的自定义变量.

- 标签行走——第一段是你注册的精灵/文本/任何东西的标签(`sprite:add`和`text:add`……).路径的其余部分钻入该对象的字段.这是你读写任何标签的任何属性的方式——`game:set("hero.x", 200)`和`game:set("title.alpha", 0)`和`game:get("title.text")`.

- 状态行走——以上都不是；路径针对当前 `FlxState` 行走.让你到达 `boyfriend.x`和`camHUD.zoom`和从 `PlayState` 可到达的任何东西.

注册表是引擎重构后保持稳定的.自定义变量在整个会话中持续.标签行走只要标签存在就稳定.状态行走是快速实验——如果引擎重命名字段,你的路径中断.

### 在哪里找到它们

- 歌曲与时机——歌曲在哪里和多快以及如何开始.用 game:get 读取它们,用 game:set 更改可写的.
- 游戏玩法与分数——生命值和分数和评级和决定玩家如何玩的开关.
- 音符与音符线——音符的大小和间距和按名称的每个音符线以及谱面的音符列表.
- 相机与角色——游戏相机看向什么和它如何在节拍上移动以及角色带来什么.
- 显示与性能——屏幕大小和渲染质量和平滑和 FPS 计数器.
- 加载与日志——加载屏幕和脚本日志和热重载.
- 对象属性——精灵和文本和相机和其余的字段,通过其标签到达.
读写它们的函数——`game:get`和`game:set`和`game:has` 和其余——在 Game Functions 页面上.

### 自定义变量

`game:set` 也作为你自己脚本值的共享键值存储.当路径是无点的单个键且不是注册标签时,值存储在会话范围映射中,而不是写入标签或状态.`game:get` 直接读回它.

它的用途：将值保存在任何脚本都能到达的地方——移动速度和连击乘数和标志——而无需通过函数参数线程化或每脚本复制.

| 行为 | 细节 |
|---|---|
| 持久性 | 存储在 `static` 映射中,所以自定义变量在整个会话中跨 `state:change` 存活.它不写入磁盘——游戏关闭时重置. |
| 键形状 | 仅单段.`game:set("a.b", …)` 总是标签 / 状态行走,从不是自定义变量. |
| 只读注册表键 | 设置一个(例如 `game:set("curBeat", 5)`)失败并带诊断——它不会静默成为自定义变量. |
| 名称冲突 | 如果精灵标签已存在该名称,标签获胜,`game:set("thatName", v)` 报告错误.为自定义变量和标签使用不同名称. |

---

## 歌曲与时机变量

歌曲在哪里和多快以及如何开始.用 `game:get` 读取它们,用 `game:set` 更改可写的.

### 变量

| 键 | 类型 | R/W | 描述 |
|---|---|---|---|
| `songName` | String | R | `PlayState.songName` |
| `songGen` | Int | R | `PlayState.songGeneration`——每次歌曲开始或重启时递增.在 `onSongStart`/`songStart` 捕获它,并在 `onNoteHit`/`onNoteMiss`/`onHoldEnd` 顶部比较它,以忽略自那以后歌曲已改变留下的事件 v0.6.3 |
| `songTime` | Float | R | `SongPlayer.time` |
| `songPlaying` | Bool | R | `SongPlayer.playing` |
| `songLength` | Float | R | 伴奏长度(ms) |
| `songProgress` | Float | R | 播放进度 `0..1`(= `song:progress()`) |
| `musicPos` | Float | R | `Conductor.instance.musicPosition` |
| `curStep` | Int | R | `MusicBeatState.curStep` |
| `curBeat` | Int | R | `MusicBeatState.curBeat` |
| `curSection` | Int | R | `MusicBeatState.curSection` |
| `stepCrochet` | Float | R | `Conductor.stepCrochet` |
| `bpm` | Float | R/W | 当前指挥器速度.设置它实时改变节拍时钟(见 conductor) |
| `conductorEnabled` | Bool | R/W | 节拍时钟(`onBeatHit`/`onStepHit`)是否运行 |
| `countdown` | Bool | R/W | 音乐开始前的静默倒计时；音符已经滚入.默认 `false`.在歌曲开始前设置 v0.7.1 |
| `countdownTime` | Float | R/W | 倒计时长度(秒,默认 `3`)v0.7.1 |
| `countdownTicks` | Int | R/W | 此歌曲开始前的倒计时拍数,每个一个 `onCountdownTick`.读取谱面的 Countdown 值(在谱面编辑器中设置,Song 窗口,F2)直到脚本设置它.高于 `0` 时取代 `countdown`/`countdownTime` v0.7.2 |
| `testing` | Bool | R | 歌曲作为谱面编辑器测试运行时为 `true`.那时 `song:play()` 被跳过,gui 窗口隐藏 v0.7.1 |
| `leadIn` | Bool | R | 从谱面编辑器测试到达其起点前的短引导期间为 `true` |
| `leadInLeft` | Float | R | 那个引导还剩多少毫秒 |

### 示例

---

## 游戏玩法与分数变量

生命值和分数和评级和决定玩家如何玩的开关.

### 变量

| 键 | 类型 | R/W | 描述 |
|---|---|---|---|
| `health` | Float | R/W | `PlayState.health`——0 到 `healthMax`,开始时一半.每次玩家命中获得少量,每次错过(玩家或对手自动命中)或丢弃长按失去少量.达到 0 触发一次 onGameOver v0.6.5 |
| `healthMax` | Float | R | `health` 的上限(`2`)v0.6.5 |
| `opponentHealth` | Float | R | 血条的对手侧：`healthMax - health` v0.7.7 |
| `score` | Int | R/W | `Stats.score` |
| `combo` | Int | R/W | `Stats.combo` |
| `maxCombo` | Int | R | `Stats.maxCombo` |
| `misses` | Int | R | `Stats.misses` |
| `sicks` / `goods` / `bads` / `shits` | Int | R | 本歌曲以 Sick 评级命中的音符 |
| `goods` | Int | R | 本歌曲以 Good 评级命中的音符 |
| `bads` | Int | R | 本歌曲以 Bad 评级命中的音符 |
| `shits` | Int | R | 本歌曲以 Shit 评级命中的音符 |
| `accuracy` | Float | R | `Stats.accuracy()` |
| `paused` | Bool | R/W | 暂停 / 恢复歌曲和游戏玩法(音符和指挥器冻结；你的携带脚本的 `onUpdate` 继续运行以便它取消暂停).长按中途持续的音符在你暂停的瞬间干净释放——接收器辉光和角色姿势立即重置,而不是保持按住姿势直到你恢复 v0.6.5 |
| `canPress` | Bool | R/W | 玩家音符输入的主开关.`false` 忽略每个键命中(无音符注册,无幽灵轻按错过).对于单车道使用下面的 `laneCanPress.<dir>` |
| `laneCanPress.<dir>` | Bool | R/W | 每车道输入门,`dir` = `0` 左 … `3` 右.例如 `game:set('laneCanPress.2', false)` 仅禁用上车道 |
| `ghostTapping` | Bool | R/W | `PlayState.ghostTapping` |
| `playerHolding` | Bool | R | 玩家当前是否持续任何长按音符.轮询它以获得长按持续期间运行的效果 v0.5.6 |
| `opponentHolding` | Bool | R | 对手车道相同 v0.5.6 |
| `downScroll` | Bool | R/W | `GameAPI.downScroll` |
| `scrollToggleKey` | Bool | R/W | 当 `true` 时,TAB 通过内置键处理程序实时切换 `downScroll`.默认 `false` |
| `pauseToggleKey` | Bool | R/W | 当 `true` 时,P 一起切换暂停和冻结——与在一步中设置 `paused` 并调用 `game:freeze()`/`game:thaw()` 相同——通过内置键处理程序.默认 `false` v0.6.5 |
| `judgementVisible` | Bool | R/W | 显示 / 隐藏判定计数器 HUD |
| `missAlpha` | Float | R/W | 错过的玩家音符降到的 Alpha(默认 `0.35`).设置 `1` 为不暗,或 `-1` 保持 alpha 不变,以便脚本从 onNoteMiss 补间它 |
| `missFadeTime` | Float | R/W | 错过的音符被回收前停留多久(ms,默认 `200`).提高它给错过补间空间播放 |

### 示例

---

## 音符与音符线变量

音符的大小和间距和按名称的每个音符线以及谱面的音符列表.

### 变量

| 键 | 类型 | R/W | 描述 |
|---|---|---|---|
| `noteScale` | Float | R/W | 音符皮肤 `scale` 的乘数,实时应用于音符和长条和接收器.每首歌重置为 `1` |
| `noteSpacing` | Float | R/W | 车道间距(px,箭头中心之间的间隙)；实时重新定位音符线.独立于缩放.每首歌重置为皮肤的值 |
| `playerStrums.*` / `opponentStrums.*` | object | R/W | 每个音符线可按字段寻址：`.visible`和`.alpha`(音符+长条,在重生中存活)和`.x`/`.y`(车道位置,音符跟随)和`.noteScale`/`.receptorScale`/`.scale`和`.angle`/`.receptorAlpha` 和 `.upX`/`.upY`/`.downX`/`.downY`(每滚动方向).见 Strum / Note Functions |

此表之外的键落到上面解释的点分行走——先标签,后状态.所以 `game:get("hero.x")` 读取标记为 `"hero"` 的精灵；`game:get("boyfriend.x")` 读取 `PlayState.boyfriend.x`；`game:get("dad.scale.y")` 读取 `PlayState.dad.scale.y`.相同的路径可通过 `game:set` 写入.

音符集合.游戏玩法期间三个特殊路径暴露谱面的音符,索引 `[strum][note]`,其中 strum `0` = 玩家,`1` = 对手：`spawnedNotes` 是屏幕上活动音符精灵(完整精灵字段——`visible`和`x`和`y`和`alpha`……)；`unspawnNotes` 是尚未生成的即将到来的音符；`allNotes` 是整个谱面.后两个是谱面数据,所以只有 `t`(时间 ms)和`d`(方向)和`p`(玩家)和`l`(长按长度)和 `nt`(音符类型字符串)读回——不是精灵字段.例如 `game:set("spawnedNotes.0.0.visible", false)`和`game:get("unspawnNotes.1.0.t")`和`game:get("allNotes.0.0.nt")`.

### 示例

---

## 相机与角色变量

游戏相机看向什么和它如何在节拍上移动以及角色带来什么。

### 变量

| 键 | 类型 | R/W | 描述 |
|---|---|---|---|
| `focus` | Int | R | 游戏相机现在看向谁：`0` 对手，`1` 玩家，`2` 女友，`-1` 固定点（`Camera Follow Pos`）。跟随段落和 `FocusCamera` 事件 v0.7.7 |
| `cameraZoomEnabled` | Bool | R/W | `PlayState.cameraZoomEnabled` |
| `camBumps` | Bool | R/W | 游戏相机是否在节拍上碰撞。`false` 保持它静止；缩放仍然缓动回 `defaultGameZoom` |
| `defaultGameZoom` | Float | R/W | 游戏相机在碰撞之间静止的缩放。从舞台缩放开始；设置它平滑移动相机那里 |
| `funkinStyle` | Bool | R/W | `GameAPI.funkinStyle`——在 `song:play` 之前设置；添加角色和相机跟随和节拍脉冲缩放（默认 `false`） |
| `boyfriend.healthColor` / `dad.healthColor` / `gf.healthColor` | String | R | 角色文件中血条颜色，作为 `#RRGGBB`。准备好用于 `bar:colors` 和 `sprite:color` 和其余 v0.7.7 |
| `boyfriend.healthIcon` / `dad.healthIcon` | String | R | 角色的图标名称，文件没有时为其自己的名称 v0.7.7 |

---

## PlayState 对象

PlayState（游戏状态）中的每个活跃对象都会以其名称作为路径的第一段暴露出来，因此你可以从 Lua 中读取和写入它们的任何字段。这些名称会在通用状态遍历之前解析，因此即使它们大多是私有引擎字段也能正常工作。每个名称还接受一些别名。

| 名称（别名） | 类型 | 说明 |
|-------------|------|------|
| `boyfriend`（`bf` 和 `player`） | Character | 玩家角色（右侧） |
| `dad`（`opponent`） | Character | 对手角色（左侧） |
| `girlfriend`（`gf`） | Character | 旁观角色 |
| `camGame`（`gameCam`） | Camera | 世界摄像机——跟随动作。同时标记为 `'game'` 用于 `camera:*` |
| `camHud`（`camHUD` 和 `hudCam`） | Camera | HUD 摄像机——分数和音符轨道和计数器。标记为 `'hud'` |
| `camOther`（`otherCam`） | Camera | 过渡/弹窗的覆盖摄像机。标记为 `'other'` |
| `camFollow` | FlxObject | `camGame` 跟踪的隐形点——移动它来推动摄像机 |
| `strumlinePlayer`（`playerNotes` 和 `playerStrumline` 和 `playerStrums`） | Strumline | 玩家的音符接收器（右侧）——4 个箭头组成的一组 |
| `strumlineOpponent`（`opponentNotes` 和 `opponentStrumline` 和 `opponentStrums`） | Strumline | 对手的音符接收器（左侧）——4 个箭头组成的一组 |
| `hud`（`scoreText`） | ScoreText | 分数/信息文本对象 |
| `judgmentCounter` | JudgmentCounter | sick/good/bad/shit 判定计数显示 |
| `notePool`（`notes`） | Group | 活跃的音符对象 |
| `holdPool`（`holds`） | Group | 活跃的长按音符片段 |
| `chart` | FreakChart | 加载的谱面数据（速度和音符和时间变化） |

角色暴露上表中的所有精灵字段（`x` 和 `y` 和 `alpha` 和 `scale.x` 和 `angle` 和 `visible` 和 `flipX` 等）；摄像机暴露 `zoom` 和 `angle` 和 `alpha` 和 `scroll.x` 与 `scroll.y` 和 `bgColor`。使用点分路径即可访问。

**索引列表：** 路径中纯数字的段会索引到列表中——可以是原始数组（如 `chart.notes`）或任何组的成员（音符轨道的接收器和 `notePool` 和 `holdPool`）。索引从 0 开始，与引擎的方向顺序一致：`0` 左和 `1` 下和 `2` 上和 `3` 右。因此 `playerNotes.0` 是玩家的左接收器，你可以像操作任何对象一样深入其字段：`playerNotes.0.alpha`。越界索引会返回诊断信息而不会崩溃。

---

## 显示与性能变量

屏幕尺寸和渲染质量和平滑处理和 FPS 计数器。

| 键 | 类型 | 读/写 | 说明 |
|----|------|-------|------|
| `screenWidth` | Int | R | `FlxG.width` |
| `screenHeight` | Int | R | `FlxG.height` |
| `elapsed` | Float | R | `FlxG.elapsed`（自上一帧以来的秒数） |
| `internalResolution` | Float | R/W | 游戏渲染的锐度，与窗口大小无关，类似模拟器中的设置。`1` 为正常，`0.5` 或 `0.75` 为性能较弱的电脑渲染更少像素，`1.5` 和 `2` 或 `3` 渲染更多像素并缩小以获得更清晰的画面。降低时界面保持至少正常锐度。起始值来自 project.xml 中的 `【haxedef name="INTERNAL_RESOLUTION" value="1"】` v0.7.7 |
| `mipmaps` | Bool | R/W | GPU 图像的全局三线性过滤开关（缩小时的清晰与平滑）。实时生效；只重新启用加载了 mipmap 链的纹理 |
| `spriteAntialiasing` | Bool | R/W | `GameAPI.spriteAntialiasing`——全局；应用于每个精灵，当前和未来的 |
| `textAntialiasing` | Bool | R/W | `GameAPI.textAntialiasing`——全局；应用于所有文本，当前和未来的 |
| `physicsStep` | Float | R/W | 精灵移动的最长时间步长，以秒为单位。慢帧会被拆分为这么长的步长，因此速度和重力和阻力和旋转在任何帧率下都给出相同结果。默认 `1/120`，`0` 表示像 v0.7.7 之前那样每帧一步移动 |
| `warmCharacters` | Bool | R/W | `CharacterWarmup.enabled`——在加载屏幕期间后台解码角色精灵表，使 `Character.new()` 命中热缓存而不是同步解码。默认 `true`；设为 `false` 可完全跳过预热 v0.6.0 |
| `fpsCounter.visible` | Bool | R/W | 显示或隐藏 FPS 计数器 v0.7.6 |
| `fpsCounter.mode` | Int | R/W | 计数器显示多少内容：`0` 无，`1` FPS，`2` FPS 和内存，`3` 全部 v0.7.6 |
| `fpsCounter.position` | String | R/W | 计数器的角落：`top_left` 和 `top_right` 和 `bottom_left` 或 `bottom_right` v0.7.6 |
| `focusMuffle` | Bool | R/W | 当窗口失去焦点时，声音变得更轻更闷，类似 osu!，返回时恢复。默认 `true`。在 `FlxG.autoPause` 关闭时有效；开启时游戏会暂停 v0.7.7 |
| `focusVolume` | Float | R/W | 窗口失焦时的音量，`0`…`1`。默认 `0.35` v0.7.7 |
| `focusMuffleAmount` | Float | R/W | 失焦时声音的闷响程度，`0` 清晰 … `1` 完全闷响。默认 `0.85`。有自己 `filters` 的声音保留它们 v0.7.7 |
| `freezeFlattenAngle` | Bool | R/W | 在游戏暂停和冻结或失焦时拉直摄像机角度，如之前一样。默认 `false`：角度保持不变 v0.7.7 |

FPS 计数器也会用 F1 循环切换模式。如果脚本用 `fpsCounter.visible` 隐藏了它，第一次按下会重新显示 v0.7.7。

---

## 加载与日志变量

加载屏幕和脚本日志和热重载。

| 键 | 类型 | 读/写 | 说明 |
|----|------|-------|------|
| `loadingScript` | String | R/W | 装饰加载屏幕的脚本 id——见自定义加载屏幕。持久保存，所以设置一次即可 |
| `loadingProgress` | Float | R | `0`–`1`，加载条绘制所用的平滑值 |
| `loadingStage` | String | R | 加载器正在做什么：谱面/音频阶段名称，然后 `shaders`，然后 `ready`（或 `error`） |
| `loadingDone` | Bool | R | 歌曲和着色器预热都完成后为 `true` |
| `scriptLogs` | Bool | R/W | 脚本问题的弹出通知：错误参数和未知函数和回调中的错误和在 Lua 边界捕获的崩溃。默认 `false`，因此问题只写入 `logs/freak.log`。编写脚本时打开它 v0.7.2 |
| `engineLog` | Bool | R/W | 写入 `logs/freak.log`。默认 `true`。设为 `false` 停止本会话的日志记录；崩溃报告仍会写入。使用 `-D NO_ENGINE_LOG` 构建可永远不创建该文件 v0.7.2 |
| `autoReload` | Bool | R/W | 当前场景的脚本文件保存后立即重新加载，与 Shift+F5 相同。默认 `true`。见热重载 v0.7.2 |

---

## 对象属性

每个标签都是路径根：`game:get("hero.x")` 和 `game:set("title.alpha", 0)`。以下是每种对象具有的字段。

**按对象类型的属性路径**

这些是可标记对象上点分路径可以到达的字段。第一段是标签；其余是字段。嵌套点（`scale.x` 和 `scroll.x`）有效，因为遍历会逐字段深入。任何标有 R/W 的都可以用 `game:set` 写入；R 是只读的。

**精灵**——任何来自 `sprite:add` / `sprite:rec` / `sprite:anim` 的对象（以及文本组中的字母）：

| 路径 | 类型 | 读/写 |
|------|------|-------|
| `tag.x` / `tag.y` | Float | R/W |
| `tag.angle` | Float | R/W |
| `tag.alpha` | Float 0–1 | R/W |
| `tag.visible` | Bool | R/W |
| `tag.color` | Int (ARGB) | R/W |
| `tag.scale.x` / `tag.scale.y` | Float | R/W |
| `tag.offset.x` / `tag.offset.y` | Float | R/W |
| `tag.origin.x` / `tag.origin.y` | Float | R/W |
| `tag.scrollFactor.x` / `.y` | Float | R/W |
| `tag.flipX` / `tag.flipY` | Bool | R/W |
| `tag.velocity.x` / `tag.velocity.y` | Float px/s | R/W |
| `tag.acceleration.x` / `.y` | Float px/s² | R/W |
| `tag.drag.x` / `tag.drag.y` | Float | R/W |
| `tag.maxVelocity.x` / `.y` | Float | R/W |
| `tag.angularVelocity` | Float deg/s | R/W |
| `tag.antialiasing` | Bool | R/W |
| `tag.immovable` / `tag.solid` | Bool | R/W |
| `tag.active` / `tag.exists` | Bool | R/W |
| `tag.width` / `tag.height` | Float | R |

遍历是基于反射的，因此此表只是常见子集——底层 `FlxSprite` 的任何公共字段都可以通过名称访问。除上述之外还包括 `tag.angularAcceleration` 和 `tag.angularDrag` 和 `tag.mass` 和 `tag.elasticity` 和 `tag.health` 和 `tag.alive` 和 `tag.moves` 以及嵌套点如 `tag.last.x`。对于动画精灵，你可以用 `tag.animation.frameIndex` 读取其当前帧。

**摄像机**——用 `camera:bind` 标记的摄像机（世界摄像机）或 `camera:add`（覆盖层）。这些大多数也有专门的 `camera:*` 辅助函数，这是首选形式；路径是原始的逃生舱。

| 路径 | 类型 | 读/写 | 辅助函数 |
|------|------|-------|----------|
| `tag.zoom` | Float | R/W | `camera:zoom` |
| `tag.angle` | Float | R/W | `camera:angle` |
| `tag.alpha` | Float 0–1 | R/W | `camera:alpha` |
| `tag.x` / `tag.y` | Float | R/W | `camera:screenPos` |
| `tag.scroll.x` / `tag.scroll.y` | Float | R/W | `camera:scroll` |
| `tag.bgColor` | Int (ARGB) | R/W | `camera:color` |
| `tag.width` / `tag.height` | Int | R/W | `camera:size` |

**单个文本**——只有 `text:add` 对象（一个 `FlxText`）。它们具有上述所有精灵字段加上：

| 路径 | 类型 | 读/写 |
|------|------|-------|
| `tag.text` | String | R/W |
| `tag.size` | Int | R/W |
| `tag.color` | Int (ARGB) | R/W |
| `tag.textWidth` | Float | R/W |
| `tag.align` | String left/center/right/justify | R/W |
| `tag.bold` / `tag.italic` / `tag.underline` | Bool | R/W |
| `tag.wordWrap` | Bool | R/W |
| `tag.leading` | Int（行间距） | R/W |
| `tag.letterSpacing` | Float | R/W |
| `tag.borderStyle` | String none/shadow/outline/outline_fast | R/W |
| `tag.borderColor` | Int (ARGB) 或十六进制字符串 | R/W |
| `tag.borderSize` | Float | R/W |

`tag.textWidth` 别名字段的换行宽度（`FlxText.fieldWidth`）：设为 > 0 可固定框宽度并自动换行，或设为 `0` 自动适应内容（`tag.width` 仍报告只读的渲染图形宽度）。`tag.align` 和 `tag.borderStyle` 接受/返回上述友好字符串名称，`tag.borderColor` 接受 ARGB 整数或十六进制字符串如 `'FF0000'`。

**字母组**——`text:letters` / `text:gradient` 是 `FlxSpriteGroup`，因此组有 `x` 和 `y` 和 `alpha` 和 `visible` 和 `angle`——但没有 `text` 或 `size`。用 `text:set` 更改其内容，用 `text:letter*` 函数更改每字母字段。

**类型化标签——访问声音和音乐和摄像机**

普通的第一段（`ship.x`）被查找为精灵标签。但精灵不是你标记的唯一东西——声音和音乐轨道和摄像机生活在它们自己的注册表中，裸标签无法到达。用类型前缀作为第一段来寻址它们：

| 前缀 | 路径 | 到达 |
|------|------|------|
| `sound.` | `sound.<tag>.<field>` | 来自 `sound:playTag` 的 SFX 句柄——`volume` 和 `pitch` 和 `time` 和 `length` 和 `playing` |
| `music.` | `music.<tag>.<field>` | `music:play` 轨道——相同字段 |
| `tween.` / `tw.` | `tween.<tag>.<field>` | 活跃的 `tw:*` 补间——`percent`（0–1 进度）和 `scale` 和 `active` 和 `finished` |
| `file.` | `file.<tag>.<field>` | 来自 `file:load` / `file:save` 的已加载文件句柄——`path` 和 `content` 和 `lines` 和 `length` |
| `camera.` / `cam.` | `camera.<tag>.<field>` | 来自 `camera:add` / `camera:bind` 的摄像机——`zoom` 和 `angle` 和 `alpha` 和 `scroll.x` / `.y` 和 `bgColor` |
| `sprite.` / `text.` | `sprite.<tag>.<field>` | 精灵或文本标签——默认查找的显式形式 |

这些像任何其他路径一样可读可写——`game:get('sound.engine.pitch')` 读取引擎 SFX 的音高，`game:set('camera.hud.zoom', 1.2)` 缩放 HUD 摄像机。如果前缀标签不存在，解析会回退到正常的精灵 → PlayState → 状态遍历，因此一个碰巧命名为 `sound` 的精灵仍能解析。（因此当存在匹配的类型化标签时，`sound` 和 `music` 和 `tween` / `tw` 和 `file` 和 `camera` / `cam` 和 `sprite` 和 `text` 这些词保留为第一段。）

**通过名称访问引擎类**

少数引擎范围的名称也解析为路径的第一段，与精灵标签和上述 PlayState 对象并列——因此 `game:get` / `game:set` 可以直接遍历到类自己的字段，而不仅是精灵/摄像机/PlayState 对象的字段。`PlayState` 解析为实时实例（因此实例字段有效，与上述命名对象相同）；其余解析为它们的类或单例，到达它们的静态字段。

| 名称 | 解析为 |
|------|--------|
| `PlayState` | 实时 PlayState 实例——任何字段，不仅是有专门 `game:get` / `game:set` 键或上表中名称的字段 |
| `FlxG` | Flixel 的全局状态——`elapsed` 和 `width` 和 `height` 和 `random` 和… |
| `GameAPI` | 引擎范围开关——`downScroll` 和 `funkinStyle` 和 `spriteAntialiasing` 和 `textAntialiasing` 和… |
| `Conductor` | 活跃的 Conductor 实例——`musicPosition` 和 `currentBpm` 和… |
| `Stats` | 分数跟踪——`score` 和 `combo` 和 `maxCombo` 和 `misses` 和… |

以这种方式可达的大多数内容已经有更简洁的 `game:get` / `game:set` 键（见注册键）——仅当所需字段没有时才使用类根。

**通过 game:get / game:set 访问条形图字段**

除了 `bar:*` 辅助函数外，条形图的参数可通过 game:get / game:set 的点分路径读写——方便补间条形图外观或内联读取进度。颜色接受十六进制字符串或 ARGB 整数；设置需要重绘的参数（厚度和半径和颜色和角度）会立即重绘条形图。由于条形图也是精灵，所有常用精灵字段（`x` 和 `y` 和 `alpha` 和 `scale.x` 和 `angle` 等）也有效。

| 路径 | 类型 | 读/写 | 说明 |
|------|------|-------|------|
| `tag.value` | Float | R/W | 写入时向其动画（如 `bar:value`） |
| `tag.now` | Float | W | 立即设置显示值（无动画） |
| `tag.target` | Float | R/W | 正在缓动的目标值 |
| `tag.progress` | Float 0–1 | R/W | 归一化填充比例 |
| `tag.percent` | Float 0–100 | R/W | 与 progress × 100 相同 |
| `tag.min` / `tag.max` | Float | R/W | 范围端点 |
| `tag.mode` | String | R/W | `instant` / `lerp` / `pixel` / `manual` |
| `tag.speed` | Float | R/W | 缓动速率或像素速度（根据模式） |
| `tag.fillColor` / `tag.emptyColor` | Color | R/W | 十六进制字符串或 ARGB 整数；重绘 |
| `tag.thickness` | Float | R/W | 仅圆形——环厚度（`0` = 完整圆盘） |
| `tag.radius` | Float | R/W | 仅圆形——调整图形大小 |
| `tag.startAngle` | Float | R/W | 仅圆形——度；填充开始的位置 |
| `tag.clockwise` | Bool | R/W | 仅圆形 |

注意：`tag.angle` 保持精灵旋转（不是填充起点）——用 `tag.startAngle` 表示圆形条形图的填充原点。

---

## 所有函数

Lua API 中每个有文档的 `ns:fn`，按命名空间分组——从这些页面实时构建，因此始终是最新的。点击任何条目可跳转到其完整卡片。当你已经知道名称时，搜索（`/`）更快；此列表用于浏览存在的内容。

---

## 缓动名称

`ease` 字符串与 `FlxEase` 函数名称匹配。未知名称（或省略的 ease）回退到 `linear`。

---

## 颜色格式

API 中的每个颜色参数都经过相同的解析器，因此相同的表示法在任何地方都有效：多种样式的十六进制和 Figma 的带不透明度颜色和颜色名称和普通 Lua 数字。

**每种可接受的表示法**

| 写法 | 含义 |
|------|------|
| `'4A6FA5'` 和 `'#4A6FA5'` 和 `'0x4A6FA5'` | 不透明颜色 |
| `'fff'` | 短格式，同 `'FFFFFF'` |
| `'FF4A6FA5'` 和 `'0xFF4A6FA5'` | Flixel 顺序：alpha 在前（AARRGGBB） |
| `'#4A6FA5FF'` | CSS / Figma 顺序：alpha 在后（RRGGBBAA） |
| `'4A6FA5 59%'` 和 `'#4A6FA5 59%'` | Figma：颜色加不透明度 |
| `'red'` 和 `'white'` | 颜色名称 |
| `0x4A6FA5` 和 `0x804A6FA5` | Lua 数字；六位数字是不透明的 |

不透明度的去向：在 `color:set` 和 `text:color` 上，它成为精灵的不透明度，或文本的填充不透明度（其描边保持实心）；在 `shader:outline` 上它是描边不透明度；`color:fill` 将其用作填充强度。

---

## luafreak.json

LuaFreak 在编译时从项目根目录的 `luafreak.json` 加载其配置。每个字段都是可选的——默认值烘焙在 `Config.hx` 中。

**发货配置**

这是 Freak Engine 当前附带的文件：

**可识别字段**

| 字段 | 类型 | 默认 | 说明 |
|------|------|------|------|
| mode | String | `"transpile"` | 执行后端。`"transpile"` 在构建时将每个 `.lua` 转换为 Haxe；`"luajit"` 发送原始 `.lua` 并在运行时在游戏内置的 LuaFreak 解释器上运行（热重载和 modding 和 `scripts:run`）——见运行时脚本。该名称是为旧配置保留的；不涉及原生 LuaJIT 库。Freak Engine 附带 `"luajit"`。Lime 也通过 project.xml 中的 `【json path="luafreak.json"】` 读取此字段，因此 `scripts` 文件夹在第一次构建时导出 |
| sourceDir | String | `"src/"` | 转译器扫描 `.lua` 文件的根目录。Freak Engine 将其设置为 `"scripts/"` |
| outputDir | String | `"gen/"` | 生成的 `.hx` 文件写入的目录。必须在 Haxe 的类路径上，以便引擎看到编译的脚本 |
| strictTypes | Bool | `false` | 为 `true` 时，缺少 `---@param` / `---@return` 注解会在生成时发出警告 |
| errorLevel | String | `"error"` | 错误处理器的严重阈值。`"warning"` 和 `"error"` 和 `"fatal"` 之一。低于阈值的任何内容被抑制 |
| fileExtensions | Array<String> | `[".lua"]` | 视为 Lua 源的文件后缀。允许你同时转译例如 `.luaf` 文件和标准扩展名 |
| verbose | Bool | `false` | 启用详细的宏时间日志记录。Freak Engine 附带此功能开启，因此你可以看到每个脚本被转译 |
| scriptCalls | Object | `{ "one": "call", "all": "call_on_scripts" }` | 重命名跨脚本调用全局变量。见下文 |

**重命名跨脚本全局变量**

如果 `call` 或 `call_on_scripts` 与引擎 API 名称冲突，通过 `scriptCalls` 覆盖它们：

**应用重命名后**

跨脚本调用部分变为：

**验证行为**

加载器是尽力而为的：

- 未知字段产生警告并被跳过。
- 类型错误的字段产生错误，但加载继续，因此所有问题都在一次通过中浮现。
- 缺少默认的 `luafreak.json` 没问题——构建静默使用默认值。
- 缺少显式配置路径（传递给 `Config.load(path)`）被报告为错误。

**文件不控制的内容**

- API 类注册——在 `Project.xml` 中通过 `--macro luafreak.macros.LuaFreakMacro.useApi(...)` 和 `useNamespace(...)` 完成。
- 每脚本启用/禁用——`sourceDir` 下的每个 `.lua` 文件总是被转译。将文件移出 `sourceDir` 以排除它。

---

## 示例

按 API 表面分组的简短和专注的脚本。将这些中的任何一个放入 `scripts/`，它们会在下次构建时被拾取。

每个示例都是一个自包含的代码片段，只使用有文档的 API。它们按你在侧边栏中看到的相同子类别分组——生命周期和渲染和运动与时间和世界和I/O——因此你可以直接扫描到你正在处理的区域。

**响应引擎事件**

回调在引擎节拍上触发，而不是任意帧上。跨脚本消息传递使脚本解耦。内置全局变量（`print` 和 `curBeat`）在任何地方都有效。

**event-callbacks · 记录每个节拍和步**

五个 conductor 回调（`onCreate` 和 `onUpdate` 和 `onStepHit` 和 `onBeatHit` 和 `onSectionHit`）由 `MusicBeatState` 自动调用。在顶层定义其中任何一个——无需注册步骤。

**cross-script · 发射器与订阅者**

两个脚本，解耦。发射器每第四拍用 `call_on_scripts` 广播一个自定义事件；任何定义了匹配函数的脚本都会反应。无共享全局变量，无手动订阅。

**globals · 标记打印 + 反射**

`print` 被重接以用脚本 id 和行标记其来源。与 `game:get` 反射结合用于廉价调试。

**在屏幕上绘制东西**

精灵和文本以及在其上组合的视觉修改器——`color` 和 `blend` 和 `scroll`。所有内容都由你选择的字符串标签键控。

**sprite · 实心矩形 + 动画精灵**

两种创建形式。`sprite:rec` 绘制纯色矩形；`sprite:add` 按路径加载图像（或图集）。两者都在标签下注册精灵；其他所有内容（移动和缩放和淡入淡出）都寻址该标签。

**text · 字母和渐变和波动效果**

`text:letters` 创建逐字母组，因此你可以寻址单个字符。`text:gradient` 在单词上插值颜色，`text:wave` 在正弦曲线上动画每个字母。

**color · 节拍同步色调循环**

`color:tint` 将精灵混合向十六进制颜色，强度可调。在每个节拍上遍历调色板，无需每帧工作即可提供同步的迪斯科效果。

**blend · 加性发光爆发**

堆叠两个精灵——基础图像和 `add` 混合的白色“发光”副本。在每个节拍上脉冲发光的 alpha，实现廉价的 GPU 友好高光。

**scroll · HUD 锁定 + 3 层视差**

`scroll:lock` 将精灵固定到屏幕空间（无摄像机滚动）。低于 1 的每轴因子产生视差深度。

**动画与调度**

补间和计时器以及完善帧完美动画的数学辅助函数。始终优先使用 `tw:*` 而不是每帧读写同一字段。

**tw · 链式入场动画**

同一精灵上的三个补间，不同的标签使它们互不干扰。第三个使用 `elasticOut` 获得弹性完成。

**timer · 3-2-1-GO 倒计时**

`timer:wait` 在延迟后触发回调一次。堆叠几个来编写序列，无需每帧逻辑。始终在 `onDestroy` 中调用 `timer:cancelAll()`——否则计时器会在状态切换后存活。

**util · 平滑跟随**

`util:approach` 是当你希望值滑向目标而不超调时的正确工具。将步长乘以 `elapsed` 使速度与帧率无关。

**摄像机与引擎状态**

camera 命名空间创建并驱动独立视口；`game:*` 读取（和写入）实时引擎状态，如分数和准确度和 conductor 计数器。

**camera · 大节拍震动，跟随玩家**

`camera:bind` 将现有的世界摄像机注册到标签下，以便你可以驱动它。`camera:follow` 将跟踪交给精灵；`camera:shake` 在重击时震动屏幕。

**game · 绑定到引擎状态的实时 HUD**

`game:get` 按键名（精选注册表）或点分路径（反射回退）键控。直接将其连接到 HUD 文本并在每一步刷新。

**输入和音频与状态转换**

键盘/鼠标/游戏方向和歌曲播放，以及在 Lua 状态或子状态之间切换。

**input · 单击和按住和鼠标点击**

`keyJustPressed` 在按键按下的那一帧触发一次——用于跳跃和菜单操作。`get(name)` 在按住键的每一帧都为真。`mouseJustPressed` + `mouseX/Y` 处理点击。

**input · 用户正在按住哪个键？**

无参数调用时，`input:get()` 扫描常用键并返回第一个被按住的键的名称。锁存到局部变量以进行一次性边沿检测——非常适合绑定键提示。

**song · 异步加载 + 按键播放**

`song:load` 是非阻塞的——轮询 `song:loaded()` 或只在用户确认后调用 `song:play()`。标题屏幕通常停在这里，直到玩家按键。

**state · 暂停切换子状态**

`ESCAPE` 打开或关闭 Lua 子状态。子状态脚本位于单独的文件中，具有自己的作用域生命周期——见自定义状态指南的子状态部分。

**从 Figma 设计构建菜单**

从 Figma 框架构建的商店卡片：位置和大小和颜色和描边直接从检查器复制。

**shop - 物品卡片**

具有固定大小和对齐的文本框和 Figma 行高和字母间距和语言文件中的黄色高亮和卡片内的 GPU 描边和预览图片上的 52% 颜色填充和圆角剪辑。

**results - 带回声的标题**

单行标题，带渐变填充和深色描边，加上三个空心副本在后面增长并淡出。

**pause - 覆盖层后的模糊游戏**

将覆盖层下的每个摄像机模糊和去饱和为一层，用晕影覆盖，并将平铺图案保持在面板外。

**条形图和手柄和接触门控**

v0.3.1 表面的代码片段：带动画追赶的进度条和 touching/clipRect/offScreen 辅助函数，以及带震动的手柄控制。

**bar · 带 lerp 重新着色的 HP 条**

一个向目标值动画的健康条，低血量时重新着色，并在受击时震动摄像机。模式 `lerp` 速率 `8` 意味着显示在约 0.4 秒内覆盖约 95% 的差距。

**bar · 歌曲进度（像素模式）**

像素模式是歌曲进度计的正确选择：填充以每秒恒定像素速率前进，与条形图宽度或歌曲长度无关。每帧通过 `bar:percent` 重新定位。

**sprite · 不要推入墙壁**

在 `sprite:touching` 上门控输入驱动的加速度，以便按住方向进入墙壁不会继续重新施加加速度。先调用 `sprite:collide`；`touching` 读取同一帧的结果。

**sprite · clipRect 擦入显示**

通过补间其剪辑矩形的宽度来显示精灵。精灵从第一帧起就处于最终位置和大小——只有可见部分增长。

**camera · 剔除离开视图的子弹**

`camera:offScreen` 回答“这个东西对用户不可见吗？”用它来杀死子弹和冻结屏幕外敌人并跳过动画——比计算到摄像机的距离更便宜，并考虑 `visible` 和 `alpha` 和每精灵 `cameras` 分配。

**input · 双摇杆 + 受击震动**

用左摇杆驱动移动，右摇杆瞄准，在 `A` 或 RT 上开火。每次成功命中都会震动；轻型高频电机 + 重型低频电机用于 Boss 击杀射击。

---

## 自定义状态与子状态

`scripts/` 下的脚本可以作为完整状态或子状态。一个"状态脚本"只是一个具有通常生命周期回调（`onCreate`、`onUpdate`、`onStepHit`、`onBeatHit`、`onSectionHit`、`onDestroy`）的常规 Lua 文件。引擎将其托管在通用 `LuaState`（用于 `state:change`）或 `LuaSubstate`（用于 `state:open`）中，并只将回调路由到那一个脚本。

### 启动脚本

当引擎启动时，它检查 `scripts/boot.lua`。如果存在，启动路径变为：

```
Main → BootState → LuaState("boot")  ⇐ scripts/boot.lua 接管
```

如果 `scripts/boot.lua` 不存在，引擎回退到其默认行为：

```
Main → BootState → LoadingState → PlayState
```

因此 `boot.lua` 是脚本在任何歌曲播放前接管的单一入口点——显示标题屏幕、运行菜单、在按键后启动 `song:play` 等。

`scripts/boot.lua`：

```lua
function onCreate()
    sprite:rec('logo', 540, 300, 200, 120, 'FF6699')
end

function onBeatHit(beat)
    print('boot beat', beat)
end
```

### 没有歌曲的 Conductor

`LuaState` 不依赖播放中的歌曲。它从 `elapsed` 驱动自己的 `step` / `beat` / `section` 节拍，默认 100 BPM。BPM 存储在状态实例上，可以在运行时更改（目前从 Haxe；如果你愿意，以后很容易添加 `state:setBpm()` Lua 入口）。

### 自动作用域

注册为 `LuaState` 或 `LuaSubstate` 所有者的脚本会在会话剩余时间内添加到内部 `stateScripts` 集合。`MusicBeatState` 广播调度器（由 `PlayState` 和任何扩展它的自定义非 Lua 状态使用）跳过该集合中的任何脚本。

这防止了你的 `boot.lua` 在 `PlayState`（通过 `song:play`）内也触发，否则会导致重复创建、精灵重复，最坏情况下造成递归循环。

### 子状态流

当 `LuaSubstate` 打开时，父状态的更新被 Flixel 的正常子状态行为暂停，父脚本的回调被子状态存在检查门控。子状态的所有者脚本独占获取所有回调，直到调用 `state:close()`。

`scripts/pause.lua`：

```lua
function onCreate()
    sprite:rec('dim', 0, 0, 1280, 720, '000000')
    tw:alpha('dimFade', 'dim', 0.6, 0.25, 'quadOut')
end

function onUpdate(elapsed)
    -- 监听取消暂停的按键，然后：
    -- state:close()
end
```

### 从游戏玩法打开子状态

从在 `PlayState`（或父 `LuaState`）内运行的任何脚本中，用子状态的脚本 id 调用 `state:open`。

`scripts/play.lua`：

```lua
function onBeatHit(beat)
    if beat == 16 then state:open('pause') end
end
```

### 游戏结束屏幕

一个完整的配方，结合 `onGameOver`、`song:pitch`、`song:pause` 和上述子状态流：歌曲的音高（及其播放速度）缓和到接近停止，而不是立即切断，然后世界冻结，子状态接管。两个脚本，都在引擎自己仓库的 `scripts/examples/` 下。

直接减慢音符（例如将滚动速度字段补间到 0）不会读作减速——它读作每个音符冲向接收器，因为音符的位置是 `到接收器的距离 × 速度`，并且无论到达 0 的过程多么渐进，速度一旦达到 0 就会坍缩到接收器。减慢歌曲自身的音高反而有效，因为 conductor 跟踪乐器的实时播放时间——因此音符以自然减速的速率接近并停在它们所在的位置，完全像视频减速到冻结帧。

`input:block` 使每个输入查询静音（因此在减速过程中乱按无法偷偷命中）——在游戏结束屏幕打开的那一刻再次解除阻塞，否则其自己的任意键重启检查也会变安静。`tw:num` 用普通回调而不是 `onUpdate` 驱动音高斜坡，因此无论此脚本是否是携带的脚本，它都通过补间管理器继续滴答。同一个回调还在每个摄像机上同时驱动 osu! 风格的失败外观——轻微的缩放（通过 `defaultGameZoom` / `defaultHudZoom`，因此每帧缩放恢复 lerp 不会与之对抗）和小倾斜和游戏摄像机上的平移——都由音高斜坡已经计算的相同 `ease` 值缓和，因此所有内容一起落地。`camera:zoom` 在 `song:pause()` 前立即捕捉最终精确值，因为一旦歌曲（及其 `PlayState` 自己的每帧更新）暂停，缩放恢复 lerp 就停止更新，否则仍差一点的 lerp 会冻结在那里。`onSongStart` 将每个摄像机的角度和偏移重置回中性，因为重启不会自己这样做。

`scripts/examples/game_over.lua`：

```lua
local dying = false
local triggered = false

local SLOWDOWN_TIME = 1.6
local PITCH_FLOOR = 0.05
local ZOOM_TARGET = 0.92
local ANGLE_TARGET = 4
local PAN_X = 24
local PAN_Y = 18

local baseGameZoom = 1
local baseHudZoom = 1

function onSongStart(name)
    dying = false
    triggered = false
    camera:angle('game', 0)
    camera:angle('hud', 0)
    camera:angle('other', 0)
    camera:followOffset('game', 0, 0)
end

function onGameOver()
    if dying then return end
    dying = true
    triggered = false

    game:set('canPress', false)
    input:block(true)

    baseGameZoom = game:get('PlayState.defaultGameZoom')
    baseHudZoom = game:get('PlayState.defaultHudZoom')

    tw:num('gameOverPitch', 1, PITCH_FLOOR, SLOWDOWN_TIME, function(v)
        song:pitch(v)

        local t = (1 - v) / (1 - PITCH_FLOOR)
        if t > 1 then t = 1 end
        local ease = 1 - (1 - t) * (1 - t)

        game:set('PlayState.defaultGameZoom', baseGameZoom * (1 - (1 - ZOOM_TARGET) * ease))
        game:set('PlayState.defaultHudZoom', baseHudZoom * (1 - (1 - ZOOM_TARGET) * ease))
        camera:angle('game', ANGLE_TARGET * ease)
        camera:angle('hud', ANGLE_TARGET * ease)
        camera:angle('other', ANGLE_TARGET * ease)
        camera:followOffset('game', PAN_X * ease, PAN_Y * ease)

        if not triggered and v <= PITCH_FLOOR + 0.001 then
            triggered = true
            camera:zoom('game', baseGameZoom * ZOOM_TARGET)
            camera:zoom('hud', baseHudZoom * ZOOM_TARGET)
            song:pause()
            state:open('game_over_screen')
        end
    end, 'quadOut')
end
```

`onGameOver` 像 `onNoteHit` 一样广播到每个已加载脚本——把 `game_over.lua` 放到 `scripts/` 下（任意位置）就足够了，无需通过 `song:play` 携带它。

`scripts/examples/game_over_screen.lua`：

```lua
local ready = false
local graceTimer = 0

function onCreate()
    input:block(false)

    local w = game:get('screenWidth')
    local h = game:get('screenHeight')

    sprite:rec('gameOverBg', 0, 0, w, h, '000000')
    sprite:camera('gameOverBg', 'hud')
    game:set('gameOverBg.alpha', 0.65)

    text:add('gameOverTitle', 'YOU FAILED', 0, h / 2 - 60, w, 48, 'FFFFFF')
    text:align('gameOverTitle', 'center')
    text:addBorder('gameOverTitle', 'outline', '000000', 3)
    sprite:camera('gameOverTitle', 'hud')

    text:add('gameOverHint', 'Press any button to restart', 0, h / 2 + 10, w, 18, 'FFFFFF')
    text:align('gameOverHint', 'center')
    text:addBorder('gameOverHint', 'outline', '000000', 2)
    sprite:camera('gameOverHint', 'hud')
end

function onUpdate(elapsed)
    if not ready then
        graceTimer = graceTimer + elapsed
        if graceTimer >= 0.3 then ready = true end
        return
    end

    if input:anyJustPressed() or input:mouseJustPressed() then
        state:close()
        song:restart()
    end
end
```

### 自定义加载屏幕

将 `loadingScript` 指向脚本 id，加载屏幕将其作为状态脚本运行——`onCreate`、`onUpdate`、节拍回调，全部。引擎继续在其后完成所有实际工作：异步谱面和音频加载在工作线程上，着色器预热阻止效果在游戏玩法中首次使用时停滞。

这是一个持久设置，所以在启动时设置一次，而不是每次 `song:play` 之前。通过注册表读取加载器状态：

| 键 | 类型 | 含义 |
|---|---|---|
| `loadingProgress` | Float | `0`–`1`，与条绘制相同的平滑值 |
| `loadingStage` | String | 谱面/音频阶段名称，然后 `shaders`，然后 `ready`（或 `error`） |
| `loadingDone` | Bool | 歌曲和着色器预热都完成后为 `true` |

`scripts/menu/loading.lua`：

```lua
-- 在 boot.lua 中指向此文件一次：
--   game:set('loadingScript', 'menu/loading')

function onCreate()
    game:set('loadingBg.visible', false)   -- 去掉默认黑色背景

    sprite:add('loadBg', 'menu/loadingArt', {0, 0})
    scroll:lock('loadBg')

    text:add('tip', 'Tip: hold SHIFT to skip', 0, 620, 1280, 20)
    text:align('tip', 'mid')

    -- 重新调整引擎的条样式而不是隐藏它
    game:set('loadingBar.y', 640); game:set('loadingBarBg.y', 640)
end

function onUpdate(dt)
    game:set('loadBg.angle', game:get('loadingProgress') * 10)

    if game:get('loadingDone') then
        text:set('tip', 'Ready!')
    end
end
```

条和读数都被标记（`loadingBar`、`loadingBarBg`、`loadingLabel`、`loadingShaderLabel`、`loadingBg`），并且按设计绘制在你的精灵上方，所以自定义背景永远不会埋没它们。如果你想要自己的，可以按标签移动、重新调整样式或隐藏它们。

---

## 路径与约定

引擎在哪里查找文件和脚本 id 如何编写，以及状态脚本接收什么——每个其他页面都假设的规则。

### 资源路径

Lua 中的路径省略文件夹和扩展名。引擎添加它们：

| 调用 | 你写 | 它加载的文件 |
|---|---|---|
| `sprite:add`、`backdrop:add` | `'game/logo'` | `assets/images/game/logo.png` |
| `sprite:anim` | `'game/pressAnyKey'` | `assets/images/game/pressAnyKey.png` + `.xml` |
| `sound:play`、`sound:playTag` | `'ui/confirm'` | `assets/audio/sounds/ui/confirm.ogg` |
| `music:play` | `'menuTheme'` | `assets/audio/music/menuTheme.ogg` |
| `state:change`、`state:open` | `'state/title'` | `assets/scripts/state/title.lua` |

不要以 `images/`、`audio/` 或 `scripts/` 开头路径，也不要添加 `.png` / `.ogg` / `.lua`。子文件夹可以：`'menu/settings/panel'`。

构建后添加的文件也会被拾取。引擎在游戏旁边的 `assets` 文件夹中查找任何未包含在构建中的图片、声音、XML、字体或角色——在启动时、每次脚本热重载时，以及每当某物请求它尚不知道的文件时。你在游戏运行时放入的文件会在下次需要时被找到，例如当你重启歌曲时 v0.7.3。自 v0.7.4 起，歌曲中途加载的图片在图像缓存满时不再被丢弃；如果正在使用的图片超过缓存预算，`logs/freak.log` 会提示一次。

### 脚本 id

脚本 id 是其在 `assets/scripts/` 下的路径去掉 `.lua`：`assets/scripts/state/mainmenu.lua` 是 `'state/mainmenu'`。相同的 id 被 `state:change`、`state:open`、`import` 和日志行如 `[state/title.lua:48]` 使用。`state:current()` 返回运行中的状态脚本的 id，或在歌曲内返回 `'play'`。

### 状态生命周期

状态脚本按顺序接收的内容：

| 回调 | 何时 |
|---|---|
| `onCreate()` | 一次，在状态构建后。在此创建精灵、摄像机和音乐 |
| `onUpdate(elapsed)` | 每帧。`elapsed` 以秒为单位 |
| `onStepHit(step)`、`onBeatHit(beat)`、`onSectionHit(section)` | 在状态自己的 conductor 上——即使没有歌曲也会滴答 |
| `onResize(w, h)` | 当窗口大小改变时 |
| `onDestroy()` | 当状态被离开时 |

`state:change(id)` 播放过渡出（如果用 `transition:auto` 设置了过渡），销毁当前状态（其精灵、补间、计时器、标签和回调如 `sprite:onClick`），然后创建新状态并调用其 `onCreate`。旧脚本创建的任何内容都不会存活，除非你将其保存在 `save` 中或用 `state:open` 打开子状态。

### 世界摄像机与 HUD

新精灵进入状态的主摄像机。在自定义状态中，该摄像机没有标签，直到你用 `camera:bind('main')` 给它一个；之后 `camera:fade('main')`、`camera:zoom('main')` 和其余部分对其有效。精灵只有在位于滚动的摄像机上时才随摄像机的滚动和缩放移动：用 `camera:add('hud', 'ui')` 创建覆盖层，并用 `sprite:camera(tag, 'hud')` 将 HUD 精灵移到它上面。在歌曲中，摄像机已经标记为 `'game'`、`'hud'` 和 `'other'`。

### 返回值

执行操作的函数成功时返回 `true`，失败时返回 `false`（原因写入日志并附带脚本行）。询问某事的函数返回值。在调用旧版本构建中可能没有的函数前，检查 `api:has('ns:fn')`。

---

## 示例

按 API 表面分组的简短和专注的脚本。将这些中的任何一个放入 `scripts/`，它们会在下次构建时被拾取。

每个示例都是一个自包含的代码片段，只使用有文档的 API。它们按你在侧边栏中看到的相同子类别分组——生命周期和渲染和运动与时间和世界和I/O——因此你可以直接扫描到你正在处理的区域。

### 响应引擎事件

回调在引擎节拍上触发，而不是任意帧上。跨脚本消息传递使脚本解耦。内置全局变量（`print`、`curBeat`）在任何地方都有效。

**event-callbacks · 记录每个节拍和步**

五个 conductor 回调（`onCreate`、`onUpdate`、`onStepHit`、`onBeatHit`、`onSectionHit`）由 `MusicBeatState` 自动调用。在顶层定义其中任何一个——无需注册步骤。

`scripts/beat_log.lua`：

```lua
function onCreate()
    print('script ready')
end

function onStepHit(step)
    print('step', step)
end

function onBeatHit(beat)
    print('beat', beat)
end

function onSectionHit(section)
    print('section', section)
end
```

**cross-script · 发射器与订阅者**

两个脚本，解耦。发射器每第四拍用 `call_on_scripts` 广播一个自定义事件；任何定义了匹配函数的脚本都会反应。无共享全局变量，无手动订阅。

`emitter.lua`：

```lua
function onBeatHit(beat)
    if beat % 4 == 0 then
        call_on_scripts('onMeasure', beat // 4)
    end
end
```

`flash.lua`：

```lua
function onMeasure(measure)
    print('measure', measure)
end
```

**globals · 标记打印 + 反射**

`print` 被重接以用脚本 id 和行标记其来源。与 `game:get` 反射结合用于廉价调试。

`scripts/debug.lua`：

```lua
function onBeatHit(beat)
    print('beat', beat, 'score', game:get('score'), 'acc', game:get('accuracy'))
end
```

### 在屏幕上绘制东西

精灵和文本以及在其上组合的视觉修改器——`color`、`blend`、`scroll`。所有内容都由你选择的字符串标签键控。

**sprite · 实心矩形 + 动画精灵**

两种创建形式。`sprite:rec` 绘制纯色矩形；`sprite:add` 按路径加载图像（或图集）。两者都在标签下注册精灵；其他所有内容（移动、缩放、淡入淡出）都寻址该标签。

`scripts/sprite_intro.lua`：

```lua
function onCreate()
    sprite:rec('box', 540, 280, 200, 160, 'A78BFA')

    sprite:add('logo', 'myimages/logo', {200, 50})
    sprite:scale('logo', 0.5, 0.5)
end

function onBeatHit(beat)
    tw:angle('boxSpin', 'box', 360, 0.4, 'quadOut')
end
```

**text · 字母和渐变和波动效果**

`text:letters` 创建逐字母组，因此你可以寻址单个字符。`text:gradient` 在单词上插值颜色，`text:wave` 在正弦曲线上动画每个字母。

`scripts/title.lua`：

```lua
function onCreate()
    text:gradient('title', 'FREAK', { 'FF6699', 'A78BFA', '66CCFF' }, 480, 240, 96)
    text:wave('title', 8, 1.5)
end
```

**color · 节拍同步色调循环**

`color:tint` 将精灵混合向十六进制颜色，强度可调。在每个节拍上遍历调色板，无需每帧工作即可提供同步的迪斯科效果。

`scripts/colorbeat.lua`：

```lua
local palette = { 'FF6699', '66CCFF', 'FFEE88', '88FFAA', 'AA77FF' }

function onCreate()
    sprite:rec('box', 540, 280, 200, 160, 'FFFFFF')
end

function onBeatHit(beat)
    color:tint('box', palette[(beat % #palette) + 1], 0.8)
end
```

**blend · 加性发光爆发**

堆叠两个精灵——基础图像和 `add` 混合的白色"发光"副本。在每个节拍上脉冲发光的 alpha，实现廉价的 GPU 友好高光。

`scripts/glow.lua`：

```lua
function onCreate()
    sprite:rec('logo',      540, 300, 200, 120, '6699FF')
    sprite:rec('logo_glow', 540, 300, 200, 120, 'FFFFFF')
    blend:set('logo_glow', 'add')
    color:mul('logo_glow', 1, 1, 1, 0)
end

function onBeatHit(beat)
    color:mul('logo_glow', 1, 1, 1, 1.0)
    tw:alpha('glowFade', 'logo_glow', 0.0, 0.35, 'expoOut')
end
```

**scroll · HUD 锁定 + 3 层视差**

`scroll:lock` 将精灵固定到屏幕空间（无摄像机滚动）。低于 1 的每轴因子产生视差深度。

`scripts/world_bg.lua`：

```lua
function onCreate()
    sprite:rec('sky',   -200,   0, 1680, 720, '113355')
    sprite:rec('hills', -200, 360, 1680, 360, '226677')
    sprite:rec('grass', -200, 600, 1680, 120, '224422')
    scroll:set('sky',   0.1, 0.0)
    scroll:set('hills', 0.4, 0.2)
    scroll:set('grass', 1.0, 1.0)

    sprite:rec('hud_bg', 0, 0, 1280, 60, '000000')
    scroll:lock('hud_bg')
    color:mul('hud_bg', 1, 1, 1, 0.6)
end
```

### 动画与调度

补间和计时器以及完善帧完美动画的数学辅助函数。始终优先使用 `tw:*` 而不是每帧读写同一字段。

**tw · 链式入场动画**

同一精灵上的三个补间，不同的标签使它们互不干扰。第三个使用 `elasticOut` 获得弹性完成。

`scripts/intro.lua`：

```lua
function onCreate()
    sprite:rec('logo', 540, 300, 200, 120, 'A78BFA')
    color:mul('logo', 1, 1, 1, 0)

    tw:alpha('logoFadeIn',  'logo', 1.0, 0.6, 'quadOut')
    tw:y    ('logoSlideUp', 'logo', 260, 0.6, 'quadOut')
    tw:scale('logoPop',     'logo', {1.1, 1.1}, 0.9, 'elasticOut')
end
```

**timer · 3-2-1-GO 倒计时**

`timer:wait` 在延迟后触发回调一次。堆叠几个来编写序列，无需每帧逻辑。始终在 `onDestroy` 中调用 `timer:cancelAll()`——否则计时器会在状态切换后存活。

`scripts/countdown.lua`：

```lua
function onCreate()
    text:add('cd', '3', 600, 320, 0, 96, 'FFFFFF')
    timer:wait('cd1', 1.0, function() text:set('cd', '2') end)
    timer:wait('cd2', 2.0, function() text:set('cd', '1') end)
    timer:wait('cd3', 3.0, function() text:set('cd', 'GO!') end)
    timer:wait('cd4', 4.0, function() state:change('play') end)
end

function onDestroy()
    timer:cancelAll()
end
```

**util · 平滑跟随**

`util:approach` 是当你希望值滑向目标而不超调时的正确工具。将步长乘以 `elapsed` 使速度与帧率无关。

`scripts/follow.lua`：

```lua
local x = 200

function onCreate()
    sprite:rec('chaser', x, 320, 40, 40, 'FF6699')
end

function onUpdate(elapsed)
    local tx = input:mouseX()
    x = util:approach(x, tx, 800 * elapsed)
    game:set('chaser.x', x)
end
```

### 摄像机与引擎状态

camera 命名空间创建并驱动独立视口；`game:*` 读取（和写入）实时引擎状态，如分数和准确度和 conductor 计数器。

**camera · 大节拍震动，跟随玩家**

`camera:bind` 将现有的世界摄像机注册到标签下，以便你可以驱动它。`camera:follow` 将跟踪交给精灵；`camera:shake` 在重击时震动屏幕。

`scripts/camera_drive.lua`：

```lua
function onCreate()
    camera:bind('world')
    sprite:rec('player', 600, 320, 48, 48, 'FF6699')
    camera:follow('world', 'player', 0.18, 'platformer')
end

function onBeatHit(beat)
    if beat % 8 == 0 then
        camera:shake('world', 0.012, 0.25)
    end
end
```

**game · 绑定到引擎状态的实时 HUD**

`game:get` 按键名（精选注册表）或点分路径（反射回退）键控。直接将其连接到 HUD 文本并在每一步刷新。

`scripts/hud_stats.lua`：

```lua
function onCreate()
    text:add('hud_score', 'score: 0',  20, 16, 0, 22, 'FFFFFF')
    text:add('hud_acc',   'acc: 0.0%', 20, 44, 0, 18, 'FFFFFF')
    scroll:lock('hud_score')
    scroll:lock('hud_acc')
end

function onStepHit(step)
    text:set('hud_score', 'score: ' .. util:round(game:get('score'), 0))
    text:set('hud_acc',   'acc: ' .. util:round(game:get('accuracy') * 100, 2) .. '%')
end
```

### 输入和音频与状态转换

键盘/鼠标/游戏方向和歌曲播放，以及在 Lua 状态或子状态之间切换。

**input · 单击和按住和鼠标点击**

`keyJustPressed` 在按键按下的那一帧触发一次——用于跳跃和菜单操作。`get(name)` 在按住键的每一帧都为真。`mouseJustPressed` + `mouseX/Y` 处理点击。

`scripts/input_demo.lua`：

```lua
function onUpdate(elapsed)
    if input:keyJustPressed('SPACE') then
        print('jump!')
    end

    if input:get('SHIFT') then
        print('shift held')
    end

    if input:mouseJustPressed() then
        print('click at', input:mouseX(), input:mouseY())
    end
end
```

**input · 用户正在按住哪个键？**

无参数调用时，`input:get()` 扫描常用键并返回第一个被按住的键的名称。锁存到局部变量以进行一次性边沿检测——非常适合绑定键提示。

`scripts/bind_prompt.lua`：

```lua
local last = nil

function onUpdate(elapsed)
    local k = input:get()
    if k ~= last then
        if k then print('pressed', k) end
        last = k
    end
end
```

**song · 异步加载 + 按键播放**

`song:load` 是非阻塞的——轮询 `song:loaded()` 或只在用户确认后调用 `song:play()`。标题屏幕通常停在这里，直到玩家按键。

`scripts/title.lua`：

```lua
function onCreate()
    song:load('your-song', 'normal')
    text:add('prompt', 'press ENTER', 540, 380, 0, 22, 'FFFFFF')
end

function onUpdate(elapsed)
    if input:keyJustPressed('ENTER') and song:loaded() then
        state:change('play')
        song:play()
    end
end
```

**state · 暂停切换子状态**

`ESCAPE` 打开或关闭 Lua 子状态。子状态脚本位于单独的文件中，具有自己的作用域生命周期——见自定义状态指南的子状态部分。

`scripts/play.lua`：

```lua
function onUpdate(elapsed)
    if input:keyJustPressed('ESCAPE') then
        if state:current() == 'pause' then
            state:close()
        else
            state:open('pause')
        end
    end
end
```

### 从 Figma 设计构建菜单

从 Figma 框架构建的商店卡片：位置和大小和颜色和描边直接从检查器复制。

**shop - 物品卡片**

具有固定大小和对齐的文本框和 Figma 行高和字母间距和语言文件中的黄色高亮和卡片内的 GPU 描边和预览图片上的 52% 颜色填充和圆角剪辑。

`scripts/menu/shop.lua`：

```lua
function add()
    camera:add('overlay')

    sprite:add('card', 'menu/shop/card') sprite:position('card', 190, 110)
    shader:outline('card', '4A6FA5 59%', 3, 'inside')

    text:add('itemName', lang:get('shop.item1'), 300, 180, 0, 28)
    game:set('name.letterAnchor', true)
    text:font('itemName', 'title.otf')
    sprite:size('itemName', 240, 32)
    text:align('itemName', 'center', 'bottom')
    text:border('itemName', 'outline', '4A6FA5', 3)

    text:add('itemDesc', lang:get('shop.item1.desc'), 300, 230, 0, 16)
    text:font('itemDesc', 'body.ttf')
    sprite:size('itemDesc', 160, 96)
    text:align('itemDesc', 'center', 'middle')
    text:leading('itemDesc', '103.7%')
    text:letterSpacing('itemDesc', '0%')
    text:border('itemDesc', 'outline', '4A6FA5', 2)
    text:markup('itemDesc', '*', 'FFC857')

    sprite:add('cover', 'menu/shop/cover') sprite:position('cover', 470, 230)
    color:fill('cover', '1E88E5 52%')
    sprite:clipRound('cover', 470, 230, 96, 120, 14)

    for _, t in ipairs({'card', 'itemName', 'itemDesc', 'cover'}) do sprite:camera(t, 'overlay') end
end
```

**results - 带回声的标题**

单行标题，带渐变填充和深色描边，加上三个空心副本在后面增长并淡出。

```lua
text:add('title', 'VICTORY', 640, 120, 0, 72)
game:set('title.letterAnchor', true)
text:align('title', 'center')
text:border('title', 'outline', '2B2D42', 4)
text:fillGradient('title', {'FFFFFF', 'FFE08A', 'FF8A3D'}, {0, 0.5, 1})
sprite:center('title', 'x')

for i = 1, 3 do
    local echo = 'titleEcho'..i
    text:copy('title', echo, nil, nil, true)
    text:fillGradient(echo)
    text:fillAlpha(echo, 0)
    text:border(echo, 'outline', 'FFE08A', 2)
    text:resolution(echo, 2)
    game:set(echo..'.alpha', 0.6 / i)
    tw:scale(echo..'Grow', echo, {1 + 0.15 * i, 1 + 0.05 * i}, 1.2, 'quadOut')
    tw:alpha(echo..'Fade', echo, 0, 1.2, 'quadIn')
end
```

**pause - 覆盖层后的模糊游戏**

将覆盖层下的每个摄像机模糊和去饱和为一层，用晕影覆盖，并将平铺图案保持在面板外。

```lua
camera:add('overlayFx')
camera:add('overlay')
filter:blur('overlayFx', 0.2, 1, true)                  -- 下面的一切，模糊一次
filter:set('overlayFx', {grayscale = 0.9}, true)
shader:vignette('overlayFx', 0.8, 0.4, '000000', true)  -- 也覆盖模糊的菜单

backdrop:add('pattern', 'pattern', 'xy') sprite:camera('pattern', 'overlayFx')
sprite:mask('pattern', 'panel', true)                   -- 面板下无点

-- 关闭
filter:blur('overlayFx', 0, 1, true)
filter:set('overlayFx', {grayscale = 0}, true)
shader:vignette('overlayFx', 0)
```

### 条形图和手柄和接触门控

v0.3.1 表面的代码片段：带动画追赶的进度条和 touching/clipRect/offScreen 辅助函数，以及带震动的手柄控制。

**bar · 带 lerp 重新着色的 HP 条**

一个向目标值动画的健康条，低血量时重新着色，并在受击时震动摄像机。模式 `lerp` 速率 `8` 意味着显示在约 0.4 秒内覆盖约 95% 的差距。

`scripts/hp.lua`：

```lua
local hp, maxHp = 100, 100

function onCreate()
  bar:add('hp', 20, 20, 140, 12, '330000', 'FF4444')
  scroll:lock('hp')
  bar:range('hp', 0, maxHp)
  bar:mode('hp', 'lerp', 8)
  bar:value('hp', hp)
end

function takeDamage(n)
  hp = math.max(0, hp - n)
  bar:value('hp', hp)
  if hp <= 30 then bar:colors('hp', '330000', 'FF2222', true, 'FFAAAA') end
  camera:shake('game', 0.004, 0.15)
  input:rumble(0.4, 0.15)
end
```

**bar · 歌曲进度（像素模式）**

像素模式是歌曲进度计的正确选择：填充以每秒恒定像素速率前进，与条形图宽度或歌曲长度无关。每帧通过 `bar:percent` 重新定位。

`scripts/song_progress.lua`：

```lua
function onCreate()
  bar:add('progress', 540, 12, 200, 6, '111111', 'A78BFA')
  scroll:lock('progress')
  bar:mode('progress', 'pixel', 80)
end

function onUpdate(elapsed)
  bar:percent('progress', song:progress() * 100)
end
```

**sprite · 不要推入墙壁**

在 `sprite:touching` 上门控输入驱动的加速度，以便按住方向进入墙壁不会继续重新施加加速度。先调用 `sprite:collide`；`touching` 读取同一帧的结果。

`scripts/walk.lua`：

```lua
local SPEED, GRAV = 320, 1400

function onUpdate(elapsed)
  for _, w in ipairs(group:get('walls')) do
    sprite:collide('player', w)
  end

  local ax = 0
  if input:get('D') and not sprite:touching('player', 'right') then ax = SPEED end
  if input:get('A') and not sprite:touching('player', 'left')  then ax = -SPEED end
  sprite:acceleration('player', ax, GRAV)
end
```

**sprite · clipRect 擦入显示**

通过补间其剪辑矩形的宽度来显示精灵。精灵从第一帧起就处于最终位置和大小——只有可见部分增长。

`scripts/wipe_reveal.lua`：

```lua
function onCreate()
  sprite:add('banner', 'ui/banner', {200, 100})
  sprite:clipRect('banner', 0, 0, 0, game:get('banner.height'))

  local w = game:get('banner.width')
  tw:num('bannerReveal', 0, 1, 0.8, function(p)
    sprite:clipRect('banner', 0, 0, w * p, game:get('banner.height'))
  end, 'quadOut')
end
```

**camera · 剔除离开视图的子弹**

`camera:offScreen` 回答"这个东西对用户不可见吗？"用它来杀死子弹和冻结屏幕外敌人并跳过动画——比计算到摄像机的距离更便宜，并考虑 `visible` 和 `alpha` 和每精灵 `cameras` 分配。

`scripts/cull.lua`：

```lua
function onUpdate(elapsed)
  for _, b in ipairs(group:get('bullets')) do
    if camera:offScreen('game', b) then sprite:remove(b) end
  end
end
```

**input · 双摇杆 + 受击震动**

用左摇杆驱动移动，右摇杆瞄准，在 `A` 或 RT 上开火。每次成功命中都会震动；轻型高频电机 + 重型低频电机用于 Boss 击杀射击。

`scripts/twin_stick.lua`：

```lua
local SPEED = 240

function onUpdate(elapsed)
  local mx = input:padAxis('lx')
  local my = input:padAxis('ly')
  sprite:velocity('player', mx * SPEED, my * SPEED)

  local ax = input:padAxis('rx')
  local ay = input:padAxis('ry')
  if ax * ax + ay * ay > 0.04 then
    game:set('player.angle', math.atan2(ay, ax) * 180 / math.pi)
  end

  if input:padJustPressed('A') or input:padAxis('rt') > 0.5 then
    fire()
    input:rumble(0.6, 0.1)
  end
end

function onBossKilled()
  input:rumbleAll(1.0, 0.8, 1.0)
end
```

---

## 引擎可靠性说明

### 此页是什么

这是我们在引擎包装 Flixel 的方式中发现的可靠性差距的诚实列表——不是变更日志，也并非都已修复。如果脚本做了不寻常的事情，游戏锁定或崩溃而不是只记录错误，可能是其中之一。随着项目修复保持更新。

### 补间安全：覆盖不均

`tw:any` 已经保护其颜色变换路径——更新闭包检查 `sprite == null || sprite.colorTransform == null` 并取消补间，而不是触碰死精灵。这是今天补间表面中唯一防崩溃的部分。

`tw:color` 是剩下的唯一缺口：它创建一个原始的 `FlxTween.color(sprite, ...)`，没有每帧活性检查——如果精灵在补间开始后被销毁，补间会每帧继续向其写入颜色，没有任何东西阻止它。

### 调整大小时的渲染目标/摄像机脆弱性

任何捕获摄像机帧缓冲区以供稍后采样的事物——`blend:set(..., layered = true)` 中的抓取通道路径是当前示例——调用 `cam.enableRenderTarget()` 并每帧读取 `cam.renderTargetGraphic`。该目标根据摄像机当前的缓冲区尺寸确定大小；调整窗口大小（尤其是在宽屏摄像机设置下最大化）会使捕获的图形与摄像机一帧或多帧不匹配，产生撕裂/垃圾或停滞帧，直到下一次调整大小稳定下来。这就是为什么抓取通道混合是选择加入而不是默认的。

### 着色器编译停滞

着色器的 GLSL 只在其第一次真正使用时才真正编译——第一次附加着色器可能会在某些驱动程序上停滞主线程 100-300ms。`LoadingState` 的着色器预热纯粹是为了在加载屏幕期间消除这种停滞，每帧一个着色器，因此它永远不会在游戏玩法中发生。任何不在预热列表中的着色器路径（全新的包着色器，或只从脚本自己的条件分支到达的着色器）仍会在游戏玩法中第一次实际使用时支付这种停滞。

### 状态切换清理：与等级/变量修复相同的错误类别

game:get/set 中修复的等级显示错误是一个更广泛模式的一个实例：引擎级别的东西以脚本不期望的方式在状态切换后存活或不存活。`Tag.clearAll()` 和补间/着色器/过滤器/声音 `cleanup()` 调用等今天都连接到 `FlxG.signals.preStateSwitch`，被认为正确——但它们是随着错误被发现逐个审计的，而不是从单一检查清单。值得将其作为每当添加新子系统时的常设问题：它拥有什么，该所有权是否在状态切换时被拆除？

---

## 高级用法

### 协调多个脚本

脚本不应触及彼此的全局变量。相反，用 `call_on_scripts` 广播事件，让订阅者通过定义处理程序来选择加入。

`scripts/eventBus.lua`：

```lua
-- 发射器（在任何脚本中）
function onBeatHit(beat)
    if beat == 32 then
        call_on_scripts("onDropHit", beat)
    end
end

-- 订阅者（在另一个脚本中）
function onDropHit(beat)
    tw:scale('camFlash', 'flash', {1.2, 1.2}, 0.1, 'expoOut')
end
```

### 性能提示

- 优先使用每拍工作（`onBeatHit`、`onStepHit`）而不是每帧工作（`onUpdate`）。
- 重用补间标签——用现有标签启动新补间会自动取消旧的，无需先调用 `tw:cancel`。
- 使用 `sprite:rec` 作为纯色覆盖层，而不是加载 1×1 图像——它跳过资源管线。
- 避免在 `onUpdate` 内创建精灵。在 144Hz 下成本会快速累积。

---

## 常见问题

**问：Freak Engine 在运行时运行 Lua 解释器吗？**

不。`scripts/` 下的每个 `.lua` 文件在编译时由 LuaFreak 转译为 Haxe——没有运行时解释器。每个脚本都成为引擎自动注册的静态类。

**问：我把脚本放在哪里？**

`scripts/` 下的任何位置（或你在 luafreak.json 中设置的任何 `sourceDir`）。该目录下的每个 `.lua` 文件总是被转译——要排除一个，将其移出 `sourceDir`。

**问：我需要手动加载脚本吗？**

不。引擎自动注册每个转译的脚本。你只需要定义你关心的回调——缺失的回调被静默跳过，不是错误。

**问：为什么我的补间是瞬间完成而不是动画？**

最可能的原因是标签已被使用。用现有标签启动补间会取消前一个。要么选择一个唯一的标签，要么让它故意覆盖——每拍重新触发相同的补间标签是安全的。

**问：我可以 require() 其他 Lua 文件吗？**

还不行——脚本是隔离转译的。使用 `call(scriptName, funcName)` 进行跨脚本行为，或将共享代码分解为 Haxe 并通过引擎 API 公开。

**问：如何知道我正在针对哪个 LuaFreak 版本运行？**

调用 `version()`——它返回运行时版本字符串（与引擎版本分开）。可用于针对特定版本的功能门控。

**问：sprite:rec 支持 alpha 吗？**

颜色字符串只有 RGB——alpha 在创建时强制为 `FF`。之后要淡入或淡出，使用 `tw:alpha`。

**问：如果我传递无效的缓动名称会发生什么？**

它会静默回退到 `linear`。有关完整有效值列表，请参阅缓动名称页面。

**问：如果 call() 和 call_on_scripts() 与我的 API 冲突，我可以重命名它们吗？**

可以。在 luafreak.json 中设置 `scriptCalls.one` 和 `scriptCalls.all`——例如 `{ "one": "invoke", "all": "broadcast" }`。空字符串被拒绝。

**问：两个脚本可以共享状态吗？**

只能通过 `call()` 和 `call_on_scripts()`。设计上没有共享全局状态——这使每个转译脚本独立且可重载友好。

**问：节拍和步和小节有什么区别？**

步是节拍的四分之一。节拍是一个 conductor 节拍（4 步）。小节是一个小节——默认 16 步。三个回调 `onStepHit` 和 `onBeatHit` 和 `onSectionHit` 按此顺序从 `Conductor` 触发。

**问：如何从脚本中读取引擎状态？**

使用 `game:get(path)`。精选键如 `curBeat` 和 `songName` 和 `score` 和 `accuracy` 通过稳定的注册表；任何其他内容（例如 `boyfriend.x`）回退到针对当前状态的点分路径反射遍历。当跨多个状态运行时，使用 `game:has(path)` 保护读取。

**问：我可以覆盖注册表值如 'maxCombo' 或 'accuracy' 吗？**

不。这些键在注册表中是只读的——`game:set` 对它们返回 `false`，反射回退也不会触及它们。可写注册表键列在游戏变量表中（`R/W` 列）。

**问：tw:any 'options.type' 接受什么类型？**

FlxTween 常量——`PERSIST=1` 和 `LOOPING=2` 和 `PINGPONG=4` 和 `ONESHOT=8` 和 `BACKWARD=16`。直接传递整数；例如 `{ type = 4 }` 表示乒乓。