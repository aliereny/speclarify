"use client";
import {Button, Form, Input, Spin, Typography} from "antd";
import {useState} from "react";
import {HttpClient} from "@/services/httpClient";

type FormData = {
    requirement: string;
};

export default function Home() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [response, setResponse] = useState<string | undefined>(undefined);
    return (
        <main>
            <Typography.Title>Speclarify</Typography.Title>
            <Form<FormData>
                layout={"vertical"}
                onFinish={async (data) => {
                    setIsLoading(true)
                    const response = await HttpClient.get<{ ambiguities: string }>("/api/ambiguities", {
                        params: {
                            requirement: data.requirement,
                        },
                    });
                    setResponse(response.data.ambiguities);
                    setIsLoading(false)
                }}
            >
                <Form.Item<FormData>
                    name={"requirement"}
                    label={"Requirement"}
                    rules={[
                        {
                            required: true,
                            message: "Type the requirementnpm install openai@^4.0.0",
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item>
                    <Button type={"primary"} htmlType={"submit"}>
                        Find ambiguities
                    </Button>
                </Form.Item>
            </Form>
            <div>
                {
                    isLoading ? <Spin size={"large"} /> : <Typography.Text>{response}</Typography.Text>
                }
            </div>
        </main>
    );
}
