import React from "react";
import { Button, Table, TableColumnHeaderCell } from "@radix-ui/themes";
import Link from "next/link";
import prisma from "@/prisma/client";
const page = async () => {
  const issues = await prisma.issue.findMany();
  console.log("page component");
  return (
    <div>
      <div className="mb-5">
        <Link href={"issues/new"}>
          <Button>New Issue</Button>
        </Link>
      </div>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <TableColumnHeaderCell>Issue</TableColumnHeaderCell>
            <TableColumnHeaderCell>Status</TableColumnHeaderCell>
            <TableColumnHeaderCell>Created</TableColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>{issue.title}</Table.Cell>
              <Table.Cell>{issue.status}</Table.Cell>
              <Table.Cell>{issue.createdAT.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default page;
