import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function CriticismoRadicalSite() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', videoUrl: '', author: '' });

  const handlePost = () => {
    if (newPost.title && (newPost.content || newPost.videoUrl)) {
      setPosts([{ ...newPost, comments: [] }, ...posts]);
      setNewPost({ title: '', content: '', videoUrl: '', author: '' });
    }
  };

  const addComment = (index, comment) => {
    const updatedPosts = [...posts];
    updatedPosts[index].comments.push(comment);
    setPosts(updatedPosts);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Criticismo Radical</h1>

      <Tabs defaultValue="publicar" className="w-full">
        <TabsList className="flex justify-center mb-6">
          <TabsTrigger value="publicar">Publicar</TabsTrigger>
          <TabsTrigger value="sobre">Sobre</TabsTrigger>
          <TabsTrigger value="contato">Contato</TabsTrigger>
        </TabsList>

        <TabsContent value="publicar">
          <Card>
            <CardContent className="space-y-4">
              <Input
                placeholder="Nome do autor"
                value={newPost.author}
                onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
              />
              <Input
                placeholder="Título do post"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              />
              <Textarea
                placeholder="Escreva seu artigo aqui..."
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              />
              <Input
                placeholder="Link do vídeo (YouTube, Vimeo...)"
                value={newPost.videoUrl}
                onChange={(e) => setNewPost({ ...newPost, videoUrl: e.target.value })}
              />
              <Button onClick={handlePost}>Publicar</Button>
            </CardContent>
          </Card>

          {posts.map((post, index) => (
            <Card key={index} className="space-y-2 mt-6">
              <CardContent>
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-sm italic">Por {post.author}</p>
                <p className="whitespace-pre-wrap mt-2">{post.content}</p>
                {post.videoUrl && (
                  <div className="mt-4">
                    <iframe
                      className="w-full h-64"
                      src={post.videoUrl.replace("watch?v=", "embed/")}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                <div className="mt-4 space-y-2">
                  <h3 className="text-lg font-medium">Comentários</h3>
                  {post.comments.map((c, i) => (
                    <p key={i} className="text-sm bg-gray-100 p-2 rounded">{c}</p>
                  ))}
                  <Textarea
                    placeholder="Deixe um comentário"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        addComment(index, e.target.value);
                        e.target.value = '';
                      }
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="sobre">
          <Card>
            <CardContent className="p-4 space-y-2">
              <h2 className="text-2xl font-bold">Sobre o Criticismo Radical</h2>
              <p>
                O Criticismo Radical é um movimento filosófico-político que propõe uma crítica profunda
                ao capitalismo e às estruturas sociais, fundado sobre o pensamento autônomo e a ruptura crítica.
              </p>
              <p>
                Fundado por uma jovem pensadora aos 16 anos, o Criticismo Radical busca ser uma ponte entre teoria e prática
                revolucionária com uma abordagem acessível, filosófica e radical.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contato">
          <Card>
            <CardContent className="p-4 space-y-2">
              <h2 className="text-2xl font-bold">Contato</h2>
              <p>Email: <a href="mailto:criticismoradical@gmai.com" className="text-blue-600">criticismoradical@gmai.com</a></p>
              <p>Estamos abertas a parcerias, colaborações, sugestões e participação em projetos.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
