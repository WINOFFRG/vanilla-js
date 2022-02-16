const app = {
    data: [
        {
            name: 'Global',
            isFolder: true,
            items: [
            {
                name: 'Public',
                isFolder: true,
                items: [
                    {
                        name: 'index.html',
                        isFolder: false,
                    },
                ],
            },
            {
                name: 'Src',
                isFolder: true,
                items: [
                        {
                            name: 'script.js',
                            isFolder: false,
                        },
                        {
                            name: 'another-script.js',
                            isFolder: false,
                        },
                        {
                            name: 'README.md',
                            isFolder: false,
                        }
                    ],
                },
            ],
        },
        {
            name: 'README.md',
            isFolder: false,
        }
    ],
    
    config: {
        level: 0,
    },

    initialize : function () {
        const rootElement = document.querySelector('.f-system');
        const data = this.parseDataToDOM(this.data);
        rootElement.appendChild(data);
        this.bindEvents();
    },

    parseDataToDOM: function (object) {

        if(object.length == 0) {
            const div = document.createElement('div');
            return div;
        }

        const data = document.createElement('div');
        
        for(key in object) {
            
            let contentName = object[key]["name"];
            let isFolder = object[key]["isFolder"];
            let domElement = null;
            
            if(isFolder) {
                domElement = this.dom.createFolder(contentName);
                let childrenElement = domElement.lastChild;
                
                this.config.level += 2;
                const spacing = this.dom.createGapElement(this.config.level);
                
                const items = object[key]["items"];
                console.log(items);
                
                const innerData = this.parseDataToDOM(items);
                this.config.level -= 2;

                console.log(domElement);
                childrenElement.appendChild(spacing);
                childrenElement.appendChild(innerData);
            }
            else {
                domElement = this.dom.createFile(contentName);
            }
            
            data.appendChild(domElement);
        }

        return data;
    },

    dom: {
        createFile: function (name) {

            const rootWrapper = document.createElement('div');
            rootWrapper.classList.add('file');
            rootWrapper.innerText = name;

            return rootWrapper;
        },

        createFolder: function(name) {

            const rootWrapper = document.createElement('div');
            rootWrapper.classList.add('folder');

            const span = document.createElement('span');
            span.classList.add('icon');
            span.classList.add('folder-open');
            rootWrapper.appendChild(span);

            const nameEl = document.createElement('span');
            nameEl.classList.add('name');
            nameEl.innerText = name;
            rootWrapper.appendChild(nameEl);

            const childrenFiles = document.createElement('div');
            childrenFiles.classList.add('contents');
            rootWrapper.appendChild(childrenFiles);

            return rootWrapper;
        },
        createGapElement: function(size) {

            const element = document.createElement('span');
            element.classList.add('gap');

            for(let idx = 0; idx < size; idx++) {
                element.innerHTML += '&emsp;';
            }

            return element;
        }
    },

    bindEvents: function() {

        const container = document.querySelector('.f-system');

        container.addEventListener('click', (event) => {
            
            if(event.target.classList.contains('icon')) {

                const current = event.target.classList.contains('hidden');

                if(current) {
                    this.visibility(event.target, 'flex');
                }
                else {
                    this.visibility(event.target, 'none');
                }
            }
        })
    },

    visibility: function(element, state) {

        element.parentElement.lastChild.style.display = state;
        element.classList.toggle('hidden');
        console.log(element);
        this.toggleIcon(element.parentElement);

    },

    toggleIcon: function(element) {

        if(element.firstChild.classList.contains("folder-open")){
            element.firstChild.classList.remove("folder-open");
            element.firstChild.classList.add("folder-close");
        }
        else {
            element.firstChild.classList.add("folder-open");
            element.firstChild.classList.remove("folder-close");
        }
    }
}

window.addEventListener('load', app.initialize());