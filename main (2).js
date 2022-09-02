let grid=document.getElementById("grid");
let solved=false;
let slx=-1,sly=-1;
for(let i=0;i<9;i++){
    for(let j=0;j<9;j++){
        let box = document.createElement('input');
        box.type="button";
        box.id=i.toString()+j.toString();
        box.pattern="[0-9]";
        grid.appendChild(box);
        box.addEventListener("click",function(){
            if(slx!=-1){
                let bc=document.getElementById(sly.toString()+slx.toString());
                if((Math.floor(slx/3)+Math.floor(sly/3))%2==0) bc.style.backgroundColor="yellow";
                else bc.style.backgroundColor="aqua";
            }
            slx=j;
            sly=i;
            let sl=document.getElementById(i.toString()+j.toString());
            sl.style.backgroundColor="gray";
        })
        let a=Math.floor(i/3),b=Math.floor(j/3);
        if((a+b)%2==0) box.style.backgroundColor="yellow";
        else box.style.backgroundColor="aqua";
    }
}


function select(x){
    if(slx!=-1){
        let bo=document.getElementById(sly.toString()+slx.toString());
        bo.value=x.toString();
    }
}
function getValues(){
    if(solved) return;
    let mat=[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            let idx= i.toString()+ j.toString();
            let val=parseInt(document.getElementById(idx).value);
            if(val>0 && val<10){
                mat[i][j]=val;
                let bc=document.getElementById(idx);
                bc.style.backgroundColor="orange";
            }
            if(mat[i][j]<0 || mat[i][j]>9){
                alert("Introducir numeros entre 1 y 9");
                return 0;
            }
        }
    }
   if(validation(mat)){
       solve(mat);
       if(!solved) alert("There is no solution");
   }else{
        alert("Not a valid sudoku");
        return 0;
    }

}

function solve(mat){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(mat[i][j]==0){  
                for(let n=1;n<=9;n++){
                    if(solved) return;
                    if(valid(mat,n,i,j)){
                        mat[i][j]=n;
                        if(i===8 &&j===8){
                            imp(mat);
                        }else{
                            solve(mat);
                            mat[i][j]=0;
                        }
                    }
                }
                if(mat[i][j]==0) return;
            }
            if(i==8 && j==8) imp(mat);
        }
    }
}

function valid(mat,num,f,c){
    for(let ix=0;ix<9;ix++){
        if(mat[f][ix]===num) return false;
    }
    for(let ix=0;ix<9;ix++){
        if(mat[ix][c]===num) return false;
    }
    let k=Math.floor(f/3),r=Math.floor(c/3);
    for(let fi=0;fi<3;fi++){
        for(let ci=0;ci<3;ci++){
            if(mat[3*k+fi][3*r+ci]===num) return false;
        }
    }
    return true;
}

function imp(mat){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            let id=i.toString()+j.toString();
            document.getElementById(id).value=mat[i][j];
        }
    }
    solved=true;
}

function validation(mat){
    let r=[0,0,0,0,0,0,0,0,0];
    for(let i=0;i<9;i++){
        r=[0,0,0,0,0,0,0,0,0];
        for(let j=0;j<9;j++){
            if(!(mat[i][j]>0 && mat[i][j]<=9)) continue; 
            if(r[mat[i][j]-1]==1) return false;
            r[mat[i][j]-1]++;
        }
    }
    for(let i=0;i<9;i++){
        r=[0,0,0,0,0,0,0,0,0];
        for(let j=0;j<9;j++){
            if(!(mat[j][i]>0 && mat[j][i]<=9)) continue;  
            if(r[mat[j][i]-1]==1) return false;
            r[mat[j][i]-1]++;
        }
    }
    for(let t=0;t<3;t++){
        for(let k=0;k<3;k++){
            let r=[0,0,0,0,0,0,0,0,0];
            for(let i=0;i<3;i++){
                for(let j=0;j<3;j++){
                    if(!(mat[i+3*t][j+3*k]>0 && mat[i+3*t][j+3*k]<=9)) continue; 
                    if(r[mat[i+3*t][j+3*k]-1]==1) return false;
                    r[mat[i+3*t][j+3*k]-1]++;
                }
            }
        }
    }

    return true;
}

function erase(){
        for(let i=0;i<9;i++){
            for(let j=0;j<9;j++){
                let id=i.toString()+j.toString();
                let ebot=document.getElementById(id);
                ebot.value=""
                if((Math.floor(i/3)+Math.floor(j/3))%2==0) ebot.style.backgroundColor="yellow";
                else ebot.style.backgroundColor="aqua";
            }
        }
        solved=false;
}