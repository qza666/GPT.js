window.onload = function() {
    var interval = setInterval(function() {
//如果我无法启动就把下面的判断share改为你当前网页的存在的其他字符，比如“邀请成员”
        if (document.body.innerText.includes("share")) {
            console.log('启动了');
            name();
            clearInterval(interval);
        }
    }, 100);
}
;

function name() {
    var prompt = '';
    const originalFetch = window.fetch;

    const prompts = {
        '开始连续对话': '',
        '正常ChatGPT': ''
        '聊天分析指导': '',
        '如何引导话题': ''
    };

    window.fetch = async(url,config)=>{
        if (config && config.method === 'POST' && url.includes('/backend-api/conversation')) {
            if (config.body) {
                let body = JSON.parse(config.body);
                if (body.messages && body.messages[0] && body.messages[0].content && body.messages[0].content.parts) {
                    body.messages[0].content.parts[0] = `${prompt} ${body.messages[0].content.parts[0]}`;
                    config.body = JSON.stringify(body);
                }
            }
        }
        return originalFetch(url, config);
    }
    ;

    var originalElement = document.querySelector("#__next > div.relative.z-0.flex.h-full.w-full.overflow-hidden > div.flex-shrink-0.overflow-x-hidden.bg-token-sidebar-surface-primary > div > div > div > div > nav > div.flex.flex-col.pt-2.empty\\:hidden.dark\\:border-white\\/20 > a");
    var selectList = document.createElement("select");
    selectList.id = "myCustomSelect";
    selectList.className = "group flex gap-2 p-2.5 text-sm cursor-pointer focus:ring-0 radix-disabled:pointer-events-none radix-disabled:opacity-50 items-center";
    selectList.style.border = 'none';
    selectList.style.borderRadius = '0';

    Object.entries(prompts).forEach(([mode,text])=>{
        var option = document.createElement("option");
        option.value = mode;
        option.text = mode;
        selectList.appendChild(option);
    }
    );

    selectList.addEventListener('change', function() {
        prompt = prompts[this.value] || '';
    });

    if (originalElement) {
        originalElement.style.display = 'none';
        originalElement.parentElement.insertBefore(selectList, originalElement);
    }

}
