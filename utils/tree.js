let counter = 0;

const Tree = (nodes) => {
    nodes.forEach((node) => {
        if (node.children.length > 0) {
            Tree(node.children);
        }
        counter += 1;
        return counter;
    });
    return counter;
};

export default Tree;
