/**
 * 前端 JavaScript - 技术学习导师
 */

const API_BASE = '/api';

// 切换模式
function switchMode(mode) {
    // 更新按钮状态
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');

    // 更新内容区域
    document.querySelectorAll('.mode-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${mode}-mode`).classList.add('active');
}

// 显示/隐藏加载指示器
function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
}

// 显示结果
function displayResult(elementId, content) {
    const element = document.getElementById(elementId);
    element.innerHTML = formatMarkdown(content);
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// 简单的 Markdown 格式化
function formatMarkdown(text) {
    // 代码块
    text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        return `<pre><code>${escapeHtml(code.trim())}</code></pre>`;
    });

    // 行内代码
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');

    // 标题
    text = text.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    text = text.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    text = text.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // 粗体
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // 列表
    text = text.replace(/^\- (.*$)/gim, '<li>$1</li>');
    text = text.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    // 换行
    text = text.replace(/\n/g, '<br>');

    return text;
}

// HTML 转义
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 技术问答
async function askQuestion() {
    const question = document.getElementById('qa-question').value.trim();
    const userLevel = document.getElementById('qa-level').value;

    if (!question) {
        alert('请输入问题');
        return;
    }

    showLoading();

    try {
        const response = await fetch(`${API_BASE}/ask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question, userLevel })
        });

        const data = await response.json();

        if (response.ok) {
            displayResult('qa-result', data.answer);
        } else {
            displayResult('qa-result', `❌ 错误: ${data.error}`);
        }
    } catch (error) {
        displayResult('qa-result', `❌ 网络错误: ${error.message}`);
    } finally {
        hideLoading();
    }
}

// 生成学习路径
async function generateLearningPath() {
    const technology = document.getElementById('lp-technology').value.trim();
    const currentLevel = document.getElementById('lp-level').value;
    const goal = document.getElementById('lp-goal').value.trim();
    const timeCommitment = document.getElementById('lp-time').value.trim();

    if (!technology) {
        alert('请输入要学习的技术');
        return;
    }

    showLoading();

    try {
        const response = await fetch(`${API_BASE}/learning-path`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                technology,
                currentLevel,
                goal,
                timeCommitment
            })
        });

        const data = await response.json();

        if (response.ok) {
            displayResult('lp-result', data.learningPath);
        } else {
            displayResult('lp-result', `❌ 错误: ${data.error}`);
        }
    } catch (error) {
        displayResult('lp-result', `❌ 网络错误: ${error.message}`);
    } finally {
        hideLoading();
    }
}

// 解释代码
async function explainCode() {
    const code = document.getElementById('ec-code').value.trim();
    const language = document.getElementById('ec-language').value;

    if (!code) {
        alert('请输入代码');
        return;
    }

    showLoading();

    try {
        const response = await fetch(`${API_BASE}/explain-code`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code, language })
        });

        const data = await response.json();

        if (response.ok) {
            displayResult('ec-result', data.explanation);
        } else {
            displayResult('ec-result', `❌ 错误: ${data.error}`);
        }
    } catch (error) {
        displayResult('ec-result', `❌ 网络错误: ${error.message}`);
    } finally {
        hideLoading();
    }
}

// 代码审查
async function reviewCode() {
    const code = document.getElementById('rc-code').value.trim();
    const language = document.getElementById('rc-language').value;
    const context = document.getElementById('rc-context').value.trim();

    if (!code) {
        alert('请输入代码');
        return;
    }

    showLoading();

    try {
        const response = await fetch(`${API_BASE}/review-code`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code, language, context })
        });

        const data = await response.json();

        if (response.ok) {
            displayResult('rc-result', data.review);
        } else {
            displayResult('rc-result', `❌ 错误: ${data.error}`);
        }
    } catch (error) {
        displayResult('rc-result', `❌ 网络错误: ${error.message}`);
    } finally {
        hideLoading();
    }
}

// 概念对比
async function compareConcepts() {
    const concept1 = document.getElementById('cmp-concept1').value.trim();
    const concept2 = document.getElementById('cmp-concept2').value.trim();
    const context = document.getElementById('cmp-context').value.trim();

    if (!concept1 || !concept2) {
        alert('请输入两个要对比的概念');
        return;
    }

    showLoading();

    try {
        const response = await fetch(`${API_BASE}/compare`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ concept1, concept2, context })
        });

        const data = await response.json();

        if (response.ok) {
            displayResult('cmp-result', data.comparison);
        } else {
            displayResult('cmp-result', `❌ 错误: ${data.error}`);
        }
    } catch (error) {
        displayResult('cmp-result', `❌ 网络错误: ${error.message}`);
    } finally {
        hideLoading();
    }
}

// 添加回车提交功能
document.addEventListener('DOMContentLoaded', () => {
    // 问答模式
    document.getElementById('qa-question')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            askQuestion();
        }
    });

    // 学习路径模式
    document.getElementById('lp-technology')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            generateLearningPath();
        }
    });

    // 概念对比
    document.getElementById('cmp-concept1')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('cmp-concept2').focus();
        }
    });

    document.getElementById('cmp-concept2')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            compareConcepts();
        }
    });

    console.log('🎓 Tech Mentor Web Interface loaded!');
    console.log('💡 Tip: Press Ctrl+Enter or Cmd+Enter to submit in text areas');
});
