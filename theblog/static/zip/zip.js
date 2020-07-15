(function(a){var b=function(c){this.fileContents=new b.BigEndianBinaryStream(c)};a.JSUnzip=b;b.MAGIC_NUMBER=67324752;b.prototype={readEntries:function(){if(!this.isZipFile()){throw new Error("File is not a Zip file.")}this.entries=[];var c=new b.ZipEntry(this.fileContents);while(typeof(c.data)==="string"){this.entries.push(c);c=new b.ZipEntry(this.fileContents)}},isZipFile:function(){return this.fileContents.getByteRangeAsNumber(0,4)===b.MAGIC_NUMBER}};b.ZipEntry=function(c){this.signature=c.getNextBytesAsNumber(4);if(this.signature!==b.MAGIC_NUMBER){return}this.versionNeeded=c.getNextBytesAsNumber(2);this.bitFlag=c.getNextBytesAsNumber(2);this.compressionMethod=c.getNextBytesAsNumber(2);this.timeBlob=c.getNextBytesAsNumber(4);if(this.isEncrypted()){throw"File contains encrypted entry. Not supported."}if(this.isUsingUtf8()){throw"File is using UTF8. Not supported."}if(this.isUsingBit3TrailingDataDescriptor()){throw"File is using bit 3 trailing data descriptor. Not supported."}this.crc32=c.getNextBytesAsNumber(4);this.compressedSize=c.getNextBytesAsNumber(4);this.uncompressedSize=c.getNextBytesAsNumber(4);if(this.isUsingZip64()){throw"File is using Zip64 (4gb+ file size). Not supported"}this.fileNameLength=c.getNextBytesAsNumber(2);this.extraFieldLength=c.getNextBytesAsNumber(2);this.fileName=c.getNextBytesAsString(this.fileNameLength);this.extra=c.getNextBytesAsString(this.extraFieldLength);this.data=c.getNextBytesAsString(this.compressedSize)};b.ZipEntry.prototype={isEncrypted:function(){return(this.bitFlag&1)===1},isUsingUtf8:function(){return(this.bitFlag&2048)===2048},isUsingBit3TrailingDataDescriptor:function(){return(this.bitFlag&8)===8},isUsingZip64:function(){this.compressedSize===4294967295||this.uncompressedSize===4294967295}};b.BigEndianBinaryStream=function(c){this.stream=c;this.resetByteIndex()};b.BigEndianBinaryStream.prototype={resetByteIndex:function(){this.currentByteIndex=0},getByteAt:function(c){return this.stream.charCodeAt(c)},getNextBytesAsNumber:function(c){var d=this.getByteRangeAsNumber(this.currentByteIndex,c);this.currentByteIndex+=c;return d},getNextBytesAsString:function(c){var d=this.getByteRangeAsString(this.currentByteIndex,c);this.currentByteIndex+=c;return d},getByteRangeAsNumber:function(e,d){var c=0;var f=e+d-1;while(f>=e){c=(c<<8)+this.getByteAt(f);f--}return c},getByteRangeAsString:function(g,f){var d="";var c=g+f;var h=g;while(h<c){var e=this.getByteAt(h);d+=String.fromCharCode(e);c-=Math.floor(e/255);h++}return d}}}(this));