module.children = function children (   element                 
    ) {
    return Array.prototype.slice.call(element.children);
};